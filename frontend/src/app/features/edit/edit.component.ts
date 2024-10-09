import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TransactionsService } from '../../shared/services/transactions.service';
import { Transaction } from '../../shared/interfaces/transaction.interface';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  TransactionsService = inject(TransactionsService);
  matSnackBar = inject(MatSnackBar);

  transactionForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Transaction) {
    this.transactionForm = new FormGroup({
      transaction_type: new FormControl<string>(data.transaction_type, {
        nonNullable: true,
        validators: Validators.required,
      }),
      description: new FormControl<string>(data.description, {
        nonNullable: true,
        validators: Validators.required,
      }),
      value: new FormControl<number>(data.value, {
        nonNullable: true,
        validators: Validators.required,
      }),
      transaction_date: new FormControl<string>(data.transaction_date|| '', {
          nonNullable: true,
          validators: Validators.required,
      })
    });
  }

  onSubmit() {
    this.TransactionsService.put(this.data.id, {
      transaction_type: this.transactionForm.controls['transaction_type'].value,
      description: this.transactionForm.controls['description'].value,
      value: this.transactionForm.controls['value'].value,
      transaction_date: this.transactionForm.controls['transaction_date'].value,
    })
    .subscribe({
      next: () => {
        this.matSnackBar.open('Transação editada com sucesso!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
      error: (erro) => {
        this.matSnackBar.open('Erro ao editar transação!: ', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }
}
