import { expect } from "chai";
import MemberController from "../../../main/member/controller/MemberController";
import * as sinon from "sinon";
import HelloDockerService from "../../../main/member/application/HelloDockerService";
import MemberFindService from "../../../main/member/application/MemberFindService";
import MemberDto from "../../../main/member/controller/dto/user/UserDto";
import Sns from "../../../main/common/enums/Sns";

describe("MemberController 테스트", () => {
	const memberController: MemberController = MemberController.getInstance();

	it("MemberController.findUserByUsrNo Test Suite", () => {
		//	given
		const memberFindService = MemberFindService.getInstance();
		const memberFindServiceMock = sinon.mock(memberFindService);
		const expectedUser = new MemberDto(
			1,
			"monty",
			"monty@plgrim.com",
			"monty",
			"01040684490",
			Sns.GOOGLE,
		);
		memberFindServiceMock
			.expects("findUserByUserIdAndSns")
			.once()
			.withArgs("monty", 0)
			.returns(expectedUser);

		//	when
		const result = memberController.findUser("monty", "0");

		//	then
		expect(result).to.deep.equal(expectedUser);
		memberFindServiceMock.restore();
	});

	it("MemberController.getTest Test Suite", () => {
		//	given
		const helloDockerService = HelloDockerService.getInstance();
		const helloDockerServiceMock = sinon.mock(helloDockerService);
		const expectedMessage = { message: "hello sinon!!" };
		helloDockerServiceMock
			.expects("helloDocker")
			.once()
			.withArgs()
			.returns(expectedMessage);

		//	when
		const result = memberController.getTest();

		//	then
		expect(result).to.deep.equal(expectedMessage);
		helloDockerServiceMock.restore();
	});
});
