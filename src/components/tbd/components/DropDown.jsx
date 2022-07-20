import React from "react";
import Form from "react-bootstrap/Form";


export default function DropDown({field, handler, selected}) {

  return (
    <Form.Select onChange={e => handler(field.name, e.target.value)}>
      {field.list.map((option, index) =>
        <option key={option.id} value={option.id} selected={option.id === selected? 'selected': null}>{option.name}</option>
      )}
    </Form.Select>
  );
}