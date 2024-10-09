import { Component, signal } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, FormGroup}from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  matcher = new MyErrorStateMatcher();
  isPasswordIncorrect = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.passwordValidator])
  });

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.http.post('http://localhost:8000/api/login', formData).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['resumo']);
        },
        error => {
          console.error('Erro ao fazer login', error);
        }
      );
    }
  }

  passwordValidator(control: any) {
    const correctPassword = 'admin123';
    const value = control.value;
    if (value && value !== correctPassword) {
      return { incorrectPassword: true };
    }
    return null;
  }
}
