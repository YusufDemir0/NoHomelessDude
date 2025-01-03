package com.nohomelesspeople.no_homeless_people.userservice;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String username;
    private String mail;
    private String password;
    private LocalDateTime createTime;
    private String photo;

    @Transient
    private String token;
}
