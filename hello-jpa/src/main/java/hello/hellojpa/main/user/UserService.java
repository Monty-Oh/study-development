package hello.hellojpa.main.user;

import hello.hellojpa.common.exception.DuplicateEmailException;
import hello.hellojpa.common.exception.UserNotFoundException;
import hello.hellojpa.domain.User;
import hello.hellojpa.main.EMF;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

public class UserService {

    // 회원가입
    public void join(User user) {
        EntityManager em = EMF.createEntityManager();
        em.getTransaction().begin();
        try {
            User found = em.find(User.class, user.getEmail());
            if (Optional.ofNullable(found).isPresent())
                throw new DuplicateEmailException();

            em.persist(user);
            em.getTransaction().commit();
        } catch (Exception ex) {
            em.getTransaction().rollback();
            throw ex;
        } finally {
            em.close();
        }
    }

    // 조회
    public Optional<User> getUser(String email) {
        EntityManager em = EMF.createEntityManager();
        User user = em.find(User.class, email);
        try {
            return Optional.ofNullable(user);
        } finally {
            em.close();
        }
    }

    // 이름 수정
    public void changeName(String email, String newName) {
        EntityManager em = EMF.createEntityManager();
        try {
            em.getTransaction().begin();
            User user = em.find(User.class, email);
            if(Optional.ofNullable(user).isEmpty())
                throw new UserNotFoundException();

            user.changeName(newName);
            em.getTransaction().commit();
        } catch(Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    // 목록 조회
    public List<User> getAllUsers() {
        EntityManager em = EMF.createEntityManager();
        try {
            em.getTransaction().begin();
            TypedQuery<User> query =
                    em.createQuery(
                            "select u from User u order by u.name",
                            User.class
                    );
            List<User> result = query.getResultList();
            em.getTransaction().commit();
            return result;
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    // 유저 삭제
    public void deleteUser(String email) {
        EntityManager em = EMF.createEntityManager();
        try {
            em.getTransaction().begin();
            User user = em.find(User.class, email);
            if(Optional.ofNullable(user).isEmpty())
                throw new UserNotFoundException();

            em.remove(user);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
}
