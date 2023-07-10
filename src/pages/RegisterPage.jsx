import {useState} from 'react';
import { signUp} from "../utils/api.js";
import TextInput from "../components/TextInput.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Description from "../components/text/Description.jsx";
import {VscClose} from "react-icons/vsc";
import {Link, useNavigate} from "react-router-dom";
import ErrorMessage from "../components/forms/ErrorMessage.jsx";
import {useRecoilState} from "recoil";
import userState from "../atoms/userAtom.js";

const RegisterPage = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const [error, setError] = useState("");

    const [user, setUser] = useRecoilState(userState);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        signUp(email, password, username)
            .then(user => {
                setUser(user)
                navigate('/account/links')
            }).catch(response => {
                setError(response?.data?.message || 'Unknow error!')
        });
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    return (
        <div className="flex flex-col p-10 gap-5">
            <div className="flex items-center">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">
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

                <PrimaryButton>
                    Sign Up
                </PrimaryButton>
            </form>
        </div>
    );
};

export default RegisterPage;