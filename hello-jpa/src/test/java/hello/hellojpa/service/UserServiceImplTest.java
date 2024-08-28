package hello.hellojpa.service;

import hello.hellojpa.common.exception.DuplicateEmailException;
import hello.hellojpa.domain.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class UserServiceImplTest {

    @Autowired
    UserService userService;

//    @Test
//    void DB커넥션테스트() {
//        EntityManagerFactory entityManagerFactory =
//                Persistence.createEntityManagerFactory("jpastart");
//
//        EntityManager entityManager = entityManagerFactory.createEntityManager();
//        EntityTransaction entityTransaction = entityManager.getTransaction();
//
//        try {
//            entityTransaction.begin();
//            User user = new User();
//            user.setEmail("test1");
//            user.setName("test1");
//            entityManager.persist(user);
//            entityTransaction.commit();
//        } catch (Exception e) {
//            e.printStackTrace();
//            entityTransaction.rollback();
//        } finally {
//            entityManager.close();
//        }
//        entityManagerFactory.close();
//    }

    @Test
    void 회원가입() {
        User user = new User();
        user.setEmail("test1");
        user.setName("test1");

        String name = userService.join(user);
        assertThat(name).isEqualTo("test1");
    }

    @Test
    void 회원가입실패_중복() {
        User user1 = new User();
        user1.setEmail("test1");
        user1.setName("test1");
        User user2 = new User();
        user2.setEmail("test1");
        user2.setName("test1");

        userService.join(user1);

        assertThrows(DuplicateEmailException.class, () -> {
            userService.join(user2);
        });
    }

    @Test
    void 회원가입후조회() {
        User user = new User();
        user.setEmail("tset1");
        user.setName("test1");

        String email = userService.join(user);
        Optional<User> result = userService.findUserByEmail("test1");
        result.ifPresent(value -> assertThat(value.getName()).isEqualTo(email));
    }
}