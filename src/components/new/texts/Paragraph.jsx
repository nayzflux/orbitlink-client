// eslint-disable-next-line react/prop-types
const Paragraph = ({children, className}) => {
    return (
        <p className={"font-medium text-neutral-500 max-w-[560px] " + className}>
            {children}
        </p>
    );
};

export default Paragraph;
