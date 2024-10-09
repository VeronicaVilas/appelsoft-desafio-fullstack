<?php

namespace App\Http\Services\Transaction;

use Illuminate\Http\Response;
use App\Models\Transaction;

class DeleteOneTransactionService {

    public function handle($id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['error' => 'Transação não encontrada!'], Response::HTTP_NOT_FOUND);
        }

        $transaction->delete();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }
}
