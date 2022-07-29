import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import {dm_backend_url} from "../../config"
import { useLoading } from '../providers/LoadingContext';
import { tbdGet, tbdPost, tbdPut, tbdDelete } from '../tbd/http';
import UniView from '../tbd/views/UniView';

export default function ProjectCriteria({setPageTitle}) {

  const {setIsLoading} = useLoading();
  const [initData, setInitData] = useState([]);
  const [fields, setFields] = useState([])
  const { projectId } = useParams();

  function initFields(json) {
    const fields = [{
      name: 'criterion_id',
      type: 'dropdown',
      list: json
    },{
      name: 'weight',
      type: 'number'
    }]
    setFields(fields)
  }

  const projectCriteriaApiUrl = dm_backend_url + '/project_criteria/';
  const projectApiUrl = dm_backend_url + '/projects/'
  const criteriaApiUrl = dm_backend_url + '/criteria/';

  useEffect(() => {
    const criteria = tbdGet(criteriaApiUrl, {}, setIsLoading)
    const projectCriteria = tbdGet(`${projectCriteriaApiUrl}?project_id=${projectId}`, {}, setIsLoading)
    const project = tbdGet(`${projectApiUrl}${projectId}`, {}, setIsLoading)

    Promise.all([criteria, projectCriteria, project])
      .then(r => {
        r[0].json().then(json => initFields(json))
        r[1].json().then(json => setInitData(json));
        r[2].json().then(json => setPageTitle(`Project Criteria for: ${json.name}`));

      })
  }, [projectCriteriaApiUrl]);


  function handleNew(formData) {
    const newFormData = {...formData , project_id: projectId}
    return tbdPost(projectCriteriaApiUrl, newFormData, setIsLoading);
  }

  function handleUpdate(formData, itemId) {
    const newFormData = {...formData , project_id: projectId}
    return tbdPut(`${projectCriteriaApiUrl}${itemId}`, newFormData, setIsLoading)
  }
  
  function handleDelete(itemId) {
    return tbdDelete(`${projectCriteriaApiUrl}${itemId}`, setIsLoading)
  }

  return (
    <div>
      <UniView schema={fields} 
        initListData={initData}
        onNew={handleNew}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  )
}
