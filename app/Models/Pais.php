<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    use HasFactory;
    
    protected $table = 'pais';
    // Asi cambiamos que el campo de clave primaria sea code para que no haya problemas al buscar
    protected $primaryKey = 'code';
    // Decirle a laravel que el codigo no es int y que es string
    protected $keyType = 'string';
    
    // Como esta tabla le hemos quitado los timestamps tenemos que decirselo
    public $timestamps = false;
    
    protected $fillable = ['code', 'name'];
}
