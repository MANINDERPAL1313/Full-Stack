package com.example.experiment4.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger logger =
            LoggerFactory.getLogger(RequestLoggingFilter.class);

    private static final String CORRELATION_ID = "correlationId";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        long startTime = System.currentTimeMillis();

        String correlationId = request.getHeader(CORRELATION_ID);

        if (correlationId == null || correlationId.isBlank()) {
            correlationId = UUID.randomUUID().toString();
        }

        MDC.put(CORRELATION_ID, correlationId);
        response.setHeader(CORRELATION_ID, correlationId);

        try {
            logger.info("Request started: {} {}",
                    request.getMethod(),
                    request.getRequestURI());

            filterChain.doFilter(request, response);

        } finally {
            long executionTime =
                    System.currentTimeMillis() - startTime;

            logger.info(
                    "Request completed: {} {} | Status: {} | Execution time: {} ms",
                    request.getMethod(),
                    request.getRequestURI(),
                    response.getStatus(),
                    executionTime
            );

            MDC.remove(CORRELATION_ID);
        }
    }
}