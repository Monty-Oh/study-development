import MemberRepository from "../infrastructure/repository/MemberRepository";
import MemberMongodbRepository from "../infrastructure/repository/MemberMongodbRepository";

export default class MemberJoinService {
	//  Singleton
	private static instance: MemberJoinService;

	public static getInstance = () => {
		if (!this.instance) this.instance = new this();
		return this.instance;
	};

	private memberRepository: MemberRepository =
		MemberMongodbRepository.getInstance();
}
