<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveTypeContentMediaUrlFromLessonsTable extends Migration
{
    public function up()
    {
        Schema::table('lessons', function (Blueprint $table) {
            // Remove columns
            $table->dropColumn(['type', 'content', 'media_url']);
        });
    }

    public function down()
    {
        Schema::table('lessons', function (Blueprint $table) {
            // Add columns back if rolling back the migration
            $table->string('type')->default('text')->after('title');
            $table->text('content')->nullable()->after('type');
            $table->string('media_url')->nullable()->after('content');
        });
    }
}

