package hello.hellojpa.repository;

import hello.hellojpa.domain.User;

import java.util.Optional;

public interface UserRepository {
//    Optional<User> findByName(String name);

    Optional<User> findByEmail(String name);

    User join(User user);
}
