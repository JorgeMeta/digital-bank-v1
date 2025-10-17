import { Component, signal, inject } from '@angular/core';
import { Input } from '../../../shared/components/input/input';
import { Button } from '../../../shared/components/button/button';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user/user';
import { Toast } from '../../../core/services/toast/toast';
import { Router } from '@angular/router';
@Component({
  selector: 'da-register',
  imports: [ReactiveFormsModule, Input, Button, MatSnackBarModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private toast = inject(Toast);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    cpf: ['', [Validators.required, this.cpfValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  submitted = signal(false);

  onSubmit() {
    this.submitted.set(true);

    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      this.form.markAllAsTouched();
      this.showErrors();
      return;
    }

    const userData = {
      name: this.form.value.name!,
      cpf: this.form.value.cpf!,
      email: this.form.value.email!,
      password: this.form.value.password!,
    };

    this.userService.createUser(userData).subscribe({
      next: () => {
        this.toast.showSuccess('Usuário registrado com sucesso!');
        console.log('Usuário registrado:', userData);
        this.router.navigate(['/userlist']);
        this.form.reset();
      },
      error: (err) => {
        this.toast.showError(['Erro ao registrar usuário']);
        console.error('Erro:', err);
      },
    });
  }

  private cpfValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;
    return cpf.isValid(value) ? null : { invalidCPF: true };
  }

  private showErrors() {
    const errors: string[] = [];
    const controls = this.form.controls;

    if (controls.name.invalid) errors.push('Nome é obrigatório.');
    if (controls.cpf.invalid) errors.push('CPF inválido.');
    if (controls.email.invalid) errors.push('E-mail inválido.');
    if (controls.password.invalid) errors.push('Senha deve ter pelo menos 6 caracteres.');
    if (controls.confirmPassword.invalid) errors.push('Confirmação de senha inválida.');
    if (controls.password.value !== controls.confirmPassword.value)
      errors.push('As senhas não coincidem.');

    if (errors.length) {
      this.toast.showError(errors);
    }
  }
}
