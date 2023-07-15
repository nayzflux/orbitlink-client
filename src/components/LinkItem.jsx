import {AiOutlineBarChart, AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import IconLink from "./IconLink.jsx";
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const LinkItem = ({imageSrc, shortURL, destinationURL, _id}) => {
    return (
        <div className="flex rounded flex-row gap-4 px-4 py-2 items-center shadow cursor-pointer">
            <img className={"w-12 h-12 " + imageSrc && "hidden"} alt="Link image" src={imageSrc}/>

            <div className="flex flex-col gap-1">
                <Link className="text-blue-600 underline" to={"localhost:5000/"+shortURL}>orb.it/{shortURL}</Link>
                <p className="text-neutral-800">{destinationURL}</p>
            </div>

            <div className="ml-auto flex flex-row items-center gap-3">
                <IconLink href={`/account/links/${_id}/statistics`} icon={AiOutlineBarChart}/>
                <IconLink href={`/account/links/${_id}/edit`} icon={AiOutlineEdit}/>
                <IconLink href={`/account/links/${_id}/delete`} icon={AiOutlineDelete}/>
            </div>
        </div>
    );
};

export default LinkItem;