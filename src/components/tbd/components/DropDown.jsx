import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";


export default function DropDown({field}) {
  console.log('dropdown: ' + field);
  return (
    <Form.Select>
      {field.list.map((option) =>
        <option key={option.id} value={option.id}>{option.name}</option>
      )}
    </Form.Select>
  )
}