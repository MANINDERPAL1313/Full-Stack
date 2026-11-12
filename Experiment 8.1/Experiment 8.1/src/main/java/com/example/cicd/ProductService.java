package com.example.cicd;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ProductService {
 private final ProductRepository repository;
 public ProductService(ProductRepository repository){this.repository=repository;}
 public Product create(String name,double price){if(name==null||name.isBlank()) throw new IllegalArgumentException("Product name is required"); if(price<0) throw new IllegalArgumentException("Price cannot be negative"); return repository.save(new Product(name,price));}
 public List<Product> findAll(){return repository.findAll();}
 public Product findById(Long id){return repository.findById(id).orElseThrow(()->new ProductNotFoundException(id));}
}
