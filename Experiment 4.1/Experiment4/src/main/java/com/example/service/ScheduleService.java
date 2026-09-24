package com.example.experiment4.service;

import com.example.experiment4.entity.Schedule;
import com.example.experiment4.exception.ScheduleNotFoundException;
import com.example.experiment4.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Optional<Schedule> getScheduleById(Long id) {
        return scheduleRepository.findById(id);
    }

    public Schedule updateSchedule(Long id, Schedule scheduleDetails) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() ->
                        new ScheduleNotFoundException("Schedule not found"));

        schedule.setTask(scheduleDetails.getTask());
        schedule.setDate(scheduleDetails.getDate());
        schedule.setTime(scheduleDetails.getTime());

        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new ScheduleNotFoundException("Schedule not found");
        }

        scheduleRepository.deleteById(id);
    }
}