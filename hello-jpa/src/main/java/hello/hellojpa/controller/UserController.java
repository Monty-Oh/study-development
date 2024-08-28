package hello.hellojpa.controller;

import hello.hellojpa.domain.User;
import hello.hellojpa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/API")
public class UserController {

    private final  UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String saveUserTest() {
        User user = new User();
        user.setEmail("monty@plgrim.com");
        user.setName("monty");
        userService.join(user);
        return "SUCCESS";
    }
}
