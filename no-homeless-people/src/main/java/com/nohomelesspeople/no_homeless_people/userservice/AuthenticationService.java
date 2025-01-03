package com.nohomelesspeople.no_homeless_people.userservice;

import com.nohomelesspeople.no_homeless_people.jwt.IJwtProvider;
import com.nohomelesspeople.no_homeless_people.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService implements IAuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final IJwtProvider jwtProvider;

    @Autowired
    private IUserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager, IJwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {

        if (loginRequest.getMail() == null || loginRequest.getMail().isEmpty()) {
            throw new RuntimeException("Mail alanı zorunludur.");
        }
        if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            throw new RuntimeException("Şifre alanı zorunludur.");
        }

        try {
            logger.error(loginRequest.getMail());

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getMail(),
                            loginRequest.getPassword()
                    )
            );

            // 3. Doğrulama başarılı ise Authentication nesnesinden UserPrincipal al
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            // 4. JWT token oluştur
            String token = jwtProvider.generateToken(userPrincipal);

            // findByUsername(...) -> Optional<User>
            User user = userRepository.findByUsername(userPrincipal.getUsername())
                    .orElseThrow(() -> new RuntimeException(
                            "User not found with username: " + userPrincipal.getUsername()
                    ));

            // 5. Yanıt olarak LoginResponse döndür
            return new LoginResponse(
                    token,
                    userPrincipal.getUsername(),
                    userPrincipal.getMail(),
                    user.getPhoto(),
                    "Login successful");
        }
        catch (Exception ex) {
            // Kimlik doğrulama başarısız ise
            throw new RuntimeException("Mail veya şifre hatalı." + ex.getMessage());
        }
    }
}
