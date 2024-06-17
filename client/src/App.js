import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Provider as KeepAliveProvider } from 'react-keep-alive';
import Addstudent from './Addstudent';
import Editstudent from './EditStudent';
import Attendance from './Absent';
import Competition from './competition';
import Sidebar from './Sidebar';
import BadBehaviour from './BadBehavior';
import Profile from './profile';
import Permiisions from './Permission';
import './Information';
import Information from './Information';
import Login from './Login';
import UpdatedDayPage from './Page';
import LoadingPage from './loading';
// ... (الاستيرادات)

function App() {
  const [serverIsDown, setServerIsDown] = useState(false);
  const [serverIsBack, setServerIsBack] = useState(false);
  const [loading, setLoading] = useState(true); // إضافة حالة لتتبع حالة اللودنج
  const navigate = useNavigate();

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:8080/status');
        if (!response.ok) {
          setServerIsDown(true);
        return <LoadingPage /> ;
        } else {
          if (serverIsDown) {
            setServerIsBack(true);
         
          }
          setServerIsDown(false);
        }
      } catch (error) {
        console.error('Error checking server status:', error);
        setServerIsDown(true);
        if (serverIsBack) {
          setServerIsBack(false);
        } else {
        
        }
      } finally {
        setLoading(false); // عند انتهاء الفحص، ضع حالة اللودنج إلى false
      }
    };

    // التحقق من حالة السيرفر كل ثانية
    const intervalId = setInterval(checkServerStatus, 10000);

    // تنظيف الفاصل الزمني عندما يتم تفريغ المكون
    return () => clearInterval(intervalId);
  }, [navigate, serverIsDown, serverIsBack]);



  if (serverIsDown) {
    return <LoadingPage /> ;
  }

  return (
    <KeepAliveProvider>
                 <Routes>
          <Route path='/addstudent' element={[<Addstudent />, <Sidebar />]} />
          <Route path='/EditStudent' element={[<Editstudent />, <Sidebar />]} />
          <Route path='/attendence' element={[<Attendance />, <Sidebar />]} />
          <Route path='/Competitions' element={[<Competition />, <Sidebar />]} />
          <Route path='/violations' element={[<BadBehaviour />, <Sidebar />]} />
          <Route path='/profile/:id' element={[<Profile />]} />
          <Route path='/profile' element={[<Profile />]} />
          <Route path='/Permiisions' element={[<Permiisions />, <Sidebar />]} />
          <Route path='/Information' element={[<Information />, <Sidebar />]} />
          <Route path='/home' element={[<UpdatedDayPage />, <Sidebar />]} />
          <Route path='/' element={<Login />} />
          <Route path='/load' element={<LoadingPage />} />
         
        </Routes>
    </KeepAliveProvider>
  );
}

export default App;
