
// eslint-disable-next-line react/prop-types
const TextInput = ({onChange, label, placeholder, value, type}) => {
    return (
        <div className="flex flex-col gap-1">
            <label>{label}</label>
            <input type={type} value={value} className="p-3 rounded outline outline-neutral-300 outline-1 flex gap-3 items-center" onChange={onChange} placeholder={placeholder}/>
        </div>
    );
};

export default TextInput;