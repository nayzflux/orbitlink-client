import AccountDropdown from "./AccountDropdown.jsx";

const Header = () => {
    return (
        <header className="flex items-center gap-8 p-6">
            <h1 className="uppercase font-black">OrbitLink</h1>

            <nav>
                <ul className="flex items-center gap-4">
                    <li>
                        <a href="#">Home</a>
                    </li>

                    <li>
                        <a href="#">Features</a>
                    </li>

                    <li>
                        <a href="#">Statistics</a>
                    </li>

                    <li>
                        <a href="#">Github</a>
                    </li>
                </ul>
            </nav>

            <div className="flex justify-center items-center ml-auto">
                <AccountDropdown/>
            </div>
        </header>
    );
};

export default Header;