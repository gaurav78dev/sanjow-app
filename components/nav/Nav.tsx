import Link from "next/link";
import Router from "next/router";
import navStyles from "../../styles/Nav.module.css";
import call from "../../utils/localStorage/index";
const Nav = () => {
  const token = call.get("token");
  return (
    <nav className={navStyles.nav}>
      <div className={navStyles.makeItFlex}>
        <ul>
          <li>
            <Link href="/userlist">UserList</Link>
          </li>
          <li>
            <div>About</div>
          </li>
        </ul>
        {token ? (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              call.remove("token");
              Router.push("/");
            }}
          >
            Logout
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
