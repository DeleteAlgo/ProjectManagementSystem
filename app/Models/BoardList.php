<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BoardList extends Model
{
    public function board()
    {
        return $this->belongsTo(Board::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
                                 