import express from 'express';
import querystring from 'querystring';

// 추가, 수정을 위한 라이브러리 호출
import {AddHoldy, EditHolidayList} from './holiday.lib';
// 검색을 위한 라이브러리 호출
import {filterData} from './holiday.lib.search';

const fs = require('fs');
const router = express.Router();
const app = express();

// test용 백엔드 코드.
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

// get 수정중... 테스트용 라우터
router.get('/holdy', async (req, res) => {
  // 검색 조건을 설정하기 위해 쿼리스트링을 이용하여 쿼리 분석
  const querys = querystring.parse(req.url.split('/holdy?').join(''));
  // 검색을 하게 될 데이터를 불러온다. 불러오고, JSON형식으로 바꾸고, holidayList를 가져온다.
  const data = JSON.parse(await fs.readFileSync('testDB.json', (err) => {
    if(err) console.log(err);
  }))['holidayList'];
  const result = {holidayList: filterData(data, querys)};
  return res.send(result);



  // return res.send(JSON.parse({holidayList: result}))
})

// delivered new data. save new data
router.post('/holdy', async (req, res) => {
  const data = {holidayList: req.body.data};
  const nextData = JSON.stringify(data);
  await fs.writeFileSync('testDB.json', nextData, (err) => {
    if (err) console.log(err);
  });

  // '/apis/holdy'로 리다이렉트. 결과값으로 다시 새로운 DB가 반환됨.
  res.redirect('/apis/holdy')
});

// get data and send(data)
// router.get('/holdy', async (req, res) => {
//   try {
//     const data = await fs.readFileSync('testDB.json');
//     return res.send(JSON.parse(data))
//   } catch (e) {
//     console.error(e);
//   }
// })

// 새로운 요소 생성
router.post('/holdy/item', async (req, res) => {
  try {
    const data = await fs.readFileSync('testDB.json');

    const holidayList = [...(JSON.parse(data)).holidayList]
    // 이미 있는 데이터를 검사하고 호출.
    const result = AddHoldy(holidayList, req.body.data);


    // 결과값에 따라 분기 202는 DB 검사 결과 부적합
    if (result[0] === 202) {
      res.status(202);
      res.send(result[1]);
    }
    // 새롭게 받은 배열로 파일에 덮어 씌움.
    else {
      // const nextData = JSON.stringify({holidayList: result})
      await fs.writeFileSync('testDB.json', JSON.stringify({holidayList: result}), (err) => {
        if (err) console.error(err);
      });

      // 다시 새롭게 만들어진 json파일 출력
      res.status(200);
      res.send('add success');
    }
  } catch (e) {
    console.error(e);
    res.status(304);
    res.send(e);
  }
});

// 데이터 수정 holdySn을 가지고 수정한다.
router.put('/holdy/item', async (req, res) => {
  try {
    const {lastModifiedBy, holdyNm, holdySn, holdyTpCd} = req.body.data;
    const data = await fs.readFileSync('testDB.json');
    const holidayList = [...(JSON.parse(data)).holidayList]
    const result = EditHolidayList(holidayList, lastModifiedBy, holdyNm, holdySn, holdyTpCd)
    if (result[0] === 202) {
      res.status(202);
      res.send(result[1]);
    } else {
      await fs.writeFileSync('testDB.json', JSON.stringify({holidayList: result[1]}), (err) => {
        if (err) console.error(err);
      });
      // 다시 새롭게 만들어진 json파일 출력
      res.status(200);
      res.send('edit success');
    }
  } catch (e) {
    console.error(e);
    res.status(304);
    res.send(e);
  }
})


// Export the server middleware
export default router;
