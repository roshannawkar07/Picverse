import { useEffect } from "react";

import {
  getSidebarUsers,
  followUser,
  unfollowUser,
  acceptFollowRequest,
  rejectFollowRequest,
} from "../services/user.service";

import { useUserContext } from "../state/user.context";

const useSidebarUsers = () => {
  const {
    followers,
    setFollowers,

    following,
    setFollowing,

    suggestions,
    setSuggestions,

    loading,
    setLoading,

    pending,
    setPending,
  } = useUserContext();

  // Fetch Sidebar Users
  const fetchSidebarUsers = async () => {
    try {
      setLoading(true);

      const data = await getSidebarUsers();

      setFollowers(data.followers);
      setFollowing(data.following);
      setSuggestions(data.suggestions);
      setPending(data.pending);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Follow Handler
  const handleFollow = async (username) => {
    try {
      await followUser(username);

      await fetchSidebarUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Unfollow Handler
  const handleUnfollow = async (username) => {
    try {
      await unfollowUser(username);

      await fetchSidebarUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Accept Request
  const handleAcceptRequest = async (username) => {
    try {
      await acceptFollowRequest(username);

      await fetchSidebarUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Reject Request
  const handleRejectRequest = async (username) => {
    try {
      await rejectFollowRequest(username);

      await fetchSidebarUsers();
    } catch (error) {
      console.log(error);
    }
  };
  // Suggested Users

  useEffect(() => {
    fetchSidebarUsers();
  }, []);

  return {
    followers,
    following,
    pending,
    suggestions,
    loading,
    handleAcceptRequest,
    handleRejectRequest,
    handleFollow,
    handleUnfollow,
  };
};

export default useSidebarUsers;
