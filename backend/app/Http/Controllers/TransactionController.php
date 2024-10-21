<?php

namespace App\Http\Controllers;

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
        $data = $request->all();
        $data['user_id'] = Auth::id();

        if (!$data['user_id']) {
            return response()->json(['message' => 'Usuário não autenticado'], Response::HTTP_UNAUTHORIZED);
        }

        $transaction = $createTransactionService->handle($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Transação criada com sucesso',
            'data' => $transaction,
        ], Response::HTTP_CREATED);
    }

    public function index(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Usuário não autenticado'], Response::HTTP_UNAUTHORIZED);
        }

        $search = $request->input('search');
        $transaction = $this->listAllTransactionService->handle($search);

        if ($transaction->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nenhuma transação encontrada com essas características!'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Transações encontradas com sucesso!',
            'data' => $transaction
        ], Response::HTTP_OK);
    }

    public function show($id)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Usuário não autenticado'], Response::HTTP_UNAUTHORIZED);
        }

        $transaction = Transaction::where('user_id', $userId)->find($id);

        if (!$transaction) {
            return response()->json([
                'status' => 'error',
                'message' => 'Transação não encontrada com este ID!'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Transação encontrada com sucesso!',
            'data' => $transaction
        ], Response::HTTP_OK);
    }

    public function update(Request $request, $id, UpdateOneTransactionService $updateOneTransactionService)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Usuário não autenticado'], Response::HTTP_UNAUTHORIZED);
        }

        $transaction = Transaction::where('user_id', $userId)->find($id);

        if (!$transaction) {
            return response()->json([
                'status' => 'error',
                'message' => 'Transação não encontrada!'
            ], Response::HTTP_NOT_FOUND);
        }

        $validatedData = $request->validate([
            'transaction_type' => 'in:ENTRADA,SAÍDA',
            'description' => 'string|max:255',
            'value' => 'numeric|min:0',
            'transaction_date' => 'date',
        ]);

        $updatedTransaction = $updateOneTransactionService->handle($id, $validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'Transação atualizada com sucesso!',
            'data' => $updatedTransaction
        ], Response::HTTP_OK);
    }

    public function destroy($id, DeleteOneTransactionService $deleteOneTransactionService)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Usuário não autenticado'], Response::HTTP_UNAUTHORIZED);
        }

        $transaction = Transaction::where('user_id', $userId)->find($id);

        if (!$transaction) {
            return response()->json([
                'status' => 'error',
                'message' => 'Transação não encontrada!'
            ], Response::HTTP_NOT_FOUND);
        }

        $deleteOneTransactionService->handle($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Transação deletada com sucesso!'
        ], Response::HTTP_OK);
    }
}
