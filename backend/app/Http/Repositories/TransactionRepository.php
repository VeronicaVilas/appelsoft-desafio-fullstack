<?php

namespace App\Http\Repositories;

use App\Interfaces\TransactionRepositoryInterface;
use App\Models\Transaction;

class TransactionRepository implements TransactionRepositoryInterface {

    public function getAll() {
        return Transaction::all();
    }

    public function getOne($id) {
        return Transaction::find($id);
    }

    public function create(array $data) {
        return Transaction::create($data);
    }

    public function updateOne(Transaction $transaction, $data) {
        $transaction->update($data);
        $transaction->save();
        return $transaction;
    }

    public function find($id)
    {
        return Transaction::find($id);
    }

    public function delete(Transaction $transaction)
    {
        return $transaction->delete();
    }

    public function search($transaction_type, $description, $transaction_date)
    {
        return Transaction::where(function ($query) use ($transaction_type, $description, $transaction_date) {
            if ($transaction_type !== null) {
                $query->where('transaction_type', 'like', '%' . $transaction_type . '%');
            }

            if ($description !== null) {
                $query->where('description', 'like', '%' . $description . '%');
            }

            if ($transaction_date !== null) {
                $query->whereDate('transaction_date', $transaction_date);
            }
        })
        ->orderBy('transaction_date')
        ->orderBy('id')
        ->get(['id', 'transaction_type', 'description', 'value', 'transaction_date']);
    }
}
