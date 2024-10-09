import { Component, inject, model} from '@angular/core';
import { TransactionsService } from '../../shared/services/transactions.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditComponent } from '../edit/edit.component';
import { filter } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transaction } from '../../shared/interfaces/transaction.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    NoItemsComponent,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  transaction: Transaction[] = [];
  financialSummary: any;
  transactionsService = inject(TransactionsService);
  readonly dialog = inject(MatDialog);
  confirmationDialogService = inject(ConfirmationDialogService);
  filteredtransaction: Transaction[] = [];
  searchTerm: string = '';
  router = inject(Router)
  http = inject(HttpClient);
  matSnackBar = inject(MatSnackBar);


  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.transactionsService.get()
        .subscribe((transaction) => {
        this.transaction = transaction;
        this.showAlltransaction();
      }, error => {
        console.error('Erro ao obter os produtos', error);
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  constructor() {
    this.getFinancialSummary();
  }

  getFinancialSummary(): void {
    const token = localStorage.getItem('token');
    this.http.get<any>('http://localhost:8000/api/resumo', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe(
      (data) => {
        console.log('Dados financeiros recebidos:', data);
        this.financialSummary = data;
      },
      (error) => {
        console.error('Erro ao buscar resumo financeiro', error);
        this.matSnackBar.open('Erro ao carregar o resumo financeiro.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  openCreateProduct() {
    const dialogRef = this.dialog.open(CreateComponent);
  }

  onEdit(transaction: Transaction) {
    const dialogRef = this.dialog.open(EditComponent, {
        data: transaction,
    });
  }

  onDelete(transaction: Transaction) {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.transactionsService.delete(transaction.id).subscribe(
          () => {
            this.matSnackBar.open('Transação deletada com sucesso!', 'Ok', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);

          },
          (error) => {
            this.matSnackBar.open('Erro ao deletar a transação.', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );
      });
  }

  showAlltransaction() {
    this.filteredtransaction = this.transaction;
  }

  filterInput() {
    this.filteredtransaction = this.transaction.filter(product => product.transaction_type === 'ENTRADA');
  }

  filterOutput() {
    this.filteredtransaction = this.transaction.filter(product => product.transaction_type === 'SAÍDA');
  }

  searchtransaction() {
    this.filteredtransaction = this.transaction.filter(product =>
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


}

