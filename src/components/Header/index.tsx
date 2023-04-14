import ClientOnly from "../ClientOnly";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import RentModal from "../Modals/RentModal";
import SearchModal from "../Modals/SearchModal";
import ToastProvider from "../providers/ToastProvider";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <ClientOnly>
      <ToastProvider />
      <LoginModal />
      <RegisterModal />
      <SearchModal />
      <RentModal />
      <Navbar currentUser={null} />
    </ClientOnly>
  );
};

export default Header;
