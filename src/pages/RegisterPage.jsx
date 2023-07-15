import {useState} from 'react';
import { signUp} from "../utils/api.js";
import TextInput from "../components/TextInput.jsx";
import Description from "../components/text/Description.jsx";
import {VscClose} from "react-icons/vsc";
import {Link, useNavigate} from "react-router-dom";
import ErrorMessage from "../components/forms/ErrorMessage.jsx";
import {useRecoilState} from "recoil";
import userState from "../atoms/userAtom.js";
import toast from "react-hot-toast";

const RegisterPage = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const [error, setError] = useState("");

    const [user, setUser] = useRecoilState(userState);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password === "") {
            setError('Password is required');
            return;
        }

        if (email === "") {
            setError('Email is required');
            return;
        }

        if (username === "") {
            setError('Username is required');
            return;
        }

        setIsLoading(true);
        !
        signUp(email, password, username)
            .then(user => {
                setIsLoading(false);
                toast.success("Account created")
                setUser(user)
                navigate('/account/links')
            }).catch(response => {
                setIsLoading(false);
                toast.error("Unable to create account")
                setError(response?.data?.message || 'Unknow error!')
        });
    }

    const handleEmailChange = (e) => {
        setError('')

        if (e.target.value === "") {
            setError('Email is required');
        }

        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        !setError('')

        if (e.target.value === "") {
            setError('Password is required');
        }

        setPassword(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setError('')

        if (e.target.value === "") {
            setError('Username is required');
        }

        setUsername(e.target.value);
    }

    return (
        <main className="flex items-center justify-center h-screen">
            <div className="flex flex-col p-10 gap-5 bg-white shadow-lg rounded-lg">
            <div className="flex items-center gap-20">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold uppercase">
                        Sign Up
                    </h1>

                    <Description>Create an Orbit user account</Description>

                    <Link to="/account/login" className="text-blue-600 underline text-sm">I already have an account</Link>
                </div>

                <button className="ml-auto" onClick={() => navigate('/')}>
                    <VscClose size={25}/>
                </button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <TextInput type="text" label="Username" onChange={handleUsernameChange} value={username} placeholder="Enter how you want to appear on Orbit"/>
                <TextInput type="email" label="Email Address" onChange={handleEmailChange} value={email} placeholder="Enter your email address"/>
                <TextInput type="password" label="Password" onChange={handlePasswordChange} value={password} placeholder="Enter your password"/>

                <ErrorMessage>{error}</ErrorMessage>

                <button disabled={isLoading} className="transition py-2 px-4 text-white bg-black rounded hover:opacity-90 hover:shadow uppercase disabled:cursor-not-allowed disabled:opacity-60">Sign Up</button>
            </form>
        </div>
        </main>
    );
};

export default RegisterPage;