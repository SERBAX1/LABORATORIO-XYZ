package com.room911.room911.Service;

import com.room911.room911.Dto.LoginRequest;
import com.room911.room911.Entity.User;
import com.room911.room911.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Usado por loginController
    public Optional<User> autenticarUsuario(String correo, String contrasena) {
        System.out.println("Attempting to authenticate user: " + correo);
        Optional<User> userOptional = userRepository.findByCorreo(correo);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println("User found: " + user.getCorreo());
            System.out.println("Stored hashed password: " + user.getContraseña());
            System.out.println("Provided raw password: " + contrasena);

            if (user.getContraseña() != null && passwordEncoder.matches(contrasena, user.getContraseña())) {
                System.out.println("Password matches. Authentication successful.");
                return Optional.of(user);
            } else {
                System.out.println("Password does NOT match or stored password is null.");
            }
        } else {
            System.out.println("User not found with email: " + correo);
        }
        return Optional.empty();
    }

    // Usado por UserController
    public Optional<User> login(String correo, String contrasena) {
        return autenticarUsuario(correo, contrasena);
    }

    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        Optional<User> userOptional = autenticarUsuario(loginRequest.getCorreo(), loginRequest.getContrasena());
        if (userOptional.isPresent()) {
            return ResponseEntity.ok().body("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    public User register(User user) {
        if (userRepository.findByCorreo(user.getCorreo()).isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado");
        }
        user.setContraseña(passwordEncoder.encode(user.getContraseña()));
        return userRepository.save(user);
    }

    public long getUserCount() {
        return userRepository.count();
    }

    public Optional<User> findByCorreo(String correo) {
        return userRepository.findByCorreo(correo);
    }
}
