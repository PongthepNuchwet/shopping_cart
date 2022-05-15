import React, { useEffect, } from 'react';
import { getDocs, onSnapshot, collection, where, query } from "firebase/firestore";
import { db } from './firebase-config';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setCustomer } from './services/slice/customer'
import { RemoveData, setData } from "./services/slice/Announce";



import './App.css';
import Home from './components/Hom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SignOut from './components/SignOut'
import Admin from './components/Admin'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './components/Unauthorized'
import Order from './components/admin/Order';
import Stock from './components/admin/Stock';
import Announce from './components/admin/Announce';

import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  const dispatch = useDispatch()

  async function fetchUsers() {
    const authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      const q = query(collection(db, "users"), where("refreshToken", "==", authToken));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data()

        dispatch(setCustomer({
          uid: data.uid,
          name: data.name,
          phone: data.phone,
          address: data.address,
          role: data.role
        }))

      });
    }
  }

  async function fetchAnnounce() {
    const q = query(collection(db, "announce"));
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === "added" || change.type === "modified") {
          dispatch(setData({
            key: change.doc.id,
            data: change.doc.data()
          }))
        } else if (change.type === "removed") {
          dispatch(RemoveData({
            key: change.doc.id,
          }))
        }

      })
      querySnapshot.forEach((doc) => {
        dispatch(setData({
          key: doc.id,
          data: doc.data()
        }))
      });
    });
    return () => {
      unsuscribe();
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchAnnounce()

  }, [])

  return (

    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path="signin" index element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signout" element={<SignOut />} />
        <Route path="Unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]} />}>
          <Route path="/" element={<Home />}></Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="admin" element={<Admin />}>
            <Route index element={<Order />} />
            <Route path="order" element={<Order />} />
            <Route path="stock" element={<Stock />} />
            <Route path="announce" element={<Announce />} />
          </Route>
        </Route>


      </Route>
    </Routes >
  );
}

export default App;
