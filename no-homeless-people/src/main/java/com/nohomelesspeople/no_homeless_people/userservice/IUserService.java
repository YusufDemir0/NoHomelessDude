package com.nohomelesspeople.no_homeless_people.userservice;

import java.util.Optional;

public interface IUserService {
    User saveUser(User user);

    Optional<User> findByUsername(String username);

    Optional<User> findByMail(String mail);
}
