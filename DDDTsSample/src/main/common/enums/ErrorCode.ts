const ErrorCode = {
	/**
	 * 404 NOT_FOUND	:	Resource 를 찾을 수 없음.
	 * */
	USER_NOT_FOUND: {
		status: 404,
		message: "해당 유저 정보를 찾을 수 없습니다.",
	},
} as const;

export default ErrorCode;
