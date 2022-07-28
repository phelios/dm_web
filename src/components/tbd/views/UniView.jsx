import React, { useState, useEffect } from "react";
import ListView from "./ListView";
import FormView from "./FormView";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function UniView({schema, initListData, onNew, onUpdate, onDelete, onClick}) {
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

  function getTitle(field) {
    let name = field.name.replace("_id", "");
    return name.charAt(0).toUpperCase() + name.slice(1);

  }

  return (
    <div>
      <Card>
        <Card.Header>
          <Row>
            {schema.map(field =>
              <Col key={field.name}>{getTitle(field)}</Col>)
            }
            <Col xs={1} sm={1}></Col>
          </Row>
        </Card.Header>
      {listData.map((rowData) =>
          rowData.editMode === undefined ? 
            <ListView key={'list' + rowData.id} 
              schema={schema}
              data={rowData}
              onChange={onChangeHandler}
              onClick={onClick}
            /> :
            <FormView key={'form' + rowData.id} 
              schema={schema} 
              data={rowData} 
              onChange={onChangeHandler} 
              onNew={onNew} 
              onUpdate={onUpdate} 
              onDelete={onDelete} 
            /> 
      )}
      </Card>
      <Button onClick={newItemForm}>Add</Button>
    </div>
  )

}