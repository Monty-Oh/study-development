package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemoryMemberRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class MemberServiceTest {
    MemberService service;
    MemoryMemberRepository repository;

    // 동작하기 전에 실행이 됨.
    @BeforeEach
    public void BeforeEach() {

        // 클래스 내에서 직접 만들지 않고 외부에서 객체를 생성해서 준다.
        // 이를 의존성 주입 이라고 함.
        repository = new MemoryMemberRepository();
        service = new MemberService(repository);
    }

    @AfterEach
    public void AfterEach() {
//        service.memberRepository.clearStore();
    }

    @Test
    void join() {
        // given
        Member member = new Member();
        member.setName("hello");

        // when
        Long saveId = service.join(member);

        // then
        Member findMember = service.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(findMember.getName());
    }

    @Test
    void 중복회원가입검증() {
        //given
        Member member = new Member();
        member.setName("member1");
        service.join(member);

        Member member2 = new Member();
        member2.setName("member1");

        // 두번째 매개변수의 동작을 수행했을 때 예외가나와야 한다.
        // 메세지 검증도 가능하다. 예외 객체를 반환하기 때문
        IllegalStateException e =
                assertThrows(IllegalStateException.class,
                        () -> service.join(member2));

        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");

//        try {
//            service.join(member2);
//
//        } catch (IllegalStateException e) {
//            assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원입니다.");
//        }
    }


    @Test
    void findMembers() {
    }

    @Test
    void findOne() {
    }
}