import React from "react";
import {  Routes,Route } from "react-router-dom";
import CreateBooks from "./pages/CreateBooks";
import DeleteBooks from "./pages/DeleteBooks";
import Editbook from "./pages/Editbook";
import Home from "./pages/Home";
import ShowBooks from "./pages/ShowBooks";

const App = () => {
  return (
    <Routes>
      <Route path = '/' element = {<Home/>} />
      <Route path = '/books/create' element = {<CreateBooks/>} />
      <Route path = '/' element = {} />
      <Route path = '/' element = {} />
      <Route path = '/' element = {} />
    </Routes>

  
  )
};

export default App;
