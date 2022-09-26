import { NextPage } from "next";
import { useRouter } from "next/router";
import Nav from "../components/nav/Nav";

type LayoutProps = {
  title?: string;
};

const MainLayout: NextPage<LayoutProps> = ({ children, title }) => {
  const router = useRouter();
  return (
    <div>
      {!router.pathname.includes("login") && <Nav />}
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
