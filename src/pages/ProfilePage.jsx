import {useEffect, useState} from 'react';
import PageTitle from "../components/PageTitle.jsx";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import { fetchUser, updateUser} from "../utils/api.js";
import TextInput from "../components/TextInput.jsx";
import userState from "../atoms/userAtom.js";
import toast from "react-hot-toast";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Header from "../components/headers/Header.jsx";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        fetchUser('@me')
            .then(user => {
                setUser(user);
            }).catch(res => {
            if (res.status === 401) {
                toast.error("You need to be logged in")
                return navigate('/account/login')
            }

            toast.error("Failed to display your profile settings")
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username !== "" && email !== "") {
            updateUser('@me', { username, email})
                .then(user => {
                    setUser(user);
                    toast.success("Profile updated")
                }).catch(res => {
                if (res.status === 401) {
                    toast.error("You need to be logged in")
                    return navigate('/account/login')
                }

                if (res.status === 400) {
                    return toast.error(res.data.message);
                }

                toast.error("Failed to update your profile");
            })

            return;
        }

        if (email !== "") {
            updateUser('@me', { email})
                .then(user => {
                    setUser(user);
                    toast.success("Profile updated")
                }).catch(res => {
                if (res.status === 401) {
                    toast.error("You need to be logged in")
                    return navigate('/account/login')
                }

                if (res.status === 400) {
                    return toast.error(res.data.message);
                }

                toast.error("Failed to update your profile");
            })

            return;
        }

        if (username !== "") {
            updateUser('@me', { username})
                .then(user => {
                    setUser(user);
                    toast.success("Profile updated")
                }).catch(res => {
                if (res.status === 401) {
                    toast.error("You need to be logged in")
                    return navigate('/account/login')
                }

                if (res.status === 400) {
                    return toast.error(res.data.message);
                }

                toast.error("Failed to update your profile");
            })

            return;
        }
    }

    return (
        <>
            <Header/>

            <main className="mt-8 px-6 space-y-8 h-full">
                <PageTitle title="My Profile"/>

                <div className="flex flex-col gap-8">
                    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                        <TextInput type="text" label="Email" placeholder={user?.email} value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <TextInput type="text" label="Username" placeholder={user?.username} value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <TextInput type="text" label="Bio" placeholder="Your description" value={bio} onChange={(e) => setBio(e.target.value)}/>
                        <PrimaryButton>
                            Save
                        </PrimaryButton>
                    </form>
                </div>
            </main>
        </>
    );
};

export default ProfilePage;