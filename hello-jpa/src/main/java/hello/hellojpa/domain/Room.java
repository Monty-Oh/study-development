package hello.hellojpa.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "room_info")
@ToString
public class Room {
    @Id
    private String number;
    private String name;

    @Column(name = "description")
    private String desc;

    @Column(name = "id", insertable = false, updatable = false)
    private Long dbId;
}
