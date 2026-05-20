import useSidebarUsers from "../hooks/useSidebarUsers";
import UserCard from "./UserCard";

const Sidebar = () => {
  const {
    followers,
    following,
    pending,
    suggestions,
    loading,
    handleAcceptRequest,
    handleRejectRequest,
    handleFollow,
    handleUnfollow,
  } = useSidebarUsers();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="sidebar">
      {/* Followers */}
      <div className="sidebar-section">
        <h2>Followers</h2>

        {followers.map((user) => (
          <UserCard
            key={user.username}
            username={user.username}
            buttonText="Follower"
          />
        ))}
      </div>

      {/* Following */}
      <div className="sidebar-section">
        <h2>Following</h2>

        {following.map((user) => (
          <UserCard
            key={user.username}
            username={user.username}
            buttonText="Following"
            onClick={() => handleUnfollow(user.username)}
          />
        ))}
      </div>
      {/* Pending */}
      <div className="sidebar-section">
        <h2>Requested</h2>

        {pending.map((user) => (
          <div key={user.username} className="request-card">
            <span>{user.username}</span>

            <div className="request-actions">
              <button onClick={() => handleAcceptRequest(user.username)}>
                Accept
              </button>

              <button onClick={() => handleRejectRequest(user.username)}>
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="sidebar-section">
        <h2>Suggestions</h2>

        {suggestions.map((user) => (
          <UserCard
            key={user.username}
            username={user.username}
            buttonText="Follow"
            onClick={() => handleFollow(user.username)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
