package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

public class MemoryMemberRepositoryTest {
    MemoryMemberRepository repository = new MemoryMemberRepository();

    // 동작이 끝날 때마다 실행되는 메소드
    @AfterEach
    public void afterEach(){
        // 공용데이터를 깔끔하게 비워야함.
        repository.clearStore();
    }

    @Test
    public void save(){
        Member member = new Member();
        member.setName("spring");

        repository.save(member);

        // Optional인 경우 get으로 값을 꺼내올 수 있다.
        Member result = repository.findById(member.getId()).get();
        assertThat(member).isEqualTo(result);
    }

    @Test
    public void findById() {
        Member member = new Member();
        member.setName("member");
        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        assertThat(member).isEqualTo(result);
    }

    @Test
    public void findByName() {
        Member member = new Member();
        member.setName("member");
        repository.save(member);

        Member member2 = new Member();
        member.setName("member2");
        repository.save(member2);

        Member result = repository.findByName(member.getName()).get();
        assertThat(member).isEqualTo(result);
    }

    @Test
    public void findAll() {
        Member member = new Member();
        member.setName("member");
        repository.save(member);

        Member member2 = new Member();
        member.setName("member2");
        repository.save(member2);

        List<Member> result = repository.findAll();

        assertThat(result.size()).isEqualTo(2);
    }
}
