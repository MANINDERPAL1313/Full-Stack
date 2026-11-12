package com.example.cicd;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/products")
public class ProductController {
 private final ProductService service;
 public ProductController(ProductService service){this.service=service;}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Product create(@RequestBody CreateProductRequest request){return service.create(request.name(),request.price());}
 @GetMapping public List<Product> all(){return service.findAll();}
 @GetMapping("/{id}") public Product byId(@PathVariable Long id){return service.findById(id);}
 public record CreateProductRequest(String name,double price){}
 @ExceptionHandler(ProductNotFoundException.class) @ResponseStatus(HttpStatus.NOT_FOUND) public ErrorResponse notFound(ProductNotFoundException ex){return new ErrorResponse(ex.getMessage());}
 @ExceptionHandler(IllegalArgumentException.class) @ResponseStatus(HttpStatus.BAD_REQUEST) public ErrorResponse badRequest(IllegalArgumentException ex){return new ErrorResponse(ex.getMessage());}
 public record ErrorResponse(String message){}
}
