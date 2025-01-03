package com.nohomelesspeople.no_homeless_people.security;

import com.nohomelesspeople.no_homeless_people.userservice.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPrincipal implements UserDetails {

    @Getter
    private String id;
    private String username;
    private String mail;
    transient private String password;
    transient private User user;
    private Set<GrantedAuthority> authorities;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Projede rol yoksa boş set döndürebiliriz
        return Collections.emptySet();
    }

    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {   // DİKKAT -- Burada mail döndürüyoruz --
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}
