import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import { tbdFetch } from "../http";


export default function DropDown({url, pk, fieldName, data}) {
  const [optionListData, setOptionListData] = useState([]);
  useEffect(() => {
    tbdFetch(url, data, r => {
      r.json().then(json => setOptionListData(json))
    })
  }, [url])

  return (
    <Form.Select>
      {optionListData.map((option) =>
        <option value={option[pk]}>{option[fieldName]}</option>
      )}
    </Form.Select>
  )
}