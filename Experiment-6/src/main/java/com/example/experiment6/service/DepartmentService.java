package com.example.experiment6.service;

import com.example.experiment6.entity.Department;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository repository;

    public DepartmentService(DepartmentRepository repository) {
        this.repository = repository;
    }

    @Cacheable("departments")
    public List<Department> getDepartments() {

        System.out.println(">>> JOIN FETCH: Database query executed <<<");

        return repository.findDepartmentsWithEmployees();
    }

    public List<Department> searchDepartment(String name) {

        System.out.println(">>> NATIVE SQL: Database query executed <<<");

        return repository.findByDepartmentName(name);
    }
}