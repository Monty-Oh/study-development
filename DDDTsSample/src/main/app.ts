import express from "express";
// import MemberController from "./member/controller/MemberController";
// import dotenv from "dotenv";
// // import mocha from "mocha";
//
const PORT: number = Number(process.env.PORT) || 3000; //  포트번호 지정
const server: express.Application = express(); //  서버(기본 앱)
//
// dotenv.config();
//
// //  Controllers
// const memberController: MemberController = MemberController.getInstance();
//
// server.get("/member/test", (req, res) => {
// 	res.json(memberController.getTest());
// });
// server.get("/member/:userId", (req, res) => {
// 	memberController.findUser(req.params.userId, req.query.sns as string);
// });
//
server.listen(PORT, () => {
	console.log(`${PORT}포트로 서버 실행 중`);
});

import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import rootValue from "./resolver";
// 테스트테스트...
graphqlHTTP &&
	server.use(
		"/graphql",
		graphqlHTTP({
			schema,
			rootValue,
			graphiql: true,
		}),
	);
