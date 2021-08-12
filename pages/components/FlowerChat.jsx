import React, { useState } from "react";

import CommentKit from "../data/CommentKit";

export default function FlowerChat({ flowerId, comments }) {
  const commentKit = new CommentKit();
  const [message, setMessage] = useState("");
  const [_comments, setComments] = useState(comments);
  const [isLoading, setIsLoading] = useState(false);

  const submitComment = async (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    setIsLoading(true);
    const m = await commentKit.postComment(flowerId, message);
    setComments([..._comments, m]);
    setIsLoading(false);
  };

  return (
    <>
      <h3>{_comments.length} Comment(s)</h3>

      {/* list of comments */}
      {_comments.map((c, index) => {
        return (
          <div className="comment" key={`flower-comment-` + index}>
            {c.message}
          </div>
        );
      })}

      {/* comment form */}
      <form className="comment-form" onSubmit={submitComment}>
        <textarea placeholder="Write a comment!" onChange={(e) => setMessage(e.target.value)}></textarea>
        <button className="flower-button clickable" type="submit" disabled={isLoading}>
          Send message
        </button>
      </form>
    </>
  );
}
