package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

// 순수 자바 클래스일때는 스프링이 MemberService가 빈으로 관리하지 않는다.
// 따라서 Autowired가 먹히질 않기 때문에, 해당 어노테이션을 사용해야 한다.
//@Service

/**
 * 데이터를 변경하는 작업이 있다면
 * 항상 Transactional 어노테이션을 붙여야한다.
 */
@Transactional
public class MemberService {
    MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * 멤버 회원 가입.
     **/
    public long join(Member member) {
        // 같은 이름의 중복 회원이 있으면 안된다.
        validateDuplicateMember(member);

        // 중복 회원이 없다면, 저장한다.
        memberRepository.save(member);
        return member.getId();
    }

    /**
     * 중복 회원 검증
     **/
    private void validateDuplicateMember(Member member) {
        // repository에서 해당 멤버의 이름을 기준으로 검색
        memberRepository.findByName(member.getName())
                .ifPresent((item) -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    /**
     * 전체 회원 조회
     */
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    /**
     * 일부 회원 조회
     */
    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
