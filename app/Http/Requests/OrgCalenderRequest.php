<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrgCalenderRequest extends FormRequest
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
            'calender_year'=>'required',
            'month_id'=>'required',
            'c_month_id'=>'required',
            'start_from'=>'required',
            'ends_on'=>'required',

        ];
    }
}
