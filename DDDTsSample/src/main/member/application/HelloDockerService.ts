export default class HelloDockerService {
	//  Singleton
	private static _instance: HelloDockerService;

	public static getInstance = () => {
		if (!this._instance) this._instance = new this();
		return this._instance;
	};

	/**
	 * Test Hello Docker!
	 * */
	public helloDocker(): object {
		return {
			message: "hello docker!!",
		};
	}
}
