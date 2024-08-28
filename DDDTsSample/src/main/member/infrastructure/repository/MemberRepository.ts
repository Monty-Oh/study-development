import Member from "../../domain/model/aggregates/Member";

interface MemberRepository {
	save(member: Member): Promise<Member>;
	findMemberByUserIdAndSns(member: Member): Promise<Member>;
}

export default MemberRepository;
