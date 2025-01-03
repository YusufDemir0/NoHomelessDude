package com.nohomelesspeople.no_homeless_people.jwt;

import com.nohomelesspeople.no_homeless_people.security.UserPrincipal;
import com.nohomelesspeople.no_homeless_people.util.SecurityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtProvider implements IJwtProvider {

    //@Value("${app.jwt.secret}")
    //private String JWT_SECRET;
    //private final String JWT_SECRET =
    // "thisIsASecretKeyThatIsAtLeast64CharactersLongForHS512ActuallyNotThatMuchButIHopePls";
    //Jwt yeni sistem yeterince uzun bir anhatar istiyor ve proje başlarken application.yaml 'dan değeri hızlıca alamıyor. Değer ataması olmadığı için kod hata veriyor.

    @Value("${app.jwt.expiration-in-ms}")
    private Long JWT_EXPIRATION_IN_MS;

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    private final Key key;

    public JwtProvider() {
        // Güvenli bir key oluştur
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    @Override
    public String generateToken(UserPrincipal auth) {

        System.out.println(auth.getUsername());
        try {
            return Jwts.builder()
                    .setSubject(auth.getMail())
                    .claim("userId", auth.getId())
                    .claim("displayName", auth.getUsername())
                    .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_IN_MS))
                    .signWith(key, SignatureAlgorithm.HS512)
                    .compact();
        }catch (Exception e){
            logger.error("Generate sıkıntı" + e.getMessage());
        }

        return null;
    }

    /**
     * JWT içindeki bilgileri parse edip 'Authentication' nesnesi döndürür.
     * Burada 'roles' veya benzeri bir kavram kullanılmadığı için
     * 'authorities' -> emptySet olarak ayarlıyoruz.
     */
    @Override
    public Authentication getAuthentication(HttpServletRequest request) {
        Claims claims = extractClaims(request);
        if (claims == null) {
            return null;
        }

        // Token'ın subject'inde mail bilgisi tutuluyor
        String mailOrUsername = claims.getSubject();
        System.out.println(mailOrUsername);

        // userId (String) olarak aldığımızı varsayıyoruz (MongoDB)
        String userId = claims.get("userId", String.class);

        // Rol olmadığı için emptySet kullanıyoruz
        Set<GrantedAuthority> authorities = Collections.emptySet();

        // UserPrincipal nesnesini oluştur

        UserPrincipal userDetails = UserPrincipal.builder()
                .id(userId)
                .username(mailOrUsername)
                .authorities(authorities)
                .build();

        if (mailOrUsername == null) {
            return null;
        }

        // Authentication nesnesi oluşturuluyor
        return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
    }

    /**
     * Token'ın geçerli olup olmadığını kontrol eder.
     */
    @Override
    public boolean validateToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        logger.error(bearerToken);
        String token = SecurityUtils.extractAuthTokenFromRequest(request);
        if (token == null) {
            logger.error("Token is null");
            return false;
        }
        Claims claims = extractClaims(request);
        if (claims == null) {
            return false;
        }
        if (claims.getExpiration().before(new Date())) {
            return false;
        }
        return true;
    }

    /**
     * Token'dan 'Claims' objesini çıkartır.
     */
    private Claims extractClaims(HttpServletRequest request) {
        String token = SecurityUtils.extractAuthTokenFromRequest(request);
        if (token == null) {
            logger.error("JWT Provider token is null");
            return null;
        }

        try {
            return Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            logger.error("JWT token parsing failed: {}", e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
