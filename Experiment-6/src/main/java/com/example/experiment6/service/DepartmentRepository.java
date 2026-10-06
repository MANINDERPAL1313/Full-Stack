package com.example.experiment6.service;

import com.example.experiment6.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    @Query("SELECT DISTINCT d FROM Department d JOIN FETCH d.employees")
    List<Department> findDepartmentsWithEmployees();

    @Query(
        value = "SELECT * FROM department WHERE name = ?1",
        nativeQuery = true
    )
    List<Department> findByDepartmentName(String name);
}