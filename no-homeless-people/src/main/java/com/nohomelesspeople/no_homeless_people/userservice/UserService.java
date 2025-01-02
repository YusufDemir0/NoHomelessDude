package com.nohomelesspeople.no_homeless_people.userservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {

        // Şifre encode ediliyor
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Oluşturulma zamanı ayarlanıyor
        user.setCreateTime(LocalDateTime.now());

        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByMail(String mail) {
        return userRepository.findByMail(mail);
    }

    public User updateUserByMail(String mail, User newData) {

        User user = userRepository.findByMail(mail)
                .orElseThrow(() -> new RuntimeException("User not found with mail: " + mail));


        // Alanları güncelle (null check opsiyonel)
        if (newData.getUsername() != null) {
            user.setUsername(newData.getUsername());
        }
        if (newData.getPassword() != null) {
            // Şifreyi encode etme
            user.setPassword(passwordEncoder.encode(newData.getPassword()));
        }
        if (newData.getPhoto() != null) {
            user.setPhoto(newData.getPhoto());
        }

        // Güncellenmiş user'ı kaydet
        return userRepository.save(user);
    }

}
