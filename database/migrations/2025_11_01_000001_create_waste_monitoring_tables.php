<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Tabel untuk lokasi pembuangan sampah
        Schema::create('waste_locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->enum('type', ['TPS', 'TPA', 'Bank Sampah']);
            $table->integer('capacity_kg')->nullable();
            $table->timestamps();
        });

        // Tabel untuk perangkat IoT
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('device_id')->unique();
            $table->foreignId('waste_location_id')->constrained();
            $table->string('name');
            $table->enum('status', ['active', 'inactive', 'maintenance']);
            $table->json('specifications')->nullable();
            $table->timestamp('last_ping')->nullable();
            $table->timestamps();
        });

        // Tabel untuk pembacaan sensor
        Schema::create('sensor_readings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')->constrained();
            $table->decimal('waste_level', 5, 2); // Persentase kapasitas terisi
            $table->decimal('temperature', 5, 2)->nullable();
            $table->decimal('humidity', 5, 2)->nullable();
            $table->decimal('methane_level', 8, 2)->nullable();
            $table->json('additional_data')->nullable();
            $table->timestamp('recorded_at');
            $table->timestamps();
        });

        // Tabel untuk pengelolaan sampah
        Schema::create('waste_collections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('waste_location_id')->constrained();
            $table->integer('weight_kg');
            $table->enum('waste_type', ['organic', 'inorganic', 'b3', 'mixed']);
            $table->string('vehicle_number')->nullable();
            $table->string('officer_name');
            $table->timestamp('collected_at');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // Tabel untuk laporan/alerts
        Schema::create('alerts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')->constrained();
            $table->string('title');
            $table->text('description');
            $table->enum('severity', ['low', 'medium', 'high', 'critical']);
            $table->enum('status', ['open', 'acknowledged', 'resolved']);
            $table->timestamp('resolved_at')->nullable();
            $table->text('resolution_notes')->nullable();
            $table->timestamps();
        });

        // Tabel untuk maintenance log
        Schema::create('maintenance_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')->constrained();
            $table->string('technician_name');
            $table->text('work_performed');
            $table->enum('maintenance_type', ['routine', 'repair', 'upgrade']);
            $table->timestamp('scheduled_at');
            $table->timestamp('completed_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('maintenance_logs');
        Schema::dropIfExists('alerts');
        Schema::dropIfExists('waste_collections');
        Schema::dropIfExists('sensor_readings');
        Schema::dropIfExists('devices');
        Schema::dropIfExists('waste_locations');
    }
};