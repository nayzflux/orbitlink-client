import AccountDropdown from "./AccountDropdown.jsx";
import {BiPlanet} from "react-icons/bi";

const Header = () => {
    return (
        <header className="flex items-center gap-8 p-6 shadow">
            <div className="flex gap-1 items-center">
                <BiPlanet size={36}/>

                <h1 className="uppercase text-2xl font-bold">Orbit</h1>
            </div>

            <nav>
                <ul className="flex items-center gap-4">
                    <li>
                        <a href="/" className="hover:underline">Home</a>
                    </li>

                    <li>
                        <a href="/#features">Features</a>
                    </li>

                    <li>
                        <a href="/#statistics">Statistics</a>
                    </li>

                    <li>
                        <a href="/#github">Github</a>
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