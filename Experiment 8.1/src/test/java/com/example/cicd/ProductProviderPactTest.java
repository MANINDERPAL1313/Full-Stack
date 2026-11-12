package com.example.cicd;
import au.com.dius.pact.provider.junit5.HttpTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junit5.PactVerificationInvocationContextProvider;
import au.com.dius.pact.provider.junit5.Provider;
import au.com.dius.pact.provider.junit5.State;
import au.com.dius.pact.provider.junit5.loader.PactFolder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
@Provider("product-service") @PactFolder("pacts") @SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT) @Testcontainers
class ProductProviderPactTest {
 @Container static PostgreSQLContainer<?> postgres=new PostgreSQLContainer<>("postgres:16-alpine").withDatabaseName("pact").withUsername("pact").withPassword("pact");
 @DynamicPropertySource static void db(DynamicPropertyRegistry r){r.add("spring.datasource.url",postgres::getJdbcUrl);r.add("spring.datasource.username",postgres::getUsername);r.add("spring.datasource.password",postgres::getPassword);}
 @LocalServerPort int port;
 @BeforeEach void setup(PactVerificationContext context){context.setTarget(new HttpTestTarget("localhost",port));}
 @State("products exist") void productsExist(){}
 @TestTemplate @ExtendWith(PactVerificationInvocationContextProvider.class) void verifyPact(PactVerificationContext context){context.verifyInteraction();}
}
