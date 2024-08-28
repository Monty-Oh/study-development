import Sns from "../../../../common/enums/Sns";

export default class MemberDto {
	private userNo: number;
	private userId: string;
	private email: string;
	private nickName: string;
	private mobileNo: string;
	private sns: Sns;

	constructor(
		userNo: number,
		userId: string,
		email: string,
		nickName: string,
		mobileNo: string,
		sns: Sns,
	) {
		this.userNo = userNo;
		this.userId = userId;
		this.email = email;
		this.nickName = nickName;
		this.mobileNo = mobileNo;
		this.sns = sns;
	}

	// private SnsInfo snsInfo;
	// private UserBasic userBasic;
}
