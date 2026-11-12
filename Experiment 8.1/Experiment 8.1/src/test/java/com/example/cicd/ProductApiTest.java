package com.example.cicd;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
@SpringBootTest @AutoConfigureMockMvc
class ProductApiTest {
 @Autowired MockMvc mvc;
 @Test void createsAndReadsProduct() throws Exception {
  mvc.perform(post("/api/products").contentType(MediaType.APPLICATION_JSON).content("{"name":"Mouse","price":25}")) .andExpect(status().isCreated()).andExpect(jsonPath("$.name").value("Mouse"));
  mvc.perform(get("/api/products")).andExpect(status().isOk()).andExpect(jsonPath("$[0].name").value("Mouse"));
 }
 @Test void rejectsNegativePrice() throws Exception {mvc.perform(post("/api/products").contentType(MediaType.APPLICATION_JSON).content("{"name":"Mouse","price":-5}" )).andExpect(status().isBadRequest());}
}
