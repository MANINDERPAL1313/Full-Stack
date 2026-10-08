package com.example.experiment6.repository;

import com.example.experiment6.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.status = 'Pending'")
    List<Task> findPendingTasks();

    @Query(
        value = "SELECT * FROM task WHERE priority >= 4 ORDER BY priority DESC",
        nativeQuery = true
    )
    List<Task> findHighPriorityTasks();
}