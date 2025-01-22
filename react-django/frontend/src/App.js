import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Notfound from "./pages/Notfound"
import MyDashBoard from "./pages/MyDashBoard"
import CreateProject from "./pages/CreateProject"
import UploadDocuments from "./pages/UploadDocuments"
import MyProjectPage from "./pages/MyProjectPage"

// function Logout(){
//   localStorage.clear()
//   return <Navigate to = "/login"/>
// }

// function RegisterAndLogout(){
//   localStorage.clear()
//   return <Register/>
// }

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<MyDashBoard/>}/>
      <Route path = "/createproject" element = {<CreateProject/>}/>
      <Route path = "/uploaddocuments" element = {<UploadDocuments/>}/>
      <Route path = "/projectpage" element = {<MyProjectPage/>}/>
      <Route path = "*" element = {<Notfound/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App