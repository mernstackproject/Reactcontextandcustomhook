import React, { createContext, useState } from "react";
export const DataContext = createContext(null);

export const counterContext = createContext(null)
export const DataProvider = (props) => {
  const [dataArray, setDataArray] = useState([
    {
      name: "ram",
      lname: "ram",
    },
  ]);
  const [name, setName] = useState("");
  const [form, setForm] = useState({
    name :"",
    lname : ""
  });
  const Name = "name"
  return (
    <counterContext.Provider value={{Name:Name}} >
    <DataContext.Provider 
      value={{ dataArray, setDataArray, friend: "hello", name, setName , form, setForm}}
    >
      {props.children}
    </DataContext.Provider>
    </counterContext.Provider>
  );
};
