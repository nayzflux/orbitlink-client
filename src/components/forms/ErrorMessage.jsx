import {BiErrorCircle} from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const ErrorMessage = ({children}) => {
    return (
        children ?
            <div className="flex gap-1 items-center p-1 rounded outline outline-red-500 outline-1 text-red-500 font-semibold">
                <BiErrorCircle size={20}/>

                <p>{children}</p>
            </div> : null
    );
};

export default ErrorMessage;