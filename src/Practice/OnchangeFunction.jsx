import { useContext } from "react";
import { DataContext } from "../DataContext";
export const useHandleName = () => {
  const { setName } = useContext(DataContext);
  const handleName = (e) => {
    const { value } = e.target;
    if (value.trim() === "") {
      alert("Please enter a name");
      setName("");
    } else {
      setName(value);
    }
  };
  return { handleName };
};
