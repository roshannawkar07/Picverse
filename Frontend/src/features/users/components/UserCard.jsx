const UserCard = ({ username, buttonText, onClick }) => {
  return (
    <div className="user-card">
      <div className="user-info">
        <p>{username}</p>
      </div>

      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default UserCard;
