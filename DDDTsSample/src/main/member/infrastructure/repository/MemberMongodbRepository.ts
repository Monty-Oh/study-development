import mongoose, { CallbackError } from "mongoose";
import MemberRepository from "./MemberRepository";
import Member from "../../domain/model/aggregates/Member";
import MemberModel from "./MemberMongodbSchema";

export default class MemberMongodbRepository implements MemberRepository {
	//  Singleton
	private static instance: MemberMongodbRepository;

	private constructor() {
		this.init()
			.then()
			.catch((error: Error) => {
				console.error(error);
			});
	}

	public static getInstance = () => {
		if (!this.instance) this.instance = new this();
		return this.instance;
	};

	/**
	 * MongoDB 초기화 작업
	 * */
	async init(): Promise<void> {
		await this.connect();

		//	연결 에러
		mongoose.connection.on("error", (error: CallbackError) => {
			console.error(`MongoDB is Error: ${error}`);
		});

		//	재연결 시도
		mongoose.connection.on("disconnect", async () => {
			console.error("MongoDB is Disconnected retry Connect MongoDB");
			await this.connect();
		});
	}

	/**
	 * MongoDB 연결 작업
	 * */
	private async connect(): Promise<void> {
		const MONGO_DB_URL = `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@localhost:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
		await mongoose.connect(MONGO_DB_URL, {}, (error: CallbackError) => {
			error
				? console.error(`MongoDB is Error: ${error}`)
				: console.log("MongoDB is Connected successfully");
		});

		console.log();
		// console.log(Message.USER_NOT_FOUND);
	}

	/**
	 * Member 조회
	 * @Override
	 * @return Promise<Member>
	 * @param member
	 * */
	public async findMemberByUserIdAndSns(member: Member): Promise<any> {
		try {
			const result = await MemberModel.findOne({
				userId: member.userId,
			});

			return result;
		} catch (error: any) {
			console.error(`findMemberByUserIdAndSns: ${error}`);
		}
	}

	/**
	 * Member 저장
	 * @Override
	 * @param member
	 * @return Promise<Member>
	 * */
	public async save(member: Member): Promise<Member> {
		const data = new MemberModel(member);
		return await data.save();
	}
}
