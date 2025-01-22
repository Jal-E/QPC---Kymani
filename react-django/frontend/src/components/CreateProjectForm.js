import React, {useState} from 'react'

function CreateProjectForm() {

  const [formData, setFormData] = useState({
    scopeOfWork: '',
    scopes: [],
    teamMember: '',
    teamMembers: [],
    linkedProject: '',
    linkedProjects: [],
    milestones: [{ title: '', dueDate: '', amount: '', description: '' }]

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && formData.scopeOfWork.trim() !== '') {
          e.preventDefault();
          setFormData({
            ...formData,
            scopes: [...formData.scopes, formData.scopeOfWork.trim()],
            scopeOfWork: '' // Reset the input field after adding
          });
        }
      };
      
      // Remove a scope (chip) by index
      const removeScope = (index) => {
        const updatedScopes = formData.scopes.filter((_, i) => i !== index);
        setFormData({ ...formData, scopes: updatedScopes });
      };
    
      // Handle input change for the Assign Team Member input field
const handleTeamMemberChange = (e) => {
  setFormData({ ...formData, teamMember: e.target.value });
};

// Add a new team member when "Enter" is pressed
const handleTeamMemberKeyDown = (e) => {
  if (e.key === 'Enter' && formData.teamMember.trim() !== '') {
    e.preventDefault();
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, formData.teamMember.trim()],
      teamMember: '' // Reset the input field after adding
    });
  }
};

// Remove a team member (chip) by index
const removeTeamMember = (index) => {
  const updatedTeamMembers = formData.teamMembers.filter((_, i) => i !== index);
  setFormData({ ...formData, teamMembers: updatedTeamMembers });
};

// Handle input change for the Link Existing Project input field
const handleLinkedProjectChange = (e) => {
  setFormData({ ...formData, linkedProject: e.target.value });
};

// Add a new linked project when "Enter" is pressed
const handleLinkedProjectKeyDown = (e) => {
  if (e.key === 'Enter' && formData.linkedProject.trim() !== '') {
    e.preventDefault();
    setFormData({
      ...formData,
      linkedProjects: [...formData.linkedProjects, formData.linkedProject.trim()],
      linkedProject: '' // Reset the input field after adding
    });
  }
};

