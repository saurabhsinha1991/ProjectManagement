import { useState } from "react";
import { getData, postData } from "../utils/api";

function useProject() {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        const response = await getData('/api/projects');
        setProjects(response);
    };

    const addProject = async (details) => {
        return await postData('/api/projects/add', details);
    }

    const deleteProject = async (id) => {
        const response = await postData('/api/projects/delete', { id });
        setProjects(response);
    }

    const getSingleProject = async (id) => {
        return await getData(`/api/projects/${id}`);
    }

    return {
        projects,
        fetchProjects,
        addProject,
        deleteProject,
        getSingleProject,
    }
}

export default useProject;
