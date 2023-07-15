import {useEffect, useState} from 'react';
import {VscClose} from "react-icons/vsc";
import Description from "../text/Description.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteLink, fetchLink} from "../../utils/api.js";
import DangerButton from "../DangerButton.jsx";
import ErrorMessage from "../forms/ErrorMessage.jsx";
import toast from "react-hot-toast";

const DeleteLinkModal = () => {
    const params = useParams();
    const _id = params._id;

    const [destinationURL, setDestinationURL] = useState("");
    const [shortURL, setShortURL] = useState(params.shortURL);

    const [globalError, setGlobalError] = useState('');

    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    /**
     * Fetch & Update
     */

    useEffect(() => {
        fetchLink(_id)
            .then(link => {
                const { shortURL, destinationURL} = link;

                setShortURL(shortURL);
                setDestinationURL(destinationURL);
            }).catch(res => {
            if (res.status === 401) {
                toast.error("You need to be logged in")
                return navigate('/account/login')
            }

            if (res.status === 400) {
                toast.error("Unable to create link")
                return setGlobalError(res.data.message)
            }

            if (res.status === 403) {
                toast.error("You're not allowed to view this link")
                return navigate('/account/links')
            }

            if (res.status === 404) {
                toast.error("This link doesn't exists");
                return navigate('/account/links')
            }

            toast.error("Unable to create link")
        });
    }, [_id]);

    const handleDelete = (e) =>  {
        e.preventDefault();

        setDeleting(true)

        deleteLink(_id)
            .then(link => {
                toast.success("Link deleted");
                setDeleting(false)
                navigate('/account/links');
            }).catch(res => {
            setDeleting(false)

            if (res.status === 401) {
                toast.error("You need to be logged in")
                return navigate('/account/login')
            }

            if (res.status === 400) {
                toast.error("Unable to create link")
                return setGlobalError(res.data.message)
            }

            if (res.status === 403) {
                toast.error("You're not allowed to view this link")
                return navigate('/account/links')
            }

            if (res.status === 404) {
                toast.error("This link doesn't exists");
                return navigate('/account/links')
            }

            toast.error("Unable to create link")
        });
    }

    return (
        <main className="flex items-center justify-center h-screen">
            <div className="flex flex-col p-10 gap-5 bg-white shadow-lg rounded-lg">
                <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold">
                            Delete this link
                        </h1>

                        <Description>Delete orb.it/{shortURL}</Description>
                    </div>

                    <button className="ml-auto" onClick={() => navigate('/account/links')}>
                        <VscClose size={25}/>
                    </button>
                </div>

                <div className='flex flex-col gap-5 items-center'>
                    <p className="font-semibold text-xl">
                        ⚠️ Are you sure you want to delete this link?
                    </p>

                    <ErrorMessage>{globalError}</ErrorMessage>

                    <div className="flex flex-row gap-4 items-center">
                        <Link to="/account/links" className="text-blue-600 hover:underline cursor-pointer">
                            Cancel
                        </Link>

                        <DangerButton onClick={handleDelete}>
                            Delete
                        </DangerButton>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DeleteLinkModal;