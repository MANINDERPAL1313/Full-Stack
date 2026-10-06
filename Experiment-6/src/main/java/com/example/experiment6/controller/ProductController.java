package com.example.experiment6.controller;

import com.example.experiment6.entity.Product;
import com.example.experiment6.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    // GET all products
    @GetMapping
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    // GET product by ID
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // CREATE product
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return repository.save(product);
    }

    // UPDATE product
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        Product existing = repository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setName(product.getName());
        existing.setPrice(product.getPrice());

        return repository.save(existing);
    }

    // DELETE product
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return "Product not found";
        }

        repository.deleteById(id);
        return "Product deleted successfully";
    }
}