package hello.hellojpa.repository;

import hello.hellojpa.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.Optional;

//@Component
public class JpaUserRepository implements UserRepository {

    private final EntityManager em;

    @Autowired
    public JpaUserRepository(EntityManager em) {
        this.em = em;
    }

    // name 조회
//    @Override
//    public Optional<User> findByName(String name) {
//        User user = em.find(User.class, name);
//        return Optional.ofNullable(user);
//    }

    @Override
    public Optional<User> findByEmail(String email) {
        User user = em.find(User.class, email);
        return Optional.ofNullable(user);
    }

    @Override
    public User join(User user) {
        em.persist(user);
        return user;
    }
}
