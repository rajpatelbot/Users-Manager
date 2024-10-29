import { createContext, useState } from "react";
import { UserResponse } from "../components/types";

type ContextType = {
  user: UserResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
};

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const Context = createContext<ContextType>({ user: null, setUser: () => {} });

const Provider = ({ children }: Props) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  return <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>;
};

export default Provider;
