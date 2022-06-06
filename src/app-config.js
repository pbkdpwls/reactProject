// 백앤드 서비스 주소를 설정하기 위한 파일
let backendHost;

const hostname = window && window.location && window.location.hostname; // 현재 브라우저의 도메인 네임을 얻음

if (hostname === "localhost") { // 현재 브라우저 도메인 네임이 localhost라면
    backendHost = "http://localhost:8080"; // 이 주소를 백앤드 서비스 주소로 설정
}
else {
    backendHost = "http://newjenv.us-west-2.elasticbeanstalk.com/";
}

export const API_BASE_URL = `${backendHost}`;