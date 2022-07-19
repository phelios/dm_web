import React, { useState, useEffect } from "react";
import ListView from "./ListView";
import FormView from "./FormView";
import { tbdFetch } from "../http";
import { useLoading } from "../../providers/LoadingContext";

export default function UniView({schema, apiEndpoint}) {
  const [listData, setListData] = useState([]);
  const {setIsLoading} = useLoading();

  useEffect(() => {
    tbdFetch(apiEndpoint, {}, r => {
      r.json().then(json => setListData(json))
    }, setIsLoading)
  }, [apiEndpoint])

  function handleEdit(id) {
    setListData(prevList => prevList.map( item => item.id === id? {...item, editMode: true} : item));
  }

  return (
    <div>
      {listData.map((rowData) =>
          rowData.editMode === true ? 
            <FormView schema={schema} data={rowData} /> : 
            <ListView schema={schema} data={rowData} handleEdit={handleEdit} />
      )}
    </div>
  )

}