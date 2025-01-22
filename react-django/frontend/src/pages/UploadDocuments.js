import '../styles/CreateProject.css';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import UploadDocumentsForm from '../components/UploadDocumentsForm';

function UploadDocuments() {
  return (

    <div className="container1">
        upload documents
    <NavBar/>
    <div className="container2">
        <div className="container21"><Sidebar/></div>
          <div className="container22">
          <div className="main-content">
          <UploadDocumentsForm/>
        </div>
    </div>
    </div>
    </div>
  );
};

export default UploadDocuments;