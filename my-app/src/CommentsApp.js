import './CommentsApp.css';
import React, { useState, useEffect } from "react";
import left from './assets/imgs/Left_2.png'

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
            <textarea id="w3review" name="w3review" rows="100" cols="100" className='comment-input' placeholder='დაწერე კომენტარი'></textarea>
            <button className='write-comment-button'>დააკომენტარე</button>
            
            
        </div>
        <div className='comments-text-container'>
            <div className='comments-text'>კომენტარები</div>
            <div className='number-of-comments'></div>
        </div>
        <div className='comments-container'>
          {comments && comments.map((comment)=>{
            const hasChild = comment.sub_comments? true : false
            return <div className='comment-container'>
              <div className='parent-comment-container'>
                <div className='employee-img-container'>
                  <img src={comment.author_avatar}></img>
                </div>

                <div className='comment-text-container'>
                  <div className='comment-employee-name'>{comment.author_nickname}</div>
                  <div className='the-comment-text'>{comment.text}</div>
                  <button className='answer-button'>
                    <img src={left} style={{width:'10px', height:'10px'}}></img>
                    <div className='answer-button-text'>
                      უპასუხე
                    </div>
                  </button>
                </div>

              </div>
              
              {hasChild && <div className='subcomment-container'>
                <div className='employee-img-container'>
                  <img src={comment.sub_comments[0].author_avatar}></img>
                </div>

                <div>
                  <div className='comment-employee-name'>{comment.sub_comments[0].author_nickname}</div>
                  <div className='subcomment'>{comment.sub_comments[0].text}</div>
                </div>
                
                </div>}
              
              
            </div>
          })}
        </div>
    </div>
  );
}

export default CommentsApp;
