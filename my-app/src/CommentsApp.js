import './CommentsApp.css';
import React, { useState, useEffect } from "react";

function CommentsApp(props) {
  const [comments, setComments] = useState([])
  const [error, setError] = useState()

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`${props.API_URL}/tasks/${props.task.id}/comments`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${props.TOKEN}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        const result = await response.json();
        setComments(result)
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData()

  },[])



  return (
    <div className='comments-box'>
        <div className='input-container'>
            <div className='comment-input' placeholder='დაწერე კომენტარი'>
            <button className='write-comment-button'>დააკომენტარე</button>
            </div>
            
        </div>
        <div className='comments-text-container'>
            <div className='comments-text'>კომენტარები</div>
            <div className='number-of-comments'></div>
        </div>
        <div className='comments-container'>
          {comments && comments.map((comment)=>{
            const hasChild = comment.sub_comments? true : false
            return <div>
              <div>
                <div className='text'>{comment.text}</div>
              </div>
              {hasChild && <div>
                <div>{comment.sub_comments[0].text}</div>
                </div>}
              
              
            </div>
          })}
        </div>
    </div>
  );
}

export default CommentsApp;
