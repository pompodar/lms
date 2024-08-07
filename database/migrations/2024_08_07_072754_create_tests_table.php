<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestsTable extends Migration
{
    public function up()
    {
        Schema::create('tests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained()->onDelete('cascade');
            $table->text('questions'); // Assuming questions is stored as JSON or plain text
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tests');
    }
}
