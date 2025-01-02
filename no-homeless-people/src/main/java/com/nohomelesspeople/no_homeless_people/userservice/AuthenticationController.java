package com.nohomelesspeople.no_homeless_people.userservice;

import com.nohomelesspeople.no_homeless_people.jwt.IJwtProvider;
import com.nohomelesspeople.no_homeless_people.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final UserService userService;

    private final IAuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(IAuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User userRequest) {

        if (userRequest.getMail() == null || userRequest.getMail().isEmpty()) {
            return ResponseEntity.badRequest().body("Mail alanı zorunludur.");
        }
        if (userRequest.getPassword() == null || userRequest.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Parola alanı zorunludur.");
        }


        try {
            User savedUser = userService.saveUser(userRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Kullanıcı kaydedilirken bir hata oluştu: " + e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse loginResponse = authenticationService.login(loginRequest);
            return ResponseEntity.ok(loginResponse);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }
}
