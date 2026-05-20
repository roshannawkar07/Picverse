import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState([]);
  return (
    <UserContext.Provider
      value={{
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
