import React, { useState } from "react";
import "./MsgApp.css";

function MsgApp() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [showGif, setShowGif] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [showInput, setInput] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    setInput(e.target.value);
  };

  const handleTodo = () => {
   
    setTodo([...todo, text]);

  };

  const handleGif = () => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=p9ZQGfae7Vj7UIaD4Opw8SsrwSrVmd0A&q=${showInput}&limit=25&offset=0&rating=g&lang=en`
    )
      .then((d) => d.json())
      .then((data) => setGifs([...data.data]));
      
      alert("For sending Gifs you need to type what type of Gifs for example if you type hello you will get Hello gifs.If you click on the required GIF it will be sent")
    setShowGif(true);
  };
  return (
    <>
    <div className="Header"><p>Post Messages/Gifs</p></div>
    <div className="chatDiv">
      
      <div className="main">
        {todo.map((item, index) => {
          return item.slice(0, 5) === "https" ? (
            <img className="smallImage" src={item} />
          ) : (
            <div>{item}</div>
          );
        })}
      </div>

      <input
        className="msgInput"
        type="text"
        name=""
        id=""
        placeholder="Type message"
        onChange={handleChange}
      />

      <button onClick={handleTodo}>Send</button>
      <button onClick={() => handleGif()}>GIF</button>
      {showGif ? (
        <div className="imageContainer">
          {gifs.map((e) => (
            <div
              className="imageDiv"
              onClick={() => {
                setTodo([...todo, e.images.downsized.url]);
              }}
            >
              <img src={e.images.downsized.url} alt="" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
    </>
    
  );
}

export default MsgApp;