package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// 스프링 DataJPaㄱ가 JpaRepository를 상속받고 있으면 자동으로 구현해준다.
public interface SpringDataJapMemberRepository extends JpaRepository<Member, Long>, MemberRepository {

    // 기본적인 메소드들은 모두 제공되지만, 개인적으로 만든 것은 따로 구현해줘야 한다.
    // findBy 라고 시작하면 select를 해주고, name이 붙어있으므로 name이라는 속성을 찾는다.
    // 이름 규칙에 따라 자동으로 만들어준다.
    @Override
    Optional<Member> findByName(String name);
}
