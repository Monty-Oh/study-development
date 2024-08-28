import mongoose, { Schema } from "mongoose";
import Member from "../../domain/model/aggregates/Member";
import autoIncrement from "mongoose-auto-increment";

const memberSchema = new Schema<Member>({
	userId: String,
	email: String,
	nickName: String,
	mobileNo: String,
	// sns: Sns,
});

/**
 * AutoIncrement
 * */
autoIncrement.initialize(mongoose.connection);
memberSchema.plugin(autoIncrement.plugin, {
	model: "member",
	field: "userNo",
	startAt: 1, // 시작
	increment: 1, // 증가
});

export default mongoose.model("member", memberSchema);
