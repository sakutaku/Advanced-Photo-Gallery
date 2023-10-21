import React from "react";
import AnonymousMenu from "./AnonymousMenu";
import { Slide } from "react-awesome-reveal";
import UserMenu from "./UserMenu";
import { useAppSelector } from "../../app/hook";
import { selectUser } from "../../store/usersSlice";

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className="header">
      <Slide direction="right">
        <div>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</div>
      </Slide>
    </header>
  );
};

export default AppToolbar;
