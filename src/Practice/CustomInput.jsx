import React from "react";
const CustomInput = (props) => {
  const { text, placeholder, value, handleChange } = props;
  return (
    <>
      <input
        type={text}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};
export default CustomInput;
