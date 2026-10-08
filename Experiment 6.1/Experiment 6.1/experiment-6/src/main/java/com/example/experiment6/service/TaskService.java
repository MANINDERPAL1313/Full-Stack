package com.example.experiment6.service;

import com.example.experiment6.entity.Student;
import com.example.experiment6.entity.Task;
import com.example.experiment6.repository.StudentRepository;
import com.example.experiment6.repository.TaskRepository;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final StudentRepository studentRepository;

    public TaskService(TaskRepository taskRepository,
                       StudentRepository studentRepository) {
        this.taskRepository = taskRepository;
        this.studentRepository = studentRepository;
    }

    public Page<Task> getTasks(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }

    public List<Task> getPendingTasks() {
        return taskRepository.findPendingTasks();
    }

    @Cacheable("students")
    public List<Student> getStudentsWithTasks() {

        System.out.println(">>> DATABASE: JOIN FETCH executed <<<");

        return studentRepository.findStudentsWithTasks();
    }

    public List<Task> getHighPriorityTasks() {

        System.out.println(">>> DATABASE: Native SQL executed <<<");

        return taskRepository.findHighPriorityTasks();
    }
}