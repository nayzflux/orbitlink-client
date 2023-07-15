
// eslint-disable-next-line react/prop-types
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const IconLink = ({icon: Icon, href}) => {
    return (
        <Link to={href} className="p-2 rounded-full hover:bg-neutral-300 bg-opacity-30 text-center">
            <Icon size={25}/>
        </Link>
    );
};

export default IconLink;