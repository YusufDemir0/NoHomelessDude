package com.nohomelesspeople.no_homeless_people.userservice;

import com.nohomelesspeople.no_homeless_people.postservice.PostService;
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

    private final PostService postService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(PostService postService) {
        this.postService = postService;
    }

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

        // Eski değerleri sakla
        String oldUsername = user.getUsername();
        String oldPhoto = user.getPhoto();

        boolean usernameChanged = false;
        boolean photoChanged = false;


        if (newData.getUsername() != null) {
            user.setUsername(newData.getUsername());
            usernameChanged = !newData.getUsername().equals(oldUsername);
        }
        if (newData.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(newData.getPassword()));
        }
        if (newData.getPhoto() != null) {
            user.setPhoto(newData.getPhoto());
            photoChanged = !newData.getPhoto().equals(oldPhoto);
        }

        User updatedUser = userRepository.save(user);

        // 4) Eğer username veya photo değiştiyse => ilgili postları güncelle
        if (usernameChanged || photoChanged) {
            postService.updatePostsCreatorInfo(
                    oldUsername,
                    updatedUser.getUsername(),
                    oldPhoto,
                    updatedUser.getPhoto()
            );
        }

        return updatedUser;
    }

    public LocalDateTime getCreationTime(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: " + username));

        return user.getCreateTime();
    }

}
