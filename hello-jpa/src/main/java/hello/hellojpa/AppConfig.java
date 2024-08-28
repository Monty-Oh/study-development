package hello.hellojpa;

import hello.hellojpa.repository.JpaUserRepository;
import hello.hellojpa.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@Configuration
public class AppConfig {

    final EntityManager entityManager;

    public AppConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Bean
    public UserRepository userRepository() {
        return new JpaUserRepository(entityManager);
    }
}
