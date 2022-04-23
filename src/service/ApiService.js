import { API_BASE_URL } from "../app-config";

export function call(api, method, request) { // 백앤드로 요청 시 사용하는 유틸리티 함수
    let options = {
        headers: new Headers({
            "Content-Type":"application/json",
        }),
        url: API_BASE_URL + api,
        method:method,
    };
    if(request) { // 요청 시의 데이터가 있다면
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options).then((response)=> // Promise 객체 반환
        response.json().then((json)=> { // 응답을 json 객체로 얻어 처리
            if(!response.ok) {
                return Promise.reject(json); 
            }
            return json; 
        })
    );
}

export default call