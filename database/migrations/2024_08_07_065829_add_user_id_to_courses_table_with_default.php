<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

class AddUserIdToCoursesTableWithDefault extends Migration
{
    public function up()
    {
        Schema::table('courses', function (Blueprint $table) {
            // Ensure there is at least one user to set as default
            $defaultUser = User::first();
            $defaultUserId = $defaultUser ? $defaultUser->id : null;

            // Add the column with a default value
            $table->foreignId('user_id')->default($defaultUserId)->constrained()->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
}
