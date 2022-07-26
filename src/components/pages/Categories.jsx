import React, {useEffect, useState} from 'react'
import {dm_backend_url} from "../../config"
import { useLoading } from '../providers/LoadingContext';
import { tbdGet, tbdPost, tbdPut, tbdDelete } from '../tbd/http';
import UniView from '../tbd/views/UniView';

export default function Categories({setPageTitle}) {

  const {setIsLoading} = useLoading();
  const [initData, setInitData] = useState([]);

  const fields = [{
    name: 'name',
    type: 'text'
  }]

  const categoriesApiUrl = dm_backend_url + '/categories/';

  useEffect(() => {
    setPageTitle("Categories");
    tbdGet(categoriesApiUrl, {}, setIsLoading)
      .then(r => r.json().then(json => setInitData(json)))
  }, [categoriesApiUrl]);


  function handleNew(formData) {
    return tbdPost(categoriesApiUrl, formData, setIsLoading);
  }

  function handleUpdate(formData, itemId) {
    return tbdPut(`${categoriesApiUrl}${itemId}`, formData, setIsLoading)
  }
  
  function handleDelete(itemId) {
    return tbdDelete(`${categoriesApiUrl}${itemId}`, setIsLoading)
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
