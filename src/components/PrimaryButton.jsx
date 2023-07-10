
// eslint-disable-next-line react/prop-types
const PrimaryButton = ({children, onClick}) => {
    return (
        <button onClick={onClick} className="px-3 py-1.5 ml-auto rounded bg-purple-800 text-white hover:opacity-70 transition-all duration-500 ease-out">
            {children}
        </button>
    );
};

export default PrimaryButton;