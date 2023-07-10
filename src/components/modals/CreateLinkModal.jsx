import {useState} from 'react';
import TextInput from "../TextInput.jsx";
import OptionalField from "../forms/OptionalField.jsx";
import {VscClose} from "react-icons/vsc";
import PrimaryButton from "../PrimaryButton.jsx";
import Description from "../text/Description.jsx";
import {useRecoilState} from "recoil";
import linkListState from "../../atoms/linkListAtom.js";
import ErrorMessage from "../forms/ErrorMessage.jsx";
import { useNavigate} from "react-router-dom";
import {createLink} from "../../utils/api.js";
import {formatDate} from "../../utils/utils.js";

const CreateLinkModal = () => {
    const [releaseDateEnabled, setReleaseDateEnabled] = useState(false);
    const [expirationDateEnabled, setExpirationDateEnabled] = useState(false);
    const [passwordProtectionEnabled, setPasswordProtectionEnabled] = useState(false);

    const [destinationURL, setDestinationURL] = useState("");
    const [shortURL, setShortURL] = useState("")
    const [releaseDate, setReleaseDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)))
    const [expirationDate, setExpirationDate] = useState(formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)))
    const [password, setPassword] = useState("")

    const [globalError, setGlobalError] = useState('');

    const [linkList, setLinkList] = useRecoilState(linkListState);

    const navigate = useNavigate();

    const handleSubmit = (e) =>  {
        e.preventDefault();

        createLink({
            destinationURL,
            shortURL,
            passwordProtectionEnabled,
            releaseDateEnabled,
            expirationDateEnabled,
            password,
            releaseDate,
            expirationDate
        })
            .then(link => {
                navigate('/account/links')
            }).catch((code, message) => {
                console.log(code, message.toString())
                setGlobalError(message.toString())
            })
    }

    const handleDestinationURLChange = (e) => {
        e.preventDefault();
        setDestinationURL(e.target.value);
    }

    const handleReleaseDateChange = (e) => {
        e.preventDefault();
        setReleaseDate(e.target.value);
    }

    const handleShortURLChange = (e) => {
        e.preventDefault();
        setShortURL(e.target.value.replace('orb.it/', '').replace('orb.it', ''));
    }

    const handlePasswordChange = (e)       => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const handleExpirationDateChange = (e) => {
        e.preventDefault();
        setExpirationDate(e.target.value);
    }

    const handleReleaseDateToggle = (e) => {
        setReleaseDateEnabled(current => !current);
    }

    const handleExpirationDateToggle = (e) => {
        setExpirationDateEnabled(current => !current);
    }

    const handlePasswordRestrictionToggle = (e) => {
        setPasswordProtectionEnabled(current => !current);
    }

    return (
        <div className="flex flex-col p-10 gap-5">
            <div className="flex items-center">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">
                        Create a new link
                    </h1>

                    <Description>Short your URL and customize settings</Description>
                </div>

                <button className="ml-auto" onClick={() => navigate('/account/links')}>
                    <VscClose size={25}/>
                </button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <TextInput label="Destination URL" placeholder="https://example.com/mylink" onChange={handleDestinationURLChange}/>
                <TextInput label="Short URL" value={"orb.it/" + shortURL} onChange={handleShortURLChange}/>

                <hr className="rounded-full bg-neutral-200"/>

                <OptionalField label="Release Date" checked={releaseDateEnabled} value={releaseDate} type="datetime-local" onToggle={handleReleaseDateToggle} onValueChange={handleReleaseDateChange}/>
                <OptionalField label="Expiration Date" checked={expirationDateEnabled} value={expirationDate} type="datetime-local" onToggle={handleExpirationDateToggle} onValueChange={handleExpirationDateChange}/>
                <OptionalField placeholder="Enter password to allow user to acces the link" label="Password Restriction" checked={passwordProtectionEnabled} value={password} type="password" onToggle={handlePasswordRestrictionToggle} onValueChange={handlePasswordChange}/>

                <ErrorMessage>{globalError}</ErrorMessage>

                <PrimaryButton>
                    Create
                </PrimaryButton>
            </form>
        </div>
    );
};

export default CreateLinkModal;