package com.product.trial.master.interceptor;

import com.product.trial.master.exceptions.TokenInvalidException;
import com.product.trial.master.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class AdminInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;


    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new TokenInvalidException("Token is null");
        }
        if ("GET".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);
        if (!"admin@admin.com".equals(email)) {
            throw new AccessDeniedException("Access Forbidden");
        }
        return true;
    }
}
