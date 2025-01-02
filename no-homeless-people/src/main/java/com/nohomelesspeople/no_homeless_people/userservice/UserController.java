package com.nohomelesspeople.no_homeless_people.userservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Kullanıcı güncelleme (mail bazlı).
     * PUT /api/users/{mail}
     */
    @PutMapping("/{mail}")
    public ResponseEntity<?> updateUser(
            @PathVariable String mail,
            @RequestBody User updateRequest,
            Authentication authentication
    ) {
        // Opsiyonel güvenlik kontrolü: JWT subject (authentication.getName()) == mail?
        String loggedInMail = authentication.getName();
        if (!loggedInMail.equals(mail)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You can only update your own account.");
        }

        try {
            User updated = userService.updateUserByMail(mail, updateRequest);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}