import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { TransactionsService } from '../../shared/services/transactions.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create',
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
    MatNativeDateModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  TransactionsService = inject(TransactionsService);
  matSnackBar = inject(MatSnackBar)
  transactionForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private http: HttpClient) {
    this.transactionForm = new FormGroup({
      transaction_type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      transaction_date: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const formData = this.transactionForm.value;

      const transactionDate = new Date(formData.transaction_date);
      const formattedDate = transactionDate.toISOString().slice(0, 19).replace('T', ' ');
      const dataToSend = {
        ...formData,
        transaction_date: formattedDate
      };

      this.TransactionsService.post(dataToSend).subscribe(
        response => {
            this.matSnackBar.open('Transação criada com sucesso!', 'Ok', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });

          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        error => {
          console.error('Erro ao cadastrar transação', error);
          this.matSnackBar.open('Erro ao criar a transação!', 'Ok', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
      }
    )}
  }
}

