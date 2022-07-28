import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLoading } from '../providers/LoadingContext';
import { tbdGet, tbdDelete, tbdPost, tbdPut } from '../tbd/http';
import {dm_backend_url} from "../../config"
import UniView from '../tbd/views/UniView';

export default function Project({setPageTitle}) {
  const { projectId } = useParams();
  const [initData, setInitData] = useState([]);
  const {setIsLoading} = useLoading();
  const navigate = useNavigate();
  const projectApiEndpoint = dm_backend_url + '/projects/' + projectId;
  const candidateApiEndPoint = dm_backend_url + '/candidates/';

  const fields = [{
    name: 'name',
    type: 'text'
  },{
    name: 'description',
    type: 'text'
  }]

  useEffect(() => {
    const project = tbdGet(projectApiEndpoint, {}, setIsLoading)
    const candidates = tbdGet(`${candidateApiEndPoint}?project_id=${projectId}`, {}, setIsLoading)

    Promise.all([project, candidates])
      .then( r => {
        r[0].json().then( json => {
          setPageTitle(`Project: ${json.name}`)
        })

        r[1].json().then(json => setInitData(json))
      })
  }, [projectId])

  function handleNew(formData) {
    const newFormData = {...formData , project_id: projectId}
    return tbdPost(candidateApiEndPoint, newFormData, setIsLoading);
  }

  function handleUpdate(formData, itemId) {
    const newFormData = {...formData , project_id: projectId}
    return tbdPut(`${candidateApiEndPoint}${itemId}`, newFormData, setIsLoading)
  }
  
  function handleDelete(itemId) {
    return tbdDelete(`${candidateApiEndPoint}${itemId}`, setIsLoading)
  }

  function handleClick(candidateId) {
    navigate(`candidate/${String(candidateId)}`)

  }

  return (
    <div>
      <Link to="criteria">Manage criteria</Link>
      <UniView schema={fields} 
        initListData={initData}
        onNew={handleNew}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onClick={handleClick}
      />
    </div>
  );
}