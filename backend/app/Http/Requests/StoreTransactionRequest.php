<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'transaction_type' => 'required|in:ENTRADA,SAÍDA',
            'description' => 'required|string|max:255',
            'value' => 'required|numeric|min:0',
            'transaction_date' => 'required|date',
        ];
    }

    /**
     * Get the custom messages for validation errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'transaction_type.required' => 'O tipo de transação é obrigatório.',
            'transaction_type.in' => 'O tipo de transação deve ser ENTRADA ou SAÍDA.',
            'description.required' => 'A descrição é obrigatória.',
            'description.string' => 'A descrição deve ser uma string.',
            'description.max' => 'A descrição não pode ultrapassar 255 caracteres.',
            'value.required' => 'O valor é obrigatório.',
            'value.numeric' => 'O valor deve ser um número.',
            'value.min' => 'O valor não pode ser negativo.',
            'transaction_date.required' => 'A data da transação é obrigatória.',
            'transaction_date.date' => 'A data da transação deve ser uma data válida.',
        ];
    }
}
