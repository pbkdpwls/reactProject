import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) { // 백앤드로 요청 시 사용하는 유틸리티 함수
    let headers = new Headers({
        "Content-Type":"application/json",
    });
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken && accessToken!==null) {
        headers.append("Authorization","Bearer " + accessToken);
    }
    let options = {
        headers: headers,
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
    )
    .catch((error) => {
        console.log(error.status);
        if(error.status===403) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    })
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO).then((response) => {
            if(response.token) {
                //console.log("response : ", response);
                //alert("로그인 토큰 : " + response.token);
                localStorage.setItem(ACCESS_TOKEN,response.token);
                console.log("check : "+response.token)
                window.location.href="/";
            } 
        });
}

export function signup(userDTO) {
    return call("/auth/signup","POST",userDTO);
}

export function signout() {
    localStorage.setItem(ACCESS_TOKEN, null);
    window.location.href = "/login";
}

//export default call