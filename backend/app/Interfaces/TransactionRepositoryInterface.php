<?php

namespace App\Interfaces;

use App\Models\Transaction;

interface TransactionRepositoryInterface
{
    public function create(array $data);
    public function find($id);
    public function delete(Transaction $student);
    public function search($transaction_type, $description, $transaction_date);
}
