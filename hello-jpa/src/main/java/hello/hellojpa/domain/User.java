package hello.hellojpa.domain;

import hello.hellojpa.common.enums.Grade;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
public class User {
    @Id
    private String email;
    private String name;

    //    @Temporal(TemporalType.TIMESTAMP)   // java.sql.Timestamp를 이용해서 매핑을 처리함을 뜻함.
//    @Column(name = "create_date")       // 매핑할 테이블의 이름을 지정
//    private Date createDate;
    
    // 생성시간
    @CreationTimestamp                      // 생성 시간 자동 입력
    @Column(updatable = false, name = "create_date")
    private LocalDateTime createDate;

    // 업데이트 시간
    @UpdateTimestamp
    @Column(name = "update_date")
    private LocalDateTime updateDate;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    public User() {
        this.grade = Grade.SECOND;
    }

    public void changeName(String newName) {
        this.name = newName;
    }
}
