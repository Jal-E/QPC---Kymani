import React, { useState } from 'react';
import '../styles/uploadDocumentForm.css';

function UploadDocumentsForm() {
    const [formData, setFormData] = useState({
        documentName: '',
        assignee: '',    // Single assignee input field
        assignees: [],   // Array of added assignees
        files: [],       // Array to hold multiple files
        notes: '',
    });

    const [isDragging, setIsDragging] = useState(false); // New state for drag-and-drop

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // Convert FileList to Array
        setFormData({ ...formData, files: [...formData.files, ...selectedFiles] });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files); // Convert FileList to Array
        setFormData({ ...formData, files: [...formData.files, ...droppedFiles] });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };
      
    // Add a new assignee when "Enter" is pressed
    const handleAssigneesKeyDown = (e) => {
        if (e.key === 'Enter' && formData.assignee.trim() !== '') {
            e.preventDefault();
            setFormData({
                ...formData,
                assignees: [...formData.assignees, formData.assignee.trim()],
                assignee: '' // Reset the input field after adding
            });
        }
    };

    const removeAssignee = (index) => {
        const updatedAssignees = formData.assignees.filter((_, i) => i !== index);
        setFormData({ ...formData, assignees: updatedAssignees });
    };

    const removeFile = (index) => {
        const updatedFiles = formData.files.filter((_, i) => i !== index);
        setFormData({ ...formData, files: updatedFiles });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submissionData = {
            documentName: formData.documentName,
            assignees: formData.assignees,
            files: formData.files,
            notes: formData.notes
        };

        console.log("Form submitted", submissionData);
        // Add your form submission logic here
    };

    return (
        <div className="create-project-container">
        <h2 className="create-project-heading">Upload Documents</h2>
        <p>Upload all your documents.</p>
            <form onSubmit={handleSubmit} className="upload-document-form">
            <div className='upload-documents-form'>
                <div className='left'>
                    <div className="scope-member-project">
                        <div className="label-input">
                            <label>Document Name</label>
                            <input
                                type="text"
                                name="documentName"
                                placeholder="lorem.txt"
                                value={formData.documentName}
                                onChange={handleChange}
                                className="create-project-input"
                            />
                        </div>
                    </div>
                    <div className="scope-member-project">
                        <div className="label-input">
                            <label>Assignee/Reviewer</label>
                            <input
                                type="text"
                                placeholder="Assignee/Reviewer"
                                name="assignee"
                                value={formData.assignee}
                                onChange={handleChange}
                                onKeyDown={handleAssigneesKeyDown}
                                className="create-project-input"
                            />
                        </div>
                        <div className="chips">
                            {formData.assignees.map((member, index) => (
                                <div key={index} className="chip">
                                    {member}
                                    <button
                                        type="button"
                                        onClick={() => removeAssignee(index)}
                                        className="remove-team-member-btn"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='right scope-member-project'>
                    <div>
                    <div className='uploadDoc'>
                    <label>Upload Documents</label>
                    <div className="tags">
                        <div className="tag">Budget</div>
                        <div className="tag">Quarterly</div>
                        <div className="tag">Case Study</div>
                    </div>
                    </div>
                    <div
                        className={`upload-file ${isDragging ? 'dragging' : ''}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <div className="drag-drop-text">Drag & Drop files</div>
                        <label className="upload-button">
                            Upload
                            <input type="file" onChange={handleFileChange} multiple />
                        </label>
                    </div>
                    {formData.files.length > 0 && (
                        <div className="file-list">
                            <strong>Selected Files:</strong>
                            <ul>
                                {formData.files.map((file, index) => (
                                    <li key={index} className='chip'>
                                        {file.name}
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="remove-team-member-btn"
                                        >
                                            &times;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            <div className=" scope-member-project document-label-input">
                        <label>Notes</label>
                        <textarea 
                        className='upload-document-textarea'
                        name="notes"
                        placeholder="Enter additional notes"
                        value={formData.notes}
                        onChange={handleChange}></textarea>
            </div>
            <div className='button'>
                <button type="submit" className="submit-btn">Submit Documents</button>
                </div>
            </form>
        </div>
    );
}

export default UploadDocumentsForm;