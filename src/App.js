import React from "react";
import UserInterface from "./pages/UserInterface/UserInterface";
import MainNavigationPage from "./pages/MainNavigation/MainNavigation";
import { selectUser } from "./redux/features/userSlice";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(selectUser);
  return <div>{user ? <MainNavigationPage /> : <UserInterface />}</div>;
}

export default App;
