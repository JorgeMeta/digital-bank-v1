import { Component, inject, signal } from '@angular/core';
import { Input } from '../../../shared/components/input/input';
import { Button } from '../../../shared/components/button/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user/user';
import { Toast } from '../../../core/services/toast/toast';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'da-login',
  imports: [Input, Button, MatSnackBarModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private toast = inject(Toast);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitted = signal(false);
  onSubmit() {
    this.submitted.set(true);
    this.form.markAllAsTouched();

    // ⚠️ Primeiro: validações locais do formulário
    if (this.form.invalid) {
      this.showErrors();
      return;
    }

    // ⚙️ Depois: validação de credenciais no servidor (MockAPI)
    const { email, password } = this.form.value;

    this.userService.login(email, password).subscribe({
      next: (user) => {
        this.toast.showSuccess(`Bem-vindo, ${user.name}!`);
        this.router.navigate(['/userlist']);
        console.log('Usuário logado:', user);
      },
      error: (err) => {
        // 🚨 Caso o e-mail/senha não existam ou estejam errados
        this.toast.showError(['Usuário ou senha incorretos.']);
      },
    });
  }

  private showErrors() {
    const errors: string[] = [];
    const controls = this.form.controls;

    // 📧 Validação do e-mail
    if (controls.email.errors) {
      if (controls.email.errors['required']) {
        errors.push('O campo de e-mail é obrigatório.');
      } else if (controls.email.errors['email']) {
        errors.push('O formato do e-mail é inválido.');
      }
    }

    // 🔒 Validação da senha
    if (controls.password.errors) {
      if (controls.password.errors['required']) {
        errors.push('O campo de senha é obrigatório.');
      } else if (controls.password.errors['minlength']) {
        errors.push('A senha deve ter pelo menos 6 caracteres.');
      }
    }

    // 🚨 Exibe os erros, se houver
    if (errors.length > 0) {
      this.toast.showError(errors);
    }
  }
}
