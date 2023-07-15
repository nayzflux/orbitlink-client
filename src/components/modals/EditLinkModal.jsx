import {useEffect, useState} from 'react';
import TextInput from "../TextInput.jsx";
import OptionalField from "../forms/OptionalField.jsx";
import {VscClose} from "react-icons/vsc";
import PrimaryButton from "../PrimaryButton.jsx";
import Description from "../text/Description.jsx";
import ErrorMessage from "../forms/ErrorMessage.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {fetchLink, updateLink} from "../../utils/api.js";
import {formatDate} from "../../utils/utils.js";
import toast from "react-hot-toast";

const EditLinkModal = () => {
    const params = useParams();
    const _id = params._id;

    const [releaseDateEnabled, setReleaseDateEnabled] = useState(false);
    const [expirationDateEnabled, setExpirationDateEnabled] = useState(false);
    const [passwordProtectionEnabled, setPasswordProtectionEnabled] = useState(false);

    const [destinationURL, setDestinationURL] = useState("");
    const [shortURL, setShortURL] = useState(params.shortURL);
    const [releaseDate, setReleaseDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)))
    const [expirationDate, setExpirationDate] = useState(formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)))
    const [password, setPassword] = useState("")

    const [globalError, setGlobalError] = useState('');

    const [updating, setUpdating] = useState(false);

    const navigate = useNavigate();

    /**
     * Fetch & Update
     */

    useEffect(() => {
        fetchLink(_id)
            .then(link => {
                const {releaseDate, expirationDate, shortURL, destinationURL, expirationDateEnabled, passwordProtectionEnabled, releaseDateEnabled} = link;

                setExpirationDate(formatDate(new Date(expirationDate)));
                setReleaseDate(formatDate(new Date(releaseDate)));

                setPasswordProtectionEnabled(passwordProtectionEnabled);
                setExpirationDateEnabled(expirationDateEnabled);
                setReleaseDateEnabled(releaseDateEnabled);

                setShortURL(shortURL);
                setDestinationURL(destinationURL);
            }).catch(res => {
                if (res.status === 401) {
                    toast.error("You need to be logged in")
                    return navigate('/account/login')
                }

                if (res.status === 403) {
                    toast.error("You're not allowed to view this link")
                    return navigate('/account/links')
                }

                if (res.status === 404) {
                    toast.error("This link doesn't exists");
                    return navigate('/account/links')
                }

                toast.error("Unable to view link")
        });
    }, [_id]);

    const handleSubmit = (e) =>  {
        e.preventDefault();

        setUpdating(true)

        updateLink(_id, {releaseDate, releaseDateEnabled, password, passwordProtectionEnabled, expirationDate, expirationDateEnabled, shortURL, destinationURL})
            .then(link => {
                toast.success("Link updated");
                setUpdating(false)
                navigate('/account/links');

            }).catch(code => {
                setUpdating(false)
                setGlobalError('Unknow error')
                toast.error("Unable to update link");
            });
    }


    /**
     * Edit State
     */

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
        console.log(e.target.value)
    }

    const handleReleaseDateToggle = () => {
        setReleaseDateEnabled(current => !current);
    }

    const handleExpirationDateToggle = () => {
        setExpirationDateEnabled(current => !current);
    }

    const handlePasswordRestrictionToggle = () => {
        setPasswordProtectionEnabled(current => !current);
    }

    return (
        <main className="flex items-center justify-center h-screen">
            <div className="flex flex-col p-10 gap-5 bg-white shadow-lg rounded-lg">
                <div className="flex items-center  gap-8">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold">
                            Edit this link
                        </h1>

                        <Description>Customize settings of your Short URL</Description>
                    </div>

                    <button className="ml-auto" onClick={() => navigate('/account/links')}>
                        <VscClose size={25}/>
                    </button>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <TextInput label="Destination URL" value={destinationURL} placeholder="https://example.com/mylink" onChange={handleDestinationURLChange}/>
                    <TextInput label="Short URL" value={"orb.it/" + shortURL} onChange={handleShortURLChange}/>

                    <hr className="rounded-full bg-neutral-200"/>

                    <OptionalField label="Release Date" checked={releaseDateEnabled} value={releaseDate} type="datetime-local" onToggle={handleReleaseDateToggle} onValueChange={handleReleaseDateChange}/>
                    <OptionalField label="Expiration Date" checked={expirationDateEnabled} value={expirationDate} type="datetime-local" onToggle={handleExpirationDateToggle} onValueChange={handleExpirationDateChange}/>
                    <OptionalField placeholder="Enter password to allow user to acces the link" label="Password Restriction" checked={passwordProtectionEnabled} value={password} type="password" onToggle={handlePasswordRestrictionToggle} onValueChange={handlePasswordChange}/>

                    <ErrorMessage>{globalError}</ErrorMessage>

                    <PrimaryButton>
                        Save
                    </PrimaryButton>
                </form>
            </div>
        </main>
    );
};

export default EditLinkModal;