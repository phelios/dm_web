import React, { useState } from "react";
import ListView from "./ListView";
import FormView from "./FormView";

export default function UniView({fields, apiEndpoint}) {
  const [listData, setListData] = useState([]);
  const useListData = {listData, setListData};

  return (
    <div>
      <ListView fields={fields} url={apiEndpoint} useListData={useListData} />
      <FormView fields={fields} url={apiEndpoint} useListData={useListData} />
    </div>
  )

}