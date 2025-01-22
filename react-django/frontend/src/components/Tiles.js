import React from 'react';
import { FaRegFileAlt } from "react-icons/fa";
import { ImCoinDollar } from "react-icons/im";
import { RiTeamFill } from "react-icons/ri";
import { VscRecord } from "react-icons/vsc";
import { BiSolidHourglassTop } from "react-icons/bi";
import { FaBarsProgress } from "react-icons/fa6";
import "../styles/dashboard.css"

// Data for the projects
const tileObjects = {
    Project1: {
        name: "Project 01",
        description: "Norman McLaren, best known for his work as director in the world of animation, was a true pioneer and innovator in this realm. His career, spanning several decades, was marked...",
        milestone: 3,
        noofdocuments: 12,
        members: 5,
        status: "In Progress",
        duedate: "2024-12-31",
        progress: 60
    },
    Project2: {
        name: "Project 02",
        description: "The Renaissance period saw the rise of brilliant artists who reshaped the landscape of art with their revolutionary techniques and perspectives. Their contributions continue to influence...",
        milestone: 5,
        noofdocuments: 8,
        members: 4,
        status: "Completed",
        duedate: "2024-11-15",
        progress: 100
    },
    Project3: {
        name: "Project 03",
        description: "Space exploration has led to numerous discoveries that have expanded our understanding of the universe. The technological advancements achieved in this field have had profound...",
        milestone: 2,
        noofdocuments: 20,
        members: 8,
        status: "Not Started",
        duedate: "2025-03-30",
        progress: 0
    }
};

// Component to display details of each project
const ProjectTile = ({ project }) => {
    const { name, description, milestone, noofdocuments, members, status, duedate, progress } = project;
    
    return (
        <div className='project-card'>
            <div>{name}</div>
            <div className='description'>{description}</div>
            <div className='ProjectDeets'>
                <div className='deets'>
                    <div className='icon'><ImCoinDollar/> </div>
                    <div className='deets1'>
                        <div className='deets11'>{milestone}</div>
                        <div className='deets12'> Milestone </div> 
                    </div>
                </div>
                <div className='deets'>
                    <div className='icon'> <FaRegFileAlt />  </div>
                    <div className='deets1'>
                        <div className='deets11'> {noofdocuments} </div>
                        <div className='deets12'> Documents</div> 
                    </div>
                </div>
                <div className='deets'>
                    <div className='icon'><RiTeamFill /> </div>
                    <div className='deets1'>
                        <div className='deets11'>{members}</div>
                        <div className='deets12'> Team Members </div> 
                    </div>
                </div>
                <div className='deets'>
                    <div className='icon'><VscRecord /> </div>
                    <div className='deets1'>
                        <div className='deets11'>{status} </div>
                        <div className='deets12'> Status </div> 
                    </div>
                </div>
                <div className='deets'>
                    <div className='icon'><BiSolidHourglassTop /></div>
                    <div className='deets1'>
                        <div className='deets11'>{duedate}</div>
                        <div className='deets12'> Deadline </div> 
                    </div>
                </div>
                <div className='deets'>
                    <div className='icon'><FaBarsProgress /> </div>
                    <div className='deets1'>
                        <div className='deets11'> {progress}% </div>
                        <div className='deets12'> Progress </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

// Component to render the list of projects
const ProjectList = () => {
    return (
        <div className='projects'>
            {Object.values(tileObjects).map((project, index) => (
                <ProjectTile key={index} project={project} />
            ))}
        </div>
    );
};

function ProjectSection({heading}) {
    return (
      <section className="project-section">
          <h2>{heading}</h2>
          <ProjectList/>
      </section>
    )
  }


export default ProjectSection;