package com.nohomelesspeople.no_homeless_people.userservice;

import com.nohomelesspeople.no_homeless_people.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private IUserService userService;

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    /**
     * loadUserByUsername: Spring Security, username parametresiyle çağırır.
     * Ancak biz bu projede "mail" üzerinden login yaptığımız için,
     * burada "username" aslında "mail" anlamına geliyor.
     */
    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        logger.error("CustomUserDetailsService - loadUserByUsername: " + mail);

        // Kullanıcıyı mail üzerinden arıyoruz
        User user = userService.findByMail(mail)
                .orElseThrow(() -> new UsernameNotFoundException("Kullanıcı bulunamadı: " + mail));

        // Role kavramı olmadığı için authorities'i boş set olarak tutuyoruz
        return UserPrincipal.builder()
                .user(user)
                .id(user.getId())
                .username(user.getMail())             // getUsername() -> mail
                .password(user.getPassword())
                .authorities(Collections.emptySet())   // Rol yok, boş set
                .build();
    }
}
