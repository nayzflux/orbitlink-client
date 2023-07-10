import {useState} from 'react';
import {signIn} from "../utils/api.js";
import TextInput from "../components/TextInput.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Description from "../components/text/Description.jsx";
import {VscClose} from "react-icons/vsc";
import {Link, useNavigate} from "react-router-dom";
import ErrorMessage from "../components/forms/ErrorMessage.jsx";
import {useRecoilState} from "recoil";
import userState from "../atoms/userAtom.js";

const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useRecoilState(userState);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn(email, password)
            .then(user => {
                setUser(user)
                navigate('/account/links')

            }).catch(response => {
            console.log(response)
                setError(response?.data?.message || 'Unknow error!')
        });
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="flex flex-col p-10 gap-5">
            <div className="flex items-center">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">
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
                <TextInput type="email" label="Email Address" onChange={handleEmailChange} value={email} placeholder="Enter your account email address"/>
                <TextInput type="password" label="Password" onChange={handlePasswordChange} value={password} placeholder="Enter your password"/>

                <ErrorMessage>{error}</ErrorMessage>

                <PrimaryButton>
                    Sign In
                </PrimaryButton>
            </form>
        </div>
    );
};

export default LoginPage;