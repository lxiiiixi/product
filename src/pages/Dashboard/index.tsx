import { useEffect } from "react";
import API from "@/api";

function Dashboard() {
    useEffect(() => {
        // API.UserApi.login({email: "example@gamilc.com", password: "password"}).then(res => {
        //     console.log(res);
        // })

        API.ObjApi.getObjList().then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    },)
    return <div>Dashboard</div>;
}

export default Dashboard;



