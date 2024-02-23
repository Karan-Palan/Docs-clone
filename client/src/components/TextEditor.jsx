import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { io } from "socket.io-client";

const TextEditor = () => {
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  const handleEditorChange = (content, delta, source, editor) => {
    if (source === "user") {
      // Changes originated from this client, emit them to the server
      setValue(content);
      socket.emit("send-changes", delta);
    } else if (source === "api") {
      // Changes originated from applying remote changes, update the editor
      setValue(content);
    }
  };

  const handleQuillRef = (ref) => {
    if (ref) {
      setQuill(ref.getEditor());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-400 to-blue-900 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-white mb-8 mt-8">Karan Docs</h1>
      <div className="container bg-gray-100 mx-auto my-4 p-4 rounded-lg shadow-lg">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleEditorChange}
          className="h-full"
          ref={handleQuillRef}
        />
      </div>
    </div>
  );
};

export default TextEditor;
