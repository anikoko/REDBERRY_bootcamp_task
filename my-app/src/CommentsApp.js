import './CommentsApp.css';
import React, { useState, useEffect } from "react";

function CommentsApp(props) {


  return (
    <div>
        <div className='input-container'>
            <input type='text' className='comment-input'/>
            <button className='write-comment-button'>დააკომენტარე</button>
        </div>
        <div className='comments-text-container'>
            <div className='comments-text'>კომენტარები</div>
            <div className='number-of-comments'></div>
        </div>
        <div className='comments-container'></div>
    </div>
  );
}

export default CommentsApp;
