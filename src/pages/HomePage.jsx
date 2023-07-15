import {Link} from "react-router-dom";
import {CgArrowRight} from "react-icons/cg";
import {AiFillGithub} from "react-icons/ai";
import {BiGitBranch} from "react-icons/bi";
import Heading from "../components/new/texts/Heading.jsx";
import Paragraph from "../components/new/texts/Paragraph.jsx";
import {useRecoilState} from "recoil";
import modalState from "../atoms/modalAtom.js";
import Header from "../components/headers/Header.jsx";
import {useEffect, useState} from "react";
import {getStats} from "../utils/api.js";
import toast from "react-hot-toast";

const HomePage = () => {
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [users, setUsers] = useState('?');
    const [clicks, setClicks] = useState('?');
    const [links, setLinks] = useState('?');

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStats()
            .then(({users, clicks, links}) => {
                setUsers(users);
                setClicks(clicks);
                setLinks(links);
                setIsLoading(false);
        }).catch(err => {
            toast.error("Failed to fetch stats");
        })
    }, []);


    return (
        <>
            <Header/>

            <main className="flex flex-col w-full h-max items-center justify-center">
                <section className="flex flex-col items-center text-center gap-6 py-20">
                    <a onClick={() => setIsOpen(true)} className="text-sm hover:bg-yellow-300 hover:shadow transition hover:text-white gap-1 rounded-full bg-neutral-100 py-1.5 px-3 font-medium flex items-center" >
                        <BiGitBranch size={18}/>
                        <p>v1.0.0-beta</p>
                    </a>

                    <Heading>
                        SHORT, SHARE, ANALYZE
                    </Heading>
                    <Paragraph>
                        Streamline your URLs effortlessly with Orbit, the open-source tool providing detailed analytics on your link performance. Share, analyze, and optimize your online presence starting today.
                    </Paragraph>

                    <div className="flex gap-10">
                        <Link to="/account/links" className=" flex gap-2 font-semibold text-white py-2 px-6 rounded-full bg-pink-500 hover:shadow items-center hover:bg-gradient-to-r hover:from-blue-300 hover:to-pink-400 transition-all duration-500 ease-out">
                            <CgArrowRight  className="" size={25}/>
                            <p>Start Now</p>
                        </Link>

                        <a href="/github" className="gap-2 flex items-center font-semibold py-2 px-4 rounded-full border cursor-pointer border-neutral-600 hover:shadow hover:opacity-70 transition">
                            <AiFillGithub className="" size={25}/>
                            <p>See on Github</p>
                        </a>
                    </div>
                </section>

                <section id="statistics" className="relative flex w-full justify-around border-t-2 border-b-2 py-5">
                    <div className="flex flex-col items-center">
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-600">
                            {users}
                        </p>
                        <label className="uppercase font-semibold">
                            Users
                        </label>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">
                            {clicks}
                        </p>
                        <label className="uppercase font-semibold">
                            Clicks
                        </label>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-rose-400">
                            {links}
                        </p>
                        <label className="uppercase font-semibold">
                            Links
                        </label>
                    </div>
                </section>

                <section className="" id="features">
                    <div className="grid grid-cols-2 p-10 gap-6 items-center">
                        <div className="flex flex-col gap-6">
                            <h1 className="font-bold text-4xl">ANALYTICS</h1>
                            <p className="font-medium text-neutral-500 max-w-[500px]">
                                Orbit's comprehensive analytics system empowers you with click statistics enriched with country and city-level localization. Gain insights into user engagement through intuitive graphs and charts, depicting browser, device, and operating system statistics, all seamlessly presented in a dynamic dashboard.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <img src="/Analytics1.png" className="shadow-lg"/>
                            <div className="grid grid-cols-2 gap-2">
                                <img src="/Analytics2.png" className="shadow-lg"/>
                                <img src="/Analytics3.png" className="shadow-lg"/>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="github">
                    <div className="grid grid-cols-2 p-10 gap-6 items-center">
                        <div className="flex items-center w-full mr-auto">
                            <AiFillGithub size={400}/>
                        </div>

                        <div className="flex flex-col gap-6 ml-auto">
                            <h1 className="font-bold text-4xl">GITHUB</h1>
                            <p className="font-medium text-neutral-500 max-w-[500px]">
                                Discover Orbit, the open-source URL shortener that empowers you. With its open-source nature, Orbit gives you full access to the codebase on GitHub. Join our community of developers and enthusiasts to customize and contribute. Experience the flexibility and innovation of open source as you streamline your links with Orbit. Try it today and unlock the potential of open source URL shortening.                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default HomePage;
