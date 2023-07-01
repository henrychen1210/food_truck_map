import React, { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate, useSearchParams } from "react-router-dom";

function EditPost({ isAuth }) {
  const [searchparams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [line, setLine] = useState("");
  const [station, setStation] = useState("");
  const [postText, setPostText] = useState("");

  let navigate = useNavigate();
  const postID = searchparams.get("postID");
  const postDoc = doc(db, "posts", postID);

  const editPost = async () => {
    await updateDoc(postDoc, {
        line: line,
        postText: postText,
        station: station,
        title: title
      });
    navigate("/");
  };

  useEffect(() => {
    setLoading(true)

    if (!isAuth) {
      navigate("/login");
    }

    getDoc(postDoc)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const postData = docSnapshot.data();
          setTitle(postData.title);
          setLine(postData.line);
          setStation(postData.station);
          setPostText(postData.postText);
          console.log(postData)
        } else {
          console.log("Document does not exist");
        }
      })
      .catch((error) => {
        console.log("Error retrieving document:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the data is fetched
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while fetching the data
  }

  return (
    <div className="editPostPage">
      <div className="cpContainer">
        <h1>Edit Post</h1>

        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            defaultValue={title}
          />
        </div>

        <div className="inputGp">
          <label>Line:</label>
          <select
            onChange={(event) => {
              setLine(event.target.value);
            }}
            defaultValue={line}
          >
            <option value="ACE">A, C, E</option>
            <option value="BDFM">B, D, F, M</option>
            <option value="G">G</option>
            <option value="JZ">J, Z</option>
            <option value="L">L</option>
            <option value="NQWR">N, Q, W, R</option>
            <option value="S">S</option>
            <option value="123">1, 2, 3</option>
            <option value="456">4, 5, 6</option>
            <option value="7">7</option>
          </select>
        </div>

        <div className="inputGp">
          <label>Station:</label>
          <input
            placeholder="Station..."
            onChange={(event) => {
              setStation(event.target.value);
            }}
            defaultValue={station}
          />
        </div>

        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
            defaultValue={postText}
          />
        </div>

        <button onClick={editPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default EditPost;
