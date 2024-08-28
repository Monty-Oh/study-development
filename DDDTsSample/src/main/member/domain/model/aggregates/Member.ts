import Sns from "../../../../common/enums/Sns";

export default class Member {
	constructor(
		// private userNo?: number,
		private _userId?: string,
		private _email?: string,
		private _nickName?: string,
		private _mobileNo?: string,
		private _sns?: Sns,
	) {}

	get userId(): string {
		return <string>this._userId;
	}

	get email(): string {
		return <string>this._email;
	}

	get nickName(): string {
		return <string>this._nickName;
	}

	get mobileNo(): string {
		return <string>this._mobileNo;
	}

	get sns(): Sns {
		return <Sns>this._sns;
	}
}
