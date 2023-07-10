import {BiSearch} from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const LinkFilter = ({onChange}) => {
    return (
        <div className="p-3 rounded outline outline-neutral-300 outline-1 flex gap-3 items-center">
            <BiSearch/>
            <input onChange={onChange} className="outline-none" placeholder="Search your link..."/>
        </div>
    );
};

export default LinkFilter;