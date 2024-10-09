import { Transaction } from "./transaction.interface";

export type TransactionPayload = Omit<Transaction, 'id'>;
