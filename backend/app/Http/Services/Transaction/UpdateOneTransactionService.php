<?php

namespace App\Http\Services\Transaction;

use App\Http\Repositories\TransactionRepository;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\HttpResponses;

class UpdateOneTransactionService {

    private $transactionRepository;

    public function __construct(TransactionRepository $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function handle($id, $data)
    {
        $transaction = $this->transactionRepository->getOne($id);
        return $this->transactionRepository->updateOne($transaction, $data);
    }
}
