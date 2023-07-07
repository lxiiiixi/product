import { useEffect } from "react";
import API from "@/api";
import Cookies from 'js-cookie';
import userInfoStore from "@/store/userInfoStore";

function Dashboard() {
    const {userName,userAddress} = userInfoStore();

    console.log(userName,userAddress);
    
    // useEffect(() => {
    // },[])

    const login = () =>{
  API.UserApi.login({email: "example@gamilc.com", password: "password"}).then(res => {
            console.log(res);
            Cookies.set('token', res.data.access_token, { expires: 1 });
        })
    }

    const getList = () =>{
        API.ObjApi.getObjList().then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    }

    return <div>
        <button onClick={login}>login</button>
        <button onClick={getList}>get list</button>
        
    </div>;
}

export default Dashboard;



