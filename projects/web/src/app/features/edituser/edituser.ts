import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserInterface } from '../../shared/models/user.model';
import { Button } from '../../shared/components/button/button';
import { Input } from '../../shared/components/input/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'da-edituser',
  imports: [ReactiveFormsModule, MatDialogModule, Button, Input, MatIcon],
  templateUrl: './edituser.html',
  styleUrl: './edituser.scss',
})
export class Edituser {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<Edituser>);
  private readonly dialogData = inject(MAT_DIALOG_DATA);
  readonly form!: FormGroup;
  constructor() {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: [this.dialogData.id],
      name: [this.dialogData.name, [Validators.required, Validators.minLength(2)]],
      email: [this.dialogData.email, [Validators.required, Validators.email]],
    });
  }
  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.markFormGroupTouched();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }
}
