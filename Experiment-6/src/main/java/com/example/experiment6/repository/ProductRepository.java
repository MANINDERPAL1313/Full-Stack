package com.example.experiment6.repository;

import com.example.experiment6.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p")
    List<Product> findAllProducts();
}