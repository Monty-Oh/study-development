package hello.hellospring;

import hello.hellospring.aop.TimeTraceAop;
import hello.hellospring.repository.MemberRepository;
import hello.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 자바 코드로 직접 스프링 빈을 등록하는 방법.
 * 직접 스프링 빈을 등록하는 점의 장점은
 * 나중에 DB환경이 바뀔 때 다른 코드를 건드리지 않고
 * 여기서 바꿔서 연결해주면 끝이다.
 */
@Configuration
public class SpringConfig {

    // 스프링 컨테이너에서 JpaRepository를 상속받는 인터페이스가 있으면 알아서 구현해서 스프링 빈에 등록해둔다.
    private final MemberRepository memberRepository;

    /**
     * Spring이 앞서 생성해놓은 application.properties의 설정을 보고
     * 알아서 빈을 생성해 준다. 따라서 DataSource를 생성자 매개변수로 넣으면 된다.
     */
//    private DataSource dataSource;
//
//    @Autowired
//    public SpringConfig(DataSource dataSource) {
//        this.dataSource = dataSource;
//    }
    @Autowired
    public SpringConfig(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository);
    }

/*    @Bean
    public MemberRepository memberRepository() {
//        return new MemoryMemberRepository();
//        return new JdbcMemberRepository(dataSource);
//        return new JpaMemberRepository(em);

    }*/
}