import React, { useContext } from "react";
import { DataContext } from "../DataContext";
import { useFetchData } from "./customHook";
const ApiData = () => {
  const dataContext = useContext(DataContext);
  const { loading } = useFetchData(
    "https://jsonplaceholder.typicode.com/todos"
  );
  if (loading) return <h1>Loading...</h1>;
  const { form, setForm } = dataContext;
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  function checkEmptyForm(data) {
    const { name, lname } = data;
    return !name || !lname;
  }
  const handleAddForm = (e) => {
    let empty = checkEmptyForm(form);
    if (empty) {
      alert("Form is empty");
      return false;
    }
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <input
        type="text"
        placeholder="Enter Name"
        value={form.name}
        name="name"
        onChange={handleForm}
      />
      <input
        type="text"
        placeholder="Enter Lname"
        value={form.lname}
        name="lname"
        onChange={handleForm}
      />
      <button type="submit" onClick={handleAddForm}>
        Submit
      </button>
    </div>
  );
};
export default ApiData;
