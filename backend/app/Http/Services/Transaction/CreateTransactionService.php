<?php

namespace App\Http\Services\Transaction;

use App\Http\Repositories\TransactionRepository;

class CreateTransactionService {

    private $transactionRepository;

    public function __construct(TransactionRepository $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function handle(array $data)
    {
        return $this->transactionRepository->create($data);
    }
}
