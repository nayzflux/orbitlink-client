import {useEffect, useState} from 'react';
import {VscClose} from "react-icons/vsc";
import Description from "../text/Description.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteLink, fetchLink} from "../../utils/api.js";
import DangerButton from "../DangerButton.jsx";
import ErrorMessage from "../forms/ErrorMessage.jsx";

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
            }).catch(code => {
            if (code === 401) {
                return alert('Not logged!')
            }

            if (code === 403) {
                return alert('Not allowed!')
            }

            if (code === 404) {
                return alert('Not found!')
            }

            return alert('Unknown error')
        });
    }, [_id]);

    const handleDelete = (e) =>  {
        e.preventDefault();

        setDeleting(true)

        deleteLink(_id)
            .then(link => {
                setDeleting(false)
                navigate('/account/links');
            }).catch(code => {
            setDeleting(false)
            setGlobalError('Unknow error')
        });
    }

    return (
        <div className="flex flex-col p-10 gap-5">
            <div className="flex items-center">
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

                <div className="flex flex-row gap-4">
                    <Link to="/account/links" className="text-blue-600 hover:underline cursor-pointer">
                        Cancel
                    </Link>

                    <DangerButton onClick={handleDelete}>
                        Delete
                    </DangerButton>
                </div>
            </div>
        </div>
    );
};

export default DeleteLinkModal;