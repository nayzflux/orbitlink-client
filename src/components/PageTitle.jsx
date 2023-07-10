
// eslint-disable-next-line react/prop-types
const PageTitle = ({title, children}) => {
    return (
        <div className="flex items-center">
            <h2 className="font-semibold text-2xl">
                {title}
            </h2>

            {children}
        </div>
    );
};

export default PageTitle;