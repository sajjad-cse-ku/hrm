<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LateApplyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'subject' =>'required',
            'late_date' =>'required',
            'late_message'=>'required',
        ];
    }
}
