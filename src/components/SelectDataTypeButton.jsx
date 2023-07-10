
// eslint-disable-next-line react/prop-types
const SelectDataTypeButton = ({active, onClick, children}) => {
    return (
        <button type="button" onClick={onClick} className={`px-2 py-1 rounded hover:bg-purple-500 hover:opacity-70 hover:text-white transition ${active ? "bg-purple-500 text-white": "bg-neutral-100"}`}>{children}</button>

    );
};

export default SelectDataTypeButton;
