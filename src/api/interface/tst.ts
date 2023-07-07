import Request from "../request";

export function getUserInfo() {
return Request({
method: "GET",
url: "/api/user",
});
}

export function login(loginData:{email:string,password:string}) {
return Request({
method: "POST",
url: "/api/user/login",
data:loginData
});
}


export function register(registerData:{email:string,nick_name:string,password:string}) {
return Request({
method: "POST",
url: "/api/user/login",
data:registerData
});
}