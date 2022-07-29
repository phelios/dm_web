import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import {dm_backend_url} from "../../config"
import { useLoading } from '../providers/LoadingContext';
import { tbdGet, tbdPost, tbdPut, tbdDelete } from '../tbd/http';
import UniView from '../tbd/views/UniView';

export default function CandidateScore({setPageTitle}) {

  const {setIsLoading} = useLoading();
  const [initData, setInitData] = useState([]);
  const [fields, setFields] = useState([])
  const { projectId, candidateId } = useParams();

  function initFields(json) {
    const fields = [{
      name: 'criterion_id',
      type: 'dropdown',
      list: json
    },{
      name: 'score',
      type: 'number'
    }]
    setFields(fields)
  }

  const criteriaApiUrl = dm_backend_url + '/criteria/';
  const candidateScoreApiUrl = dm_backend_url + '/candidate_scores/';
  const projectApiUrl = dm_backend_url + '/projects/';
  const candidateApiUrl = dm_backend_url + '/candidates/';

  useEffect(() => {
    const projectCriteria = tbdGet(`${criteriaApiUrl}?project_id=${projectId}`, {}, setIsLoading)
    const candidateScore = tbdGet(`${candidateScoreApiUrl}?candidate_id=${candidateId}`, {}, setIsLoading)
    const project = tbdGet(`${projectApiUrl}${projectId}`, {}, setIsLoading)
    const candidate = tbdGet(`${candidateApiUrl}${candidateId}`, {}, setIsLoading)

    Promise.all([projectCriteria, candidateScore, project, candidate])
      .then(r => {
        r[0].json().then(json => initFields(json));
        r[1].json().then(json => setInitData(json));

        Promise.all([r[2].json(), r[3].json()])
          .then( r=> {
            const projectName = r[0].name;
            const candidateName = r[1].name;

            setPageTitle(`Project: ${projectName}\nCandidate: ${candidateName}`);
          })
      })
  }, [candidateScoreApiUrl]);


  function handleNew(formData) {
    const newFormData = {...formData , candidate_id: candidateId}
    return tbdPost(candidateScoreApiUrl, newFormData, setIsLoading);
  }

  function handleUpdate(formData, itemId) {
    const newFormData = {...formData , candidate_id: candidateId}
    return tbdPut(`${candidateScoreApiUrl}${itemId}`, newFormData, setIsLoading)
  }
  
  function handleDelete(itemId) {
    return tbdDelete(`${candidateScoreApiUrl}${itemId}`, setIsLoading)
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