// Remove a linked project (chip) by index
const removeLinkedProject = (index) => {
  const updatedLinkedProjects = formData.linkedProjects.filter((_, i) => i !== index);
  setFormData({ ...formData, linkedProjects: updatedLinkedProjects });
};


      const handleMilestoneChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMilestones = formData.milestones.map((milestone, i) => 
          i === index ? { ...milestone, [name]: value } : milestone
        );
        setFormData({ ...formData, milestones: updatedMilestones });
      };
    
      const addMilestone = () => {
        setFormData({
          ...formData,
          milestones: [...formData.milestones, { title: '', dueDate: '', amount: '', description: '' }]
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
      
        // Prepare the data in the format the backend expects
        const preparedData = {
          project_name: formData.projectName,
          description: formData.description,
          scopes: formData.scopes,
          team_members: formData.teamMembers,
          linked_projects: formData.linkedProjects,
          milestones: formData.milestones,
        };
        console.log(preparedData)
      
        // Send data to Django backend using fetch or axios
        fetch('http://127.0.0.1:8000/api/create-project/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preparedData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Project created successfully:', data);
            // Reset form after successful submission
            handleReset();
          })
          .catch((error) => {
            console.error('Error creating project:', error);
          });
      };
      
    
      const handleReset = () => {
        setFormData({
          projectName: '',
          description: '',
          scopeOfWork: '',
          teamMembers: '',
          linkedProjects: '',
          milestones: [{ title: '', dueDate: '', amount: '', description: '' }]
        });
      };

  return (
    <div className="create-project-container">
      <h2 className="create-project-heading">Create New Project</h2>
      <p>Create your new project add the details</p>
      <form onSubmit={handleSubmit} className="create-project-form">
        <div className='project-top'>
        <div className="create-project-section">

          <div className='label-input'>
          <label>Project Name</label>
        <input type="text" placeholder="Rolex nigma" name="projectName" value={formData.projectName} onChange={handleChange} className="create-project-input" />
          </div>

          <div className='label-input'>
          <label>Description</label>
          <textarea name="description" placeholder="Write text here" value={formData.description} onChange={handleChange} className="create-project-textarea"></textarea>
          </div>
        </div>

        <div className="create-project-section">

        <div className='scope-member-project'>
        <div className='label-input'>
        <label>Scope of Work</label>
    <input
      type="text"
      name="scopeOfWork"
      placeholder="Scope of work"
      value={formData.scopeOfWork}
      onChange={handleChange}
      onKeyDown={handleKeyDown}  // Handle Enter key
      className="create-project-input"
    />
        </div>

    <div className="chips">
      {formData.scopes.map((scope, index) => (
        <div key={index} className="chip">
          {scope}
          <button type="button" onClick={() => removeScope(index)} className="remove-scope-btn">
            &times; {/* Display 'x' for delete */}
          </button>
        </div>
      ))}
    </div>
  </div>

  <div className='scope-member-project'>
  <div className='label-input'>
  <label>Assign Team Member</label>
  <input
    type="text"
    placeholder="Assign team member"
    value={formData.teamMember}
    onChange={handleTeamMemberChange}
    onKeyDown={handleTeamMemberKeyDown}  // Handle Enter key
    className="create-project-input"
  />
  </div>

  <div className="chips">
    {formData.teamMembers.map((member, index) => (
      <div key={index} className="chip">
        {member}
        <button type="button" onClick={() => removeTeamMember(index)} className="remove-team-member-btn">
          &times;
        </button>
      </div>
    ))}
  </div>
</div>


  <div className='scope-member-project'>
  <div className='label-input'>
  <label>Link Existing Project</label>
  <input
    type="text"
    placeholder="Link existing project"
    value={formData.linkedProject}
    onChange={handleLinkedProjectChange}
    onKeyDown={handleLinkedProjectKeyDown}  // Handle Enter key
    className="create-project-input"
  />

  </div>

  <div className="chips">
    {formData.linkedProjects.map((project, index) => (
      <div key={index} className="chip">
        {project}
        <button type="button" onClick={() => removeLinkedProject(index)} className="remove-linked-project-btn">
          &times;
        </button>
      </div>
    ))}
  </div>
</div>
        </div>
        </div>
        

        <div className="create-project-milestones">
            <div className='milestone-heading'>
            <h3>Set Up Milestones</h3>
          <button type="button" onClick={addMilestone} className="create-project-add-milestone-btn">Add New Milestone</button>
            </div>
          {formData.milestones.map((milestone, index) => (
            <div key={index} className="create-project-milestone-item">
              <div className="create-project-milestone-inline-group">
                <div className='create-project-milestone-title-amount'>
                    <div className='label-input milestone-title'>
                        <label>Milestone Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="July - 2025"
                  value={milestone.title}
                  onChange={(e) => handleMilestoneChange(index, e)}
                  className="create-project-milestone-input"
                /></div>
                <div className='label-input'>
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="1789 INR"
                  value={milestone.amount}
                  onChange={(e) => handleMilestoneChange(index, e)}
                  className="create-project-milestone-input"
                />
                    </div>
            
                </div>
                <div className='label-input'>
                <label>due on</label>
                <input
                  type="date"
                  name="dueDate"
                  placeholder="12 aug, 2024"
                  value={milestone.dueDate}
                  onChange={(e) => handleMilestoneChange(index, e)}
                  className="create-project-milestone-input"
                />
                </div>
              </div>
              <div className="create-project-milestone-inline-group">
                <div className='label-input-textarea'>
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Write text here"
                value={milestone.description}
                onChange={(e) => handleMilestoneChange(index, e)}
                className="create-project-milestone-description"
              ></textarea>
              </div>
              </div>
            </div>
          ))}
        </div>
        <div className="button-group">
          <button type="submit" className="create-project-submit-btn">Create Project</button>
          <button type="button" onClick={handleReset} className="create-project-reset-btn">Reset</button>
        </div>
      </form>
    </div>
  )
}

export default CreateProjectForm