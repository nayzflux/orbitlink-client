import {useEffect, useState} from 'react';
import {VscClose} from "react-icons/vsc";
import Description from "../text/Description.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {fetchLink} from "../../utils/api.js";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import SelectDataTypeButton from "../SelectDataTypeButton.jsx";
import ErrorMessage from "../forms/ErrorMessage.jsx";
import Loading from "../Loading.jsx";
import toast from "react-hot-toast";

const EditLinkModal = () => {
    const params = useParams();
    const _id = params._id;

    const [clickNumber, setClickNumber] = useState(0);

    const [clickData, setClickData] = useState([]);

    const [countryData, setCountryData] = useState([
        {y: 34 , name: 'France'},
        {y: 24 , name: 'Allemagne'},
        {y: 20 , name: 'Italie'},
        {y: 13 , name: 'Etats-Unis'},
        {y: 5 , name: 'Algérie'},
    ]);
    const [cityData, setCityData] = useState([
        {y: 6 , name: 'Lyon'},
        {y: 10 , name: 'Paris'},
        {y: 8 , name: 'Marseille'},
        {y: 24 , name: 'Berlin'},
        {y: 20 , name: 'Rome'},
        {y: 13 , name: 'Washington'},
        {y: 5 , name: 'Alger'},
    ]);

    const [locationSelector, setLocationSelector] = useState('COUNTRY');

    const [deviceData, setDeviceData] = useState([
        {y: (46+20) , name: 'Desktop'},
        {y: (38 + 23) , name: 'Mobile'},
    ]);
    const [browserData, setBrowserData] =  useState([
        {y: 67 , name: 'Chrome'},
        {y: 23 , name: 'Firefox'},
        {y: 17 , name: 'Safari'},
    ]);
    const [osData, setOsData] = useState([
        {y: 46 , name: 'Windows'},
        {y: 38 , name: 'Android'},
        {y: 23 , name: 'iOS'},
        {y: 20 , name: 'MacOS'},
    ]);

    const [deviceSelector, setDeviceSelector] = useState('BROWSER');

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    /**
     * Fetch
     */

    useEffect(() => {
        fetchLink(_id)
            .then(link => {
                const clicks = link.statistics.clicks;

                console.log(clicks)

                // Créer un objet pour compter le nombre de clics par jour
                const clickCountByDay = {};

                const clickCountByCountry = {};
                const clickCountByCity = {};

                const clickCountByOs = {};
                const clickCountByBrowser = {};
                const clickCountByDevice = {};

                // Parcourir les objets click et compter les clics pour chaque jour
                for (const click of clicks) {
                    const date = new Date(click.createdAt).toISOString().split('T')[0]; // Extraire la date au format 'YYYY-MM-DD'

                    const country = click.country || 'N/A';
                    const city = click.city || 'N/A';

                    const os = click.os || 'N/A';
                    const device = click.device || 'N/A';
                    const browser = click.browser || 'N/A';

                    if (clickCountByDay[date]) {
                        clickCountByDay[date]++;
                    } else {
                        clickCountByDay[date] = 1;
                    }

                    if (clickCountByCountry[country]) {
                        clickCountByCountry[country]++;
                    } else {
                        clickCountByCountry[country] = 1;
                    }

                    if (clickCountByCity[city]) {
                        clickCountByCity[city]++;
                    } else {
                        clickCountByCity[city] = 1;
                    }

                    if (clickCountByBrowser[browser]) {
                        clickCountByBrowser[browser]++;
                    } else {
                        clickCountByBrowser[browser] = 1;
                    }

                    if (clickCountByDevice[device]) {
                        clickCountByDevice[device]++;
                    } else {
                        clickCountByDevice[device] = 1;
                    }

                    if (clickCountByOs[os]) {
                        clickCountByOs[os]++;
                    } else {
                        clickCountByOs[os] = 1;
                    }
                }

                setClickNumber(link.statistics.clickNumber)

                const cD = Object.keys(clickCountByDay).sort((a, b) => {
                    return new Date(a).getTime() - new Date(b).getTime()
                }).map(key => {
                    console.log(key)
                    return (
                        {name: new Date(key), click: clickCountByDay[key]}
                    )
                });

                const countryD = Object.keys(clickCountByCountry).map(key => {
                    console.log(key)
                    return (
                        {name: key, click: clickCountByCountry[key]}
                    )
                });

                const cityD = Object.keys(clickCountByCity).map(key => {
                    console.log(key)
                    return (
                        {name: key, click: clickCountByCity[key]}
                    )
                });

                const deviceD = Object.keys(clickCountByDevice).map(key => {
                    console.log(key)
                    return (
                        {name: key, click: clickCountByDevice[key]}
                    )
                });

                const browserD = Object.keys(clickCountByBrowser).map(key => {
                    console.log(key)
                    return (
                        {name: key, click: clickCountByBrowser[key]}
                    )
                });

                const osD = Object.keys(clickCountByOs).map(key => {
                    console.log(key)
                    return (
                        {name: key, click: clickCountByOs[key]}
                    )
                });

                setClickData(cD)

                setDeviceData(deviceD.sort((a, b) => a.click > b.click));
                setOsData(osD.sort((a, b) => a.click > b.click));
                setBrowserData(browserD.sort((a, b) => a.click > b.click));

                setCityData(cityD.sort((a, b) => a.click > b.click));
                setCountryData(countryD.sort((a, b) => a.click > b.click));

                setLoading(false)
            }).catch(code => {
            if (code === 401) {
                toast.error("You're not logged")
                return navigate('/account/login')
            }

            if (code === 403) {
                toast.error("You're not allowed to view this link")
                return navigate('/account/links')
            }

            if (code === 404) {
                toast.error("This link doesn't exists");
                return navigate('/account/links')
            }

            toast.error("Unable to fetch link");
        });
    }, [_id]);

    const getLocationData = () => {
        if (locationSelector === "COUNTRY") {
            return countryData;
        }

        if (locationSelector === "CITY") {
            return cityData;
        }
    }

    const getDeviceData = () => {
        if (deviceSelector === "DEVICE") {
            return deviceData;
        }

        if (deviceSelector === "OS") {
            return osData;
        }

        if (deviceSelector === "BROWSER") {
            return browserData;
        }
    }

    return (
        <main className="flex items-center justify-center h-full">
            <div className="flex flex-col p-10 gap-5 bg-white shadow-lg rounded-lg w-full">
            <div className="flex items-center gap-8">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">
                        Statistics
                    </h1>

                    <Description>See and analyze your links statistics</Description>
                </div>

                <button className="ml-auto" onClick={() => navigate('/account/links')}>
                    <VscClose size={25}/>
                </button>
            </div>

            <div className="gap-4 grid grid-cols-1">
                <div className="p-4 rounded shadow space-y-4">
                    <div>
                        <h2 className="text-4xl font-semibold">
                            {clickNumber}
                        </h2>

                        <h1 className="text-2xl uppercase">
                            Total Clicks
                        </h1>
                    </div>

                    <div className="w-full h-80">
                        {
                            clickData.length > 0 ? <ResponsiveContainer>
                                <LineChart data={clickData} margin={{ top: 5, right: 30, left: 20, bottom: 5}}>
                                    <Line overlineThickness={20} dataKey="click" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer> : <div className="flex items-center justify-center w-full h-full">
                                {
                                    loading ? <Loading/> : <ErrorMessage>There's no data to display</ErrorMessage>
                                }
                            </div>
                        }
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded shadow space-y-4">
                        <div className="flex">
                            <h1 className="text-2xl font-semibold">
                                Locations
                            </h1>

                            <div className="flex gap-2 ml-auto">
                                <SelectDataTypeButton onClick={() => setLocationSelector("CITY")} active={locationSelector === "CITY"}>City</SelectDataTypeButton>
                                <SelectDataTypeButton onClick={() => setLocationSelector("COUNTRY")} active={locationSelector === "COUNTRY"}>Country</SelectDataTypeButton>
                            </div>
                        </div>

                        <div className="w-full h-80">
                            {
                                getLocationData().length > 0 ? <ResponsiveContainer>
                                        <BarChart data={getLocationData()} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                                            <CartesianGrid stroke="#ccc"/>
                                            <Bar label={{ position: 'top'}} fillOpacity={0.6} fill="blue" maxBarSize={20} dataKey="click" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip cursor={{ fillOpacity: 0.1 }}/>
                                        </BarChart>
                                    </ResponsiveContainer> : <div className="flex items-center justify-center w-full h-full"><ErrorMessage>There's no data to display</ErrorMessage></div>
                            }
                        </div>
                    </div>

                    <div className="p-4 rounded shadow space-y-4">
                        <div className="flex">
                            <h1 className="text-2xl font-semibold">
                                Devices
                            </h1>

                            <div className="flex gap-2 ml-auto ">
                                <SelectDataTypeButton onClick={() => setDeviceSelector("DEVICE")} active={deviceSelector === "DEVICE"}>Device</SelectDataTypeButton>
                                <SelectDataTypeButton onClick={() => setDeviceSelector("OS")} active={deviceSelector === "OS"}>Os</SelectDataTypeButton>
                                <SelectDataTypeButton onClick={() => setDeviceSelector("BROWSER")} active={deviceSelector === "BROWSER"}>Browser</SelectDataTypeButton>
                            </div>
                        </div>

                        <div className="w-full h-80">
                            {
                                getDeviceData().length >= 1 ? <ResponsiveContainer>
                                    <BarChart data={getDeviceData()} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                                        <CartesianGrid stroke="#ccc"/>
                                        <Bar label={{ position: 'top'}} fillOpacity={0.6} fill="green" maxBarSize={20} dataKey="click" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip cursor={{ fillOpacity: 0.1 }}/>
                                    </BarChart>
                                </ResponsiveContainer> : <div className="flex items-center justify-center w-full h-full"><ErrorMessage>There's no data to display</ErrorMessage></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </main>
    );
};

export default EditLinkModal;