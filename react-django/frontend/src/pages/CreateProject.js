import '../styles/CreateProject.css';
import NavBar from '../components/NavBar.js';
import Sidebar from '../components/Sidebar.js';
import CreateProjectForm from '../components/CreateProjectForm.js';

const CreateProject = () => {
  
  return (

    <div className="container1">
    <NavBar/>
    <div className="container2">
        <div className="container21"><Sidebar/></div>
          <div className="container22">
          <div className="main-content">
          <CreateProjectForm/>
        </div>
    </div>
    </div>
    </div>
  );
};

export default CreateProject;