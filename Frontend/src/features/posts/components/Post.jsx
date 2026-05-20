import React from "react";

const Post = ({ user, post, loading, handleLike, handleUnLike }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="post">
      <div className="user">
        <div className="img-wrapper">
          <img src={user.profileImage} alt="" />
        </div>

        <p>{user.username}</p>
      </div>

      <img src={post.imgUrl} alt="" />

      <div className="icons">
        <div className="left">
          <button>
            <svg
              className={post.isLiked ? "like" : ""}
              onClick={() => {
                post.isLiked ? handleUnLike(post._id) : handleLike(post._id);
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="bottom">
        <p className="caption">{post.caption}</p>
      </div>
    </div>
  );
};

export default Post;
