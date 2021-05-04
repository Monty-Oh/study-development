import axios from "axios";

// 1. HTTP Request && Response와 관련된 기본 설정
const config = {
    baseUrl: 'https://api.hnpwa.com/v0',
    urls: {
        news: '/news/1.json',
        jobs: '/jobs/1.json',
        ask: '/ask/1.json',
        user: '/user/',
        item: '/item/',
        //item?id=26722428
    },
};
//https://api.hnpwa.com/v0/item/26739220.json
// 2. API 함수들을 정리
function fetchList(menu) {
    return axios.get(config.baseUrl + config.urls[menu]);
}

function getUser(id) {
    return axios.get(config.baseUrl + config.urls.user + id + '.json');
}

function getItem(id) {
    return axios.get(config.baseUrl + config.urls.item + id + '.json');
}



export {
    fetchList,
    getUser,
    getItem,
}