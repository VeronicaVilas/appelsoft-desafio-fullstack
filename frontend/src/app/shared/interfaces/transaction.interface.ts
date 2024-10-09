export interface Transaction {
  id: string,
  transaction_type: string,
  description: string,
  value: number,
  transaction_date: string | null,
  disabled?: boolean;
}
