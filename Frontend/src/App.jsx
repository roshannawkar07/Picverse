import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import "./features/shared/global.scss";
import { PostContextProvider } from "./features/posts/post.context";
import { UserProvider } from "./features/users/state/user.context";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
