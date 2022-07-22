import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {dm_backend_url} from "../../config"
import { useLoading } from '../providers/LoadingContext';
import { tbdGet, tbdPost, tbdPut, tbdDelete } from '../tbd/http';
import UniView from '../tbd/views/UniView';

export default function Criteria({setPageTitle}) {

  const {setIsLoading} = useLoading();
  const [initData, setInitData] = useState([]);

  const fields = [{
    name: 'name',
    type: 'text'
  }]

  const criteriaApiUrl = dm_backend_url + '/criteria/';

  useEffect(() => {
    setPageTitle("Criteria");
    tbdGet(criteriaApiUrl, {}, setIsLoading)
      .then(r => r.json().then(json => setInitData(json)))
  }, [criteriaApiUrl]);


  function handleNew(formData) {
    return tbdPost(criteriaApiUrl, formData, setIsLoading);
  }

  function handleUpdate(formData, itemId) {
    return tbdPut(`${criteriaApiUrl}${itemId}`, formData, setIsLoading)
  }
  
  function handleDelete(itemId) {
    return tbdDelete(`${criteriaApiUrl}${itemId}`, setIsLoading)
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
