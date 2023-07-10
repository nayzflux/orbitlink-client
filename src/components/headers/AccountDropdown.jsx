import {useEffect, useState} from 'react';
import {BiChevronDown, BiLink, BiLogOut} from "react-icons/bi";
import {VscAccount} from "react-icons/vsc";
import {useRecoilState} from "recoil";
import userState from "../../atoms/userAtom.js";
import {fetchUser, logout} from "../../utils/api.js";
import linkListState from "../../atoms/linkListAtom.js";

const AccountDropdown = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useRecoilState(userState);
    // eslint-disable-next-line no-unused-vars
    const [linkList, setLinkList] = useRecoilState(linkListState);

    const handleOpen = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (!user) {
            fetchUser('@me')
                .then(user => {
                    setUser(user)
                }).catch(err => {

            })
        }
    }, []);

    const handleLogout = () => {
        logout()
            .then(() => {
                setUser(null);
                setLinkList([]);
            }).catch(err => {

        });
    }

    return (
        user ?
            <div className="flex flex-col gap-2 items-end">
                <button onClick={handleOpen} className="font-bold flex items-center gap-2">
                    <p className="">{user?.username || user?.email}</p>
                    <BiChevronDown size={20}/>
                </button>

                {open &&
                    <div className="top-16 absolute flex flex-col outline outline-1 outline-neutral-300 rounded bg-white shadow">
                        <a href={"/account/profile"} className="p-2 flex gap-2">
                            <VscAccount size={25}/>
                            <p>Profile</p>
                        </a>

                        <a href={"/account/links"} className="p-2 flex gap-2">
                            <BiLink size={25}/>
                            <p>Your Links</p>
                        </a>

                        <button type="button" onClick={handleLogout} className="p-2 flex gap-2">
                            <BiLogOut size={25}/>
                            <p>Logout</p>
                        </button>
                    </div>
                }
            </div>
            :
            <div className="flex gap-4 items-center">
                <a href="/account/login" className="rounded-full px-3 py-1.5 border-2 border-purple-800 hover:opacity-70 font-semibold">Sign In</a>
                <a href="/account/login" className="rounded-full px-3 py-1.5 bg-purple-800 hover:opacity-70 font-semibold text-white">Sign Up</a>
            </div>
    );
};

export default AccountDropdown;