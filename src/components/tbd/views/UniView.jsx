import React, { useState, useEffect } from "react";
import ListView from "./ListView";
import FormView from "./FormView";
import { Button } from "react-bootstrap";

export default function UniView({schema, initListData, onNew, onUpdate, onDelete}) {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    setListData(initListData);
  }, [initListData]);

  function newItemForm() {
    onChangeHandler({editMode: "new"}, "add")
  }

  function onChangeHandler(data, mode) {
    const newList = resetEditModes();

    if (mode === "delete") {
      if (!data.hasOwnProperty('id')){
        setListData(newList.filter(item => item.hasOwnProperty('id')));
      } else {
        setListData(newList.filter(item => item.id !== data.id))
      }
    } else if (mode === "add") {
      setListData([...newList, data])
    } else if (mode === "update") {
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
            <FormView key={'form' + rowData.id} 
              schema={schema} 
              data={rowData} 
              onChange={onChangeHandler} 
              onNew={onNew} 
              onUpdate={onUpdate} 
              onDelete={onDelete} 
            /> 
      )}
      <Button onClick={newItemForm}>Add</Button>
    </div>
  )

}