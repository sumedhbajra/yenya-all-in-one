import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useContext,
} from "react";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2.4rem 4.4rem 6.45rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 150rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 20px;
  height: 100%;
`;

export interface SidebarContextProp {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProp>({
  expanded: true,
  setExpanded: () => {},
});

export default function AppLayout() {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div
        className={`grid h-screen ${
          expanded ? "grid-cols-[26rem_1fr]" : "grid-cols-[8rem_1fr]"
        } grid-rows-[auto_1fr]`}
      >
        <Header title="YenyaSoft Internship & Trainee Program" size="large" />
        <SideBar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </div>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  return context;
}
