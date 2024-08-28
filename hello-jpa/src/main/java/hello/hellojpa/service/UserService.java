package hello.hellojpa.service;

import hello.hellojpa.domain.User;

import java.util.Optional;

public interface UserService {
    String join(User user);
    Optional<User> findUserByEmail(String name);
}
