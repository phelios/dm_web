import React from 'react';
import { useParams } from "react-router-dom";

export default function Project() {
    let { projectId } = useParams();

    return (
        <h1>Project id: {projectId}</h1>
    );
}