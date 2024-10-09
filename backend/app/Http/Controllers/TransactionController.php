<?php

namespace App\Http\Controllers;

use App\Http\Repositories\TransactionRepository;
use App\Http\Requests\StoreTransactionRequest;
use App\Models\Transaction;
use App\Http\Services\Transaction\CreateTransactionService;
use App\Http\Services\Transaction\ListAllTransactionService;
use App\Http\Services\Transaction\DeleteOneTransactionService;
use App\Http\Services\Transaction\UpdateOneTransactionService;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{

    private $listAllTransactionService;

    public function __construct(ListAllTransactionService $listAllTransactionService)
    {
        $this->listAllTransactionService = $listAllTransactionService;
    }

    public function store(StoreTransactionRequest $request, CreateTransactionService $createTransactionService)
    {
        try {

            $data = $request->all();

            $request->validate([
                'transaction_type' => 'required|in:ENTRADA,SAÍDA',
                'description' => 'required|string|max:255',
                'value' => 'required|numeric|min:0',
                'transaction_date' => 'required|date',
            ]);

            $data['user_id'] = Auth::id();

            if (!$data['user_id']) {
                return response()->json(['message' => 'Usuário não autenticado'], Response::HTTP_UNAUTHORIZED);
            }

            $transaction = $createTransactionService->handle($data);

            $response = [
                'id' => $transaction->id,
                'transaction_type' => $transaction->transaction_type,
                'description' => $transaction->description,
                'value' => $transaction->value,
                'transaction_date' => $transaction->transaction_date,
            ];

            return $response;

        } catch (\Exception $exception) {
            return $this->error($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    public function index(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Usuário não autenticado'], Response::HTTP_UNAUTHORIZED);
        }

        $search = $request->input('search');
        $transaction = $this->listAllTransactionService->handle($search);

        if ($transaction->isEmpty()) {
            return $this->error('Nenhuma transação encontrada com essas características!', Response::HTTP_NOT_FOUND);
        }

        return response()->json($transaction, Response::HTTP_OK);
    }

    public function show($id)
    {
        try {
            $userId = Auth::id();

            $transaction = Transaction::where('user_id', $userId)->find($id);

            if (!$transaction) {
                return $this->error('Transação não encontrada!', Response::HTTP_NOT_FOUND);
            }

            $response = [
                'id' => $transaction->id,
                'transaction_type' => $transaction->transaction_type,
                'description' => $transaction->description,
                'value' => $transaction->value,
                'transaction_date' => $transaction->transaction_date,
            ];

            return $response;

        } catch (\Exception $exception) {
            return $this->error($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    public function update(Request $request, $id, UpdateOneTransactionService $updateOneTransactionService)
    {
        try {
            $userId = Auth::id();

            $transaction = Transaction::where('user_id', $userId)->find($id);

            if (!$transaction) {
                return $this->error('Transação não encontrada!', Response::HTTP_NOT_FOUND);
            }

            $request->validate([
                'transaction_type' => 'in:ENTRADA,SAÍDA',
                'description' => 'string|max:255',
                'value' => 'numeric|min:0',
                'transaction_date' => 'date',
            ]);

            $body = $request->all();
            $transaction =  $updateOneTransactionService->handle($id, $body);

            return $this->response('Transação atualizada com sucesso!', Response::HTTP_OK);

        } catch (\Exception $exception) {
            return $this->error($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

    public function destroy($id, DeleteOneTransactionService $deleteOneTransactionService)
    {
        try {
            $userId = Auth::id();

            return $deleteOneTransactionService->handle($id);

        } catch (\Exception $exception) {
            return $this->error($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }
    }

}
