package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HtmlTestController {
    @GetMapping("/test1")
    public String HtmlTest1() {
        return "test1";
    }

    @GetMapping("/test1/test")
    @ResponseBody
    public String HtmlTest1Test() {
        System.out.println("here!!");
        return "here!!";
    }

    @GetMapping("/modal")
    public String HtmlTest2() {
        System.out.println("called!!");
        return "modal";
    }

    @PostMapping("/test1/test")
    public String HtmlTest1Test2(@RequestBody String data) {
        return "test2";
    }
}
