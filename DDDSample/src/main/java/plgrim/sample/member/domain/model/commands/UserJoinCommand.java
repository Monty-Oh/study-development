package plgrim.sample.member.domain.model.commands;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import plgrim.sample.common.enums.Sns;
import plgrim.sample.member.domain.model.entities.SnsInfo;
import plgrim.sample.member.domain.model.valueobjects.UserBasic;

@Builder
@Getter
@ToString
public class UserJoinCommand {
    private String userId;
    private String email;
    private String password;
    private String nickName;
    private String mobileNo;
    private Sns snsType;
    private SnsInfo snsInfo;
    private UserBasic userBasic;
}
