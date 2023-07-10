import {useEffect} from 'react';
import PageTitle from "../components/PageTitle.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import LinkItem from "../components/LinkItem.jsx";
import LinkFilter from "../components/LinkFilter.jsx";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import linkListState from "../atoms/linkListAtom.js";
import {fetchAllLinks} from "../utils/api.js";

const LinksPage = () => {
    const navigate = useNavigate();
    const [linkList, setLinkList] = useRecoilState(linkListState);

    useEffect(() => {
        console.log("start fetching")
        fetchAllLinks()
            .then(links => {
                console.log("link fetched")
                setLinkList(links)
            })
    }, [setLinkList]);


    return (
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
    );
};

export default LinksPage;