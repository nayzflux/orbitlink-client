import {useState} from 'react';
import {signIn} from "../utils/api.js";
import TextInput from "../components/TextInput.jsx";
import Description from "../components/text/Description.jsx";
import {VscClose} from "react-icons/vsc";
import {Link, useNavigate} from "react-router-dom";
import ErrorMessage from "../components/forms/ErrorMessage.jsx";
import {useRecoilState} from "recoil";
import userState from "../atoms/userAtom.js";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    // eslint-disable-next-line no-unused-vars
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

        setIsLoading(true);

        signIn(email, password)
            .then(user => {
                setIsLoading(false);
                toast.success("Logged in")
                setUser(user)
                navigate('/account/links')
            }).catch(response => {
            setIsLoading(false);
            toast.error("Unable to login")
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
        setError('')

        if (e.target.value === "") {
            setError('Password is required');
        }

        setPassword(e.target.value);
    }

    return (
        <main className="flex items-center justify-center h-screen">
            <div className="flex flex-col p-10 gap-5 bg-white shadow-lg rounded-lg">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold uppercase">
                            Sign In
                        </h1>

                        <Description>Login to your Orbit user account</Description>

                        <Link to="/account/register" className="text-blue-600 underline text-sm">I don't have an account</Link>
                    </div>

                    <button className="ml-auto" onClick={() => navigate('/')}>
                        <VscClose size={25}/>
                    </button>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <TextInput disabled={isLoading} type="email" label="Email Address" onChange={handleEmailChange} value={email} placeholder="Enter your account email address"/>
                    <TextInput disabled={isLoading} type="password" label="Password" onChange={handlePasswordChange} value={password} placeholder="Enter your password"/>

                    <ErrorMessage>{error}</ErrorMessage>

                    <button disabled={isLoading} className="transition py-2 px-4 text-white bg-black rounded hover:opacity-90 hover:shadow uppercase disabled:cursor-not-allowed disabled:opacity-60">Sign In</button>
                </form>
            </div>
        </main>
    );
};

export default LoginPage;