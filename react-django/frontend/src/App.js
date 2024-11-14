import './App.css';
import BasePage from './pages/BasePage/BasePage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MyDashBoard from './pages/MyDashboard/MyDashBoard';
import MyProfile from './pages/MyProfilePage/MyProfile';
import Signup from './pages/SignupPage/Signup';
import ProfileUpdatePage from './pages/ProfileUpdate/ProfileUpdatePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import DocumentUpload from './pages/UploadDocuments/DocumentUpload';
import CreateProject from './pages/CreateProject/CreateProject';
import Login from './pages/LoginPage/Login';
import EditProject from "./pages/EditProject/EditProject";
import ProjectList from "./pages/ProjectList/ProjectList";
import MyProjectPage from "./pages/MyProjectPage/MyProjectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Signup/>),
  },
  {
    path: "/dashboard",
    element: (<MyDashBoard/>),
  },
  {
    path: "/profile",
    element: (<MyProfile/>),
  },
  {
    path: "/profileupdate",
    element: (<ProfileUpdatePage/>),
  },
  {
    path: "/documentUpload",
    element: (<DocumentUpload/>),
  },
  {
    path: "/createproject",
    element: (<CreateProject/>),
  },
  {
    path: "/projectlist",
    element: (<ProjectList/>),
  },
  {
    path: "/edit-project/:id",
    element: (<EditProject/>),
  },
  {
    path: "/MyProjectPage",
    element: (<MyProjectPage/>),
  },
  {
    path: "/*",
    element: (<ErrorPage/>),
  },
  {
    path: "/login",
    element: (<Login/>),
  },
]);

function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
