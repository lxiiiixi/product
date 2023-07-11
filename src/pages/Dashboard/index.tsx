// import { useEffect } from "react";
import API from '@/api';
// import userInfoStore from "@/store/userInfoStore";
// import { useModal } from "@/hooks/useModal";
// import ContactUsFormModal from "@/sections/Modals/ContactUsModal";
import { message } from 'antd';

function Dashboard() {
  // const [open1, openModal1, closeModal1] = useModal();
  // const {userName,userAddress} = userInfoStore();

  // console.log(open1, openModal1, closeModal1);

  // useEffect(() => {
  // },[])

  const login = () => {
    API.UserApi.login({
      email: 'example@gamilc.com',
      password: 'password'
    }).then(res => {
      console.log(res.data.access_token);
    });
  };

  const logout = () => {
    API.UserApi.logout().then(res => {
      console.log('logout', res);
    });
  };

  const getList = () => {
    message.open({
      type: 'warning',
      content: 'This is a warning message'
    });
    // API.ObjApi.getObjList().then(res => {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // });
  };

  return (
    <div>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>

      <button onClick={getList}>get list</button>

      <div>{/* <button onClick={openModal1}>closeModal</button> */}</div>

      {/* <ContactUsFormModal open={open} closeModal={closeModal1} /> */}
    </div>
  );
}

export default Dashboard;
