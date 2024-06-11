import React from "react";
import UploadImage from "./Upload";
import Edit from "./Edit";
import PageNotFound from "./Pagenotfound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Upload from "./Upload";
import Practice from "./Practice";
import ApiData from "./Practice/ApiData";
import GlobalState from "./Practice/GlobalState";

const App = () => {
 
  return (
    <>
    
 
  
      <BrowserRouter>
        <Routes>
          <Route path="/image" element={<UploadImage />} />

          <Route path="/edit-image/:id" element={<Edit />} />
          {window.location.pathname === "/" ? (
            ""
          ) : (
            <Route path="*" element={<PageNotFound />} />
          )}
          <Route path="/upload" element={<Upload />} />
          <Route path="/Practice" element={<Practice />} />
          <Route
          path="/ApiData"
          element={
            
              <ApiData />
           
          }
        />
          <Route path="/GlobalState" element={<GlobalState />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
