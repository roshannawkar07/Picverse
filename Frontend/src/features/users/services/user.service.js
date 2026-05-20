import api from "../../../features/shared/services/api";

// Get Sidebar Users
export const getSidebarUsers = async () => {
  const response = await api.get("/users/sidebar/users");

  return response.data;
};

// Follow User
export const followUser = async (username) => {
  const response = await api.post(`/users/follow/${username}`);

  return response.data;
};

// Unfollow User
export const unfollowUser = async (username) => {
  const response = await api.post(`/users/unfollow/${username}`);

  return response.data;
};

// Accept Follow Request
export const acceptFollowRequest = async (username) => {
  const response = await api.patch(`/users/follow/accept/${username}`);

  return response.data;
};

// Reject Follow Request
export const rejectFollowRequest = async (username) => {
  const response = await api.patch(`/users/follow/reject/${username}`);

  return response.data;
};
