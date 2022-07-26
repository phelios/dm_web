import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useLoading } from '../providers/LoadingContext';
import { tbdGet } from '../tbd/http';
import {dm_backend_url} from "../../config"

export default function Project({setPageTitle}) {
  const { projectId } = useParams();
  const {setIsLoading} = useLoading();
  const projectApiEndpoint = dm_backend_url + '/projects/' + projectId;

  useEffect(() => {

    tbdGet(projectApiEndpoint, {}, setIsLoading)
      .then( r => {
        r.json().then( json => {
          setPageTitle(`Project: ${json.name}`)
        })
      })
  }, [projectId])


  return (
    <div>
      <Link to="criteria">Manage criteria</Link>
    </div>
  );
}