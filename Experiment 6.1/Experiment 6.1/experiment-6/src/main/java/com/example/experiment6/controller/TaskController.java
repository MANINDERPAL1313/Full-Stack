package com.example.experiment6.controller;

import com.example.experiment6.entity.Student;
import com.example.experiment6.entity.Task;
import com.example.experiment6.service.TaskService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping("/tasks")
    public Page<Task> getTasks(
            @PageableDefault(size = 5, sort = "createdAt")
            Pageable pageable) {

        return service.getTasks(pageable);
    }

    @GetMapping("/tasks/pending")
    public List<Task> getPendingTasks() {
        return service.getPendingTasks();
    }

    @GetMapping("/students")
    public List<Student> getStudents() {
        return service.getStudentsWithTasks();
    }

    @GetMapping("/tasks/high-priority")
    public List<Task> getHighPriorityTasks() {
        return service.getHighPriorityTasks();
    }
}