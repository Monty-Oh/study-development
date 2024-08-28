import HelloDockerService from "../application/HelloDockerService";
import MemberFindService from "../application/MemberFindService";
import Sns from "../../common/enums/Sns";

export default class MemberController {
	//  Singleton
	private static instance: MemberController;

	public static getInstance = () => {
		if (!this.instance) this.instance = new this();
		return this.instance;
	};

	private helloDockerService: HelloDockerService =
		HelloDockerService.getInstance();
	private memberFindService: MemberFindService =
		MemberFindService.getInstance();

	/**
	 * 유저 조회 - userId
	 * */
	findUser(userId: string, sns: string) {
		return this.memberFindService.findUserByUserIdAndSns(
			userId,
			Number(sns),
		);
	}

	/**
	 * 테스트 목적
	 * */
	getTest() {
		return this.helloDockerService.helloDocker();
	}
}
