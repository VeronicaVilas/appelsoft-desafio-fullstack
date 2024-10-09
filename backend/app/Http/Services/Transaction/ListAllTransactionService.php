<?php

namespace App\Http\Services\Transaction;

use App\Http\Repositories\TransactionRepository;

class ListAllTransactionService {

    private $transactionRepository;

    public function __construct(TransactionRepository $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function handle($transaction_type = null, $description = null, $transaction_date = null)
    {
        return $this->transactionRepository->search($transaction_type, $description, $transaction_date);
    }
}
