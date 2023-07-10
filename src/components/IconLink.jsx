
// eslint-disable-next-line react/prop-types
const IconLink = ({icon: Icon, href}) => {
    return (
        <a href={href} className="p-2 rounded-full hover:bg-neutral-300 bg-opacity-30 text-center">
            <Icon size={25}/>
        </a>
    );
};

export default IconLink;