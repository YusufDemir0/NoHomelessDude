package com.nohomelesspeople.no_homeless_people.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    private IJwtProvider jwtProvider;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthorizationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        logger.debug("JwtAuthorizationFilter - doFilterInternal invoked");

        Authentication authentication = null;

        try {
            // JWT içindeki kimlik bilgilerini alıyoruz
            authentication = jwtProvider.getAuthentication(request);
        } catch (Exception e) {
            logger.error("Error getting authentication: {}", e.getMessage());
        }

        try {
            // Token geçerliyse SecurityContextHolder'a yerleştiriyoruz
            if (authentication != null && jwtProvider.validateToken(request)) {
                logger.debug("Token is valid, setting SecurityContextHolder authentication");
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Error validating token: {}", e.getMessage());
        }

        // Filtre zincirine devam
        filterChain.doFilter(request, response);
    }
}
