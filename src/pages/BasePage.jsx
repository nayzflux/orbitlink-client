import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchDestinationURL} from "../utils/api.js";
import {BiPlanet} from "react-icons/bi";
import TextInput from "../components/TextInput.jsx";
import ErrorMessage from "../components/forms/ErrorMessage.jsx";

const BasePage = () => {
    const params = useParams();
    const {shortURL} = params;

    const [isPasswordRequired, setIsPasswordRequired] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        fetchDestinationURL(shortURL, password)
            .then(data => {
                setIsLoading(false)
                window.location.replace(data.destinationURL);
            }).catch(res => {
                setIsLoading(false)

                // Si aucun mot de passe n'est fourni
                if (res.status === 401) {
                    return setIsPasswordRequired(true);
                }

                // Si le mot de passe fourni est faux
                if (res.status === 403) {
                    return setIsPasswordRequired(true);
                }

                if (res.status === 400) {
                    setNotFound(true);
                    return setError(res.data.message)
                }

                if (res.status === 404) {
                    setNotFound(true);
                    return setError(res.data.message)
                }

                setNotFound(true);
        });
    }, [shortURL]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isPasswordRequired) return;

        setIsLoading(true);

        if (password === '') {
            setIsLoading(false)
            return setError('Password is required')
        }

        fetchDestinationURL(shortURL, password)
            .then(data => {
                window.location.replace(data.destinationURL);
            }).catch(res => {
                setIsLoading(false);

                // Si aucun mot de passe n'est fourni
                if (res.status === 401) {
                    setIsPasswordRequired(true);
                    return setError('Password is required')
                }

                // Si le mot de passe fourni est faux
                if (res.status === 403) {
                    setIsPasswordRequired(true);
                    return setError('Password does not match')
                }

                if (res.status === 400) {
                    setNotFound(true);
                    return setError(res.data.message)
                }

                if (res.status === 404) {
                    setNotFound(true);
                    return setError(res.data.message)
                }

                setNotFound(true);
        });
    }

    const handleChange = (e) => {
        e.preventDefault();

        setError('');

        if (e.target.value === '') setError('Password is required');

        setPassword(e.target.value);
    }

    if (notFound) {
        return (
            <main className="flex justify-center items-center h-screen w-screen">
                <div className="p-5 rounded-lg bg-white shadow-lg flex items-center flex-col gap-3">
                    <div className="flex gap-1 items-center">
                        <BiPlanet size={36}/>
                        <h1 className="uppercase text-2xl font-bold">Orbit</h1>
                    </div>

                    <ErrorMessage>{error}</ErrorMessage>
                </div>
            </main>
        )
    }

    if (isPasswordRequired) {
        return (
            <main className="flex justify-center items-center h-screen w-screen">
                <div className="p-5 rounded-lg bg-white shadow-lg flex items-center flex-col gap-3">
                    <div className="flex gap-1 items-center">
                        <BiPlanet size={36}/>
                        <h1 className="uppercase text-2xl font-bold">Orbit</h1>
                    </div>

                    <p className="font-semibold">Password is required to access this Short Link</p>

                    <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
                        <TextInput onChange={handleChange} value={password} disabled={isLoading} type="password" placeholder="Enter link's password"/>
                        <ErrorMessage>{error}</ErrorMessage>
                        <button disabled={isLoading} className="transition py-2 px-4 text-white bg-black rounded hover:opacity-90 hover:shadow uppercase disabled:cursor-not-allowed disabled:opacity-60">View</button>
                        <p className="text-xs text-neutral-400 ml-auto">Password set by short link owner</p>
                    </form>
                </div>
            </main>
        )
    }


    return (
        isLoading ? <p>
            Loading...
        </p> : <p>If you see this page, please report it on Github https://github.com/nayzflux/orbitlink-client</p>
    );
};

export default BasePage;
