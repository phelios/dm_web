import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";


export default function DropDown({field, handler, selected}) {
  useEffect(() => {
    if (selected === undefined || selected === null) {
      handler(field.name, field.list[0].id);
    } else {
      handler(field.name, selected);
    }
  }, [field.list]);


  return (
    <Form.Select onChange={e => handler(field.name, e.target.value)}>
      {field.list.map((option, index) =>
        <option key={option.id} value={option.id}>{option.name}</option>
      )}
    </Form.Select>
  );
}