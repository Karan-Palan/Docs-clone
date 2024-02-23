import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  const [value, setValue] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-400 to-blue-900 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-white mb-8 mt-8">Karan Docs</h1>
      <div className="container bg-gray-100 mx-auto my-4 p-4 rounded-lg shadow-lg">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="h-full"
          style={{
            width: "100%",
            minHeight: "11in",
            padding: "1in",
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, .5)",
            backgroundColor: "white",
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
