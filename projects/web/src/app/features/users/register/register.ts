import { Component, signal, inject } from '@angular/core';
import { Input } from '../../../shared/components/input/input';
import { Button } from '../../../shared/components/button/button';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Toast } from '../../../core/services/toast/toast';

@Component({
  selector: 'da-register',
  imports: [ReactiveFormsModule, Input, Button, MatSnackBarModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);

  private toast = inject(Toast);

  form = this.fb.group({
    name: ['', Validators.required],
    cpf: ['', [Validators.required, this.cpfValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });
  submitted = signal(false);
  onSubmit() {
    this.submitted = signal(true);
    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      this.form.markAllAsTouched();
      this.showErrors();
      return;
    }

    const { password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      this.form.get('confirmPassword')?.setErrors({ mismatch: true });
      return;
    }
    this.toast.showSuccess('Usuário registrado com sucesso!');
    console.log('Usuário registrado:', this.form.value);
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
      this.toast.showError(errors); // usa o serviço de toast
    }
  }
}
