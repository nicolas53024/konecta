<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //solo admin esta autorizado para el request
        return auth()->user()->rol_id==1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:6',
            'email' => [
                'required', 'email', 'max:120',
                Rule::unique('users')->ignore($this->route('user'))
            ],
            'password' => 'sometimes|required|string|min:8',
            'rol_id' => 'required|exists:roles,id',
        ];
    }
}
