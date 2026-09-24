package com.example.experiment4.controller;

import com.example.experiment4.dto.ApiResponse;
import com.example.experiment4.entity.Schedule;
import com.example.experiment4.service.ScheduleService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedules")
@CrossOrigin(origins = "*")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Schedule>> createSchedule(
            @Valid @RequestBody Schedule schedule) {

        Schedule createdSchedule = scheduleService.createSchedule(schedule);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Schedule created successfully",
                        createdSchedule
                )
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Schedule>>> getAllSchedules() {

        List<Schedule> schedules = scheduleService.getAllSchedules();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Schedules retrieved successfully",
                        schedules
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Schedule>> getScheduleById(
            @PathVariable Long id) {

        return scheduleService.getScheduleById(id)
                .map(schedule -> ResponseEntity.ok(
                        new ApiResponse<>(
                                true,
                                "Schedule found successfully",
                                schedule
                        )
                ))
                .orElseGet(() -> ResponseEntity.status(404).body(
                        new ApiResponse<>(
                                false,
                                "Schedule not found",
                                null
                        )
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Schedule>> updateSchedule(
            @PathVariable Long id,
            @Valid @RequestBody Schedule schedule) {

        Schedule updatedSchedule =
                scheduleService.updateSchedule(id, schedule);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Schedule updated successfully",
                        updatedSchedule
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSchedule(
            @PathVariable Long id) {

        scheduleService.deleteSchedule(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Schedule deleted successfully",
                        null
                )
        );
    }
}