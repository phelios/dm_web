import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {dm_backend_url} from "../../config"
import { useLoading } from '../providers/LoadingContext';
import { tbdGet, tbdPost, tbdPut, tbdDelete } from '../tbd/http';
import UniView from '../tbd/views/UniView';

export default function Projects({setPageTitle}) {

  const {setIsLoading} = useLoading();
  const [fields, setFields] = useState([]);
  const [initData, setInitData] = useState([]);
  const navigate = useNavigate()

  const categoryApiUrl = dm_backend_url + '/categories/';
  const projectsApiEndpoint = dm_backend_url + '/projects/';

  function initFields(json) {
    const fields = [{
      name: 'name',
      type: 'text'
    },
    {
      name: 'category_id',
      type: 'dropdown',
      list: json
    }];
    setFields(fields)
  }

  useEffect(() => {
    setPageTitle("Projects");
    const categoriesPromise = tbdGet(categoryApiUrl, {}, setIsLoading)
      .then( )

    const projectsPromise =  tbdGet(projectsApiEndpoint, {}, setIsLoading)

     Promise.all([categoriesPromise, projectsPromise])
      .then(r => {
        r[0].json().then(json => initFields(json));
        r[1].json().then(json => setInitData(json));
      })
    
  }, [categoryApiUrl, projectsApiEndpoint]);


  function handleNew(formData) {
    return tbdPost(projectsApiEndpoint, formData, setIsLoading);
  }

  function handleUpdate(formData, itemId) {
    return tbdPut(`${projectsApiEndpoint}${itemId}`, formData, setIsLoading)
  }
  
  function handleDelete(itemId) {
    return tbdDelete(`${projectsApiEndpoint}${itemId}`, setIsLoading)
  }

  function handleClick(itemId) {
    navigate(String(itemId))

  }

  return (
    <div>
      <UniView schema={fields} 
        initListData={initData}
        onNew={handleNew}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onClick={handleClick}
      />
    </div>
  )
}
