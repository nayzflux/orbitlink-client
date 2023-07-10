
// eslint-disable-next-line react/prop-types
const OptionalField = ({type, placeholder, value, label, checked, onToggle, onValueChange}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex">
                <label>{label}</label>
                <input checked={checked} className="ml-auto" type="checkbox" onChange={onToggle}/>
            </div>

            {checked && <input value={value} className={"p-2 rounded outline outline-neutral-300 outline-1"} type={type}
                    placeholder={placeholder} onChange={onValueChange}/>}
        </div>
    );
};

export default OptionalField;