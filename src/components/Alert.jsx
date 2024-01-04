import React from "react";

const Alert = ({ message, type }) => {
  return (
    <div
      className={`${type}-message h-[45px] w-full rounded-md flex justify-start items-center my-6 px-4`}
    >
      {message}
    </div>
  );
};

export default Alert;
