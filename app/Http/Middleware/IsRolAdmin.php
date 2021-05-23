<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsRolAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        if ($request->expectsJson()) {
            if (auth()->user()->rol_id=='1') {
                return $next($request);
            }
            return response()->json(['status' => 'Rol not allowed permisition'],403);
        }
    }
}
