<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Rol;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'rol_id'
    ];
    protected $with = ['rol'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function rol()
    { 
        return $this->belongsTo(Rol::class,'rol_id','id');
    }

    public function getCreatedAtAttribute()
    {
        Carbon::setLocale('es_ES');
        $fecha = Carbon::parse($this->attributes['created_at']);
        return  $fecha->diffForHumans();
    }
    public function getUpdatedAtAttribute()
    {
        Carbon::setLocale('es_ES');
        $fecha = Carbon::parse($this->attributes['updated_at']);
        return  $fecha->diffForHumans();
    }
    
    public function getJWTIdentifier()
        {
            return $this->getKey();
        }
        public function getJWTCustomClaims()
        {
            return [];
        }
}
