import React, { useState, useEffect } from "react";
import ListView from "./ListView";
import FormView from "./FormView";
import { tbdGet } from "../http";
import { useLoading } from "../../providers/LoadingContext";
import { Button } from "react-bootstrap";

export default function UniView({schema, apiEndpoint}) {
  const [listData, setListData] = useState([]);
  const {setIsLoading} = useLoading();

  useEffect(() => {
    tbdGet(apiEndpoint, {}, setIsLoading)
      .then(r => {
        r.json().then(json => setListData(json))
      });
  }, [apiEndpoint]);

  function newItemForm() {
    onChangeHandler({editMode: "new"}, "add")
  }

  function onChangeHandler(data, mode) {
    const newList = resetEditModes();

    if (mode == "delete") {
      if (!data.hasOwnProperty('id')){
        setListData(newList.filter(item => item.hasOwnProperty('id')));
      } else {
        setListData(newList.filter(item => item.id !== data.id))
      }
    } else if (mode === "add") {
      setListData([...newList, data])
    } else if (mode == "update") {
      setListData(newList.map( item => item.id === data.id? data : item));
    }
  }

  function resetEditModes() {
    let newList = [];
    listData.forEach( item => {
      const { editMode, ...withoutEditMode } = item;
      if (withoutEditMode.hasOwnProperty('id')) {
        newList.push(withoutEditMode);
      }
    })
    return newList;
  }

  return (
    <div>
      {listData.map((rowData) =>
          rowData.editMode === undefined ? 
            <ListView key={'list' + rowData.id} schema={schema} data={rowData} onChange={onChangeHandler} /> :
            <FormView key={'form' + rowData.id} schema={schema} data={rowData} onChange={onChangeHandler} apiEndpoint={apiEndpoint} /> 
      )}
      <Button onClick={newItemForm}>Add</Button>
    </div>
  )

}