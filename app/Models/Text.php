<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Text extends Model
{
    use HasFactory;

    protected $fillable = ['lesson_id', 'content'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
