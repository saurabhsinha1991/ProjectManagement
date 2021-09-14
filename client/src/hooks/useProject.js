import { useEffect, useState } from "react";
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

    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        fetchProjects,
        addProject,
    }
}

export default useProject;
