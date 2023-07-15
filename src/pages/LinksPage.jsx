import {useEffect} from 'react';
import PageTitle from "../components/PageTitle.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import LinkItem from "../components/LinkItem.jsx";
import LinkFilter from "../components/LinkFilter.jsx";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import linkListState from "../atoms/linkListAtom.js";
import {fetchAllLinks} from "../utils/api.js";
import Header from "../components/headers/Header.jsx";
import toast from "react-hot-toast";

const LinksPage = () => {
    const navigate = useNavigate();
    const [linkList, setLinkList] = useRecoilState(linkListState);

    useEffect(() => {
        fetchAllLinks()
            .then(links => {
                setLinkList(links)
            }).catch(res => {
                if (res.status === 401) {
                    toast.error("You need to be logged in")
                    return navigate('/account/login')
                }

                toast.error("Failed to display all your links");
        })
    }, [setLinkList]);


    return (
        <>
            <Header/>

            <main className="mt-8 px-6 space-y-8 h-full">
                <PageTitle title="My Links">
                    <PrimaryButton onClick={() => navigate('/account/links/create')}>Create new link</PrimaryButton>
                </PageTitle>

                <div className="flex flex-col gap-8">
                    <LinkFilter/>

                    <div className="flex flex-col gap-6 p-2">
                        {
                            linkList?.map(item => {
                                return (
                                    <LinkItem key={item.shortURL} {...item}/>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
        </>
    );
};

export default LinksPage;