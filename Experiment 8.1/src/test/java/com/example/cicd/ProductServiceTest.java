package com.example.cicd;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
 @Mock ProductRepository repository; @InjectMocks ProductService service;
 @Test void rejectsBlankName(){assertThrows(IllegalArgumentException.class,()->service.create(" ",10)); verifyNoInteractions(repository);}
 @Test void rejectsNegativePrice(){assertThrows(IllegalArgumentException.class,()->service.create("Keyboard",-1)); verifyNoInteractions(repository);}
 @Test void createsValidProduct(){Product p=new Product("Keyboard",50); when(repository.save(any(Product.class))).thenReturn(p); assertEquals("Keyboard",service.create("Keyboard",50).getName());}
}
