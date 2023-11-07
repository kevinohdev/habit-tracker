import Container from "../Container";
import Categories from "./AddTodo";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavBarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavBarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full p-4 z-10 bg-white border-b-[1px] ">
      <div className="">
        <Container>
          <div className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          ">
            <Logo />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;