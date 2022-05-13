import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import ReactQuill,{Quill} from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./css/AskQuestion.css";
import Editor from "react-quill/lib/toolbar";
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
// import { selectUser } from "../../feature/userSlice";
import { useHistory } from "react-router-dom";
// import ChipsArray from "./TagsInput";
import { API } from "../../src/backend";
import { Button } from "react-bootstrap";
import {isAutheticated} from '../auth/helper/authapicalls'
import ImageUploader from "quill-image-uploader";
import Navbar from "./Navbar";
Quill.register('modules/imageUpload', ImageUploader);
const {user}= isAutheticated();

function AskQuestion() {
  // const user = useSelector(selectUser);
  const [myImage,setMyImage] = useState("https://www.etsy.com/images/avatars/default_avatar_400x400.png");
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], 
    ["blockquote", "code-block",'image'],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"], 
  ];

  
   Editor.modules = {
    syntax: false,
    toolbar: {
      container: toolbarOptions
    },
    clipboard: {
      matchVisual: false,
    }
  };

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const history = useHistory();

 
  const handleQuill = (e) => {
    setBody(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "" && body !== "") {
      console.log(myImage);
      const bodyJSON = {
        title: title,
        body: body,
        tags: tag,
        ownerId: user.id,
        approved: true
      };
      console.log(body);
      await axios
        .post(`${API}/posts`, bodyJSON)
        .then((res) => {
          // console.log(res.data);
          alert("Question added successfully");
          history.push(`/questionOverview/${res.data._id}`);
        })
        .catch((err) => {
          alert(err?.response?.data)
          console.log(err);
        });
    }
  };
  return (
    <>
    <Navbar/>
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <ReactQuill
                  value={body}
                  onChange={(e)=>handleQuill(e)}
                  modules={Editor.modules}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about
                </small>
                <TagsInput
                  value={tag}
                  onChange={setTag}
                  name="fruits"
                  placeHolder="press enter to add new tag"
                />
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handleSubmit} className="button">
          Add your question
        </Button>
      </div>
    </div>
    </>
   
  );
}

export default AskQuestion;
