package com.example.experiment6.controller;

import com.example.experiment6.entity.Department;
import com.example.experiment6.service.DepartmentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DepartmentController {

    private final DepartmentService service;

    public DepartmentController(DepartmentService service) {
        this.service = service;
    }

    @GetMapping("/departments")
    public List<Department> getDepartments() {
        return service.getDepartments();
    }

    @GetMapping("/departments/search")
    public List<Department> searchDepartment(
            @RequestParam String name) {
        return service.searchDepartment(name);
    }
}