package hello.hellospring.controller;

import hello.hellospring.domain.Member;
import hello.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

/**
 * 스프링 컨테이너가 컨트롤러 객체를 생성해서 관리를 하기 시작한다.
 * annotation을 보고 결정한다.
 * 이를 spring bean이 관리된다 라고 표현한다.
 */
@Controller
public class MemberController {
    /**
     * new해서 쓰면 다른 컨트롤러들에서 서비스를 쓸 때 문제가 발생한다.
     * 객체가 새로 생성되어서 static을 제외하고는 다른 객체가 생성되기 때문.
     * spring 컨테이너에 등록을 하고 사용하면 된다. (한개만 등록되기 때문)
     */
    private final MemberService memberService;

    /**
     * 생성자에 Autowired가 사용되어 있으면,
     * 스프링이 컨테이너에 있는 Memberservice를 데려다가 연결해준다.
     * 이게 바로 DI
     */
    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/members/new")
    // createMemberForm 페이지를 찾는다.
    public String createForm() {
        return "members/createMemberForm";
    }

    /**
     * 회원가입 폼 전달
     */
    @PostMapping("/members/new")
    public String create(MemberForm form) {
        // MemberForm에 맞춰져서 들어온다.
        Member member = new Member();
        member.setName(form.getName());

        memberService.join(member);

        // home으로 리다이렉트
        return "redirect:/";
    }

    // members 목록 조회 페이지
    @GetMapping("members")
    public String list(Model model) {
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return "members/memberList";
    }
}
