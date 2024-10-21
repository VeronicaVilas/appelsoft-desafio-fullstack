<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class FinancialSummaryController extends Controller
{
    public function getSummary()
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(['message' => 'Usuário não autenticado'], Response::HTTP_UNAUTHORIZED);
        }

        $totalInputs = Transaction::where('user_id', $userId)
             ->where('transaction_type', 'ENTRADA')
            ->sum('value');

        $totalOutputs = Transaction::where('user_id', $userId)
            ->where('transaction_type', 'SAÍDA')
            ->sum('value');

        $totalBalance = $totalInputs - $totalOutputs;

        $response = [
            'Saldo total' => number_format($totalBalance, 2, '.', ''),
            'Saldo total das entradas' => number_format($totalInputs, 2, '.', ''),
            'Saldo total das saídas' => number_format($totalOutputs, 2, '.', ''),
        ];

        return response()->json($response, Response::HTTP_OK);
    }
}
