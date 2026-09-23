package com.example.experiment5.service;

import com.example.experiment5.model.Schedule;
import com.example.experiment5.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    private final ScheduleRepository repository;

    public ScheduleService(ScheduleRepository repository) {
        this.repository = repository;
    }

    public List<Schedule> getAllSchedules() {
        return repository.findAll();
    }

    public Schedule getScheduleById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
    }

    public Schedule createSchedule(Schedule schedule) {
        return repository.save(schedule);
    }

    public Schedule updateSchedule(Long id, Schedule schedule) {
        Schedule existing = getScheduleById(id);

        existing.setPostTitle(schedule.getPostTitle());
        existing.setScheduledDate(schedule.getScheduledDate());
        existing.setScheduledTime(schedule.getScheduledTime());

        return repository.save(existing);
    }

    public void deleteSchedule(Long id) {
        Schedule existing = getScheduleById(id);
        repository.delete(existing);
    }
}