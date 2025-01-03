package com.nohomelesspeople.no_homeless_people.userservice;

public interface IAuthenticationService {
    LoginResponse login(LoginRequest loginRequest);
}
