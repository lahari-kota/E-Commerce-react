import React from "react";

function Button({ title, handleClick }) {
  return (
    <div>
      <button
        className="bg-sky-900 px-2 py-2 rounded text-white font-semibold min-w-[150px] flex gap-4 justify-center items-center"
        onClick={handleClick}
      >
        <span>{title}</span>
      </button>
    </div>
  );
}

export default Button;
