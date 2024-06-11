import React, { useContext, useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import { DataContext } from "../DataContext";
import { useHandleName } from "./OnchangeFunction";
import SearchFilter from  "./SearchFilter"
const GlobalState = () => {
 const {filteredResults, searchQuery,setSearchQuery}  =SearchFilter()
  const context = useContext(DataContext);
  const { handleName } = useHandleName();

 
  return (
    <>
      <CustomInput
        type="text"
        placeholder="Type Name"
        value={context.name}
        handleChange={handleName}
      />
      <CustomInput
        type="number"
        placeholder="Type Number"
        value={context.number}
        handleChange={handleName}
      />
      <input
        type="text"
        placeholder="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredResults.length > 0 && (
        <div>
          {filteredResults.map((item, index) => (
            item.error ? (
              <p style={{color:"red"}} key={index}>{item.error}</p>
            ) : (
              <div key={index}>
                <p>{item.name}</p>
                <p>{item.lname}</p>
              </div>
            )
          ))}
        </div>
      )}
    </>
  );
};

export default GlobalState;
