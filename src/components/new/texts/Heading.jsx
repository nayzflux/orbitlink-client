// eslint-disable-next-line react/prop-types
const Heading = ({children, className}) => {
    return (
        <h1 className={"font-bold text-4xl " + className}>
            {children}
        </h1>
    );
};

export default Heading;
