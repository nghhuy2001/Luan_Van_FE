import TopBar from "./TopBar";
import NavBar from "./NavBar";

const Header = () => {
    return (
        <header className="sticky top-0 z-50">
            <TopBar />
            <NavBar />
        </header>
    );
};

export default Header;
