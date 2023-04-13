import ClientOnly from "../ClientOnly";
import ToastProvider from "../providers/ToastProvider";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <ClientOnly>
      <ToastProvider />
      <Navbar currentUser={null} />
    </ClientOnly>
  );
};

export default Header;
