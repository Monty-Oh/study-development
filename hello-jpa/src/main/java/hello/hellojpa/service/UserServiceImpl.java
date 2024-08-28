package hello.hellojpa.service;

import hello.hellojpa.common.exception.DuplicateEmailException;
import hello.hellojpa.repository.UserRepository;
import hello.hellojpa.domain.User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String join(User user) {
        if(checkDuplicatedUser(user)) {
            throw new DuplicateEmailException();
        }
        userRepository.join(user);
        return user.getEmail();
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private boolean checkDuplicatedUser(User user) {
        Optional<User> result = userRepository.findByEmail(user.getEmail());
        return result.isPresent();
    }
}
