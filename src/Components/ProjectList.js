import { Link } from 'react-router-dom';
import Avatar from './Avatar/Avatar';
import './ProjectList.css';

export default function ProjectList({ projects }) {
    return (
        <div className="project-list">
            {projects.length === 0 && <p>No projects yet!</p>}
            {projects.map((project) => (
                <Link to={`/projects/${project.id}`} key={project.id}>
                    <h4>{project.doc.name}</h4>
                    {console.log(project.doc.imgUrl)}
                    <Avatar src={project.doc.imgUrl} />
                    <p>Email :{project.doc.email}</p>
                    <div className="assigned-to">
                        <p>
                            <strong>Assigned to:</strong>
                        </p>
                        <ul>
                            {/* {project.assignedUsersList.map((user) => (
                                <li key={user.imageUrl}>
                                    <Avatar src={user.imageUrl} />
                                </li>
                            ))} */}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    );
}
