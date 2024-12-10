import { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import { getTrends } from "../api/mercadoLibre";

interface HistoryElement {
    searchTerm: string;
    date: Date;
    imagePath: string;
    category: string;
    count: number;
}

function TrendsView() {
    const [trends, setTrends] = useState<any>({} as { [key: string]: HistoryElement[] });
    const [loading, setLoading] = useState(false);
    const [timeRange, setTimeRange] = useState("weekly");
    const [selectedTrendsByTimeRange, setSelectedTrendsByTimeRange] = useState<any>([]);
    const { setProductName, setCategoria, setCategoriaName, setBase64image } = useAppContext();
    const navigate = useNavigate();


    const handleClick = async (historyElement: any) => {
        setProductName(historyElement.searchTerm);
        setCategoria(historyElement.category.split("|")[0]);
        setCategoriaName(historyElement.category.split("|")[1]);
        try {

            // Create blob from base64 string
            setBase64image(historyElement.imagePath);
            navigate("/product");
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    useEffect(() => {
        const fetchTrends = async () => {
            setLoading(true);

            try {
                const response = await getTrends();
                setTrends(response["trends"]);
                setSelectedTrendsByTimeRange(response["trends"]["weekly"]);
                // setTrends(parseTrends(response));
                // console.log("Trends data", trends);
                // console.log("Trends by time range", getTrendsByTimeRange(trends, timeRange));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching trends:", error);
                setLoading(false);
            }
        };

        fetchTrends();
    }, []);

    useEffect(() => {
        console.log("Time range", timeRange);
        console.log("Trends", trends);
        let filteredTrends;
        if (timeRange === "weekly") {
            filteredTrends = trends["weekly"];
        }
        if (timeRange === "monthly") {
            filteredTrends = trends["monthly"];
        }
        console.log("Filtered trends", filteredTrends);
        setSelectedTrendsByTimeRange(filteredTrends);
    }, [timeRange, trends]);


    return (
        <div className="flex flex-col p-5 font-sans min-h-screen mt-10 items-center">
            <h1 className="text-center text-gray-800 mb-5 text-2xl font-semibold">Tendencias</h1>
            <div className="flex flex-col justify-center mb-5 gap-6">
                <div className="flex flex-row justify-center items-center">
                    <button
                        onClick={() => setTimeRange("weekly")}
                        className={`px-4 py-2 mx-2 ${timeRange === "weekly" ? "bg-blue-500" : "bg-gray-600"} text-white border-none rounded-lg cursor-pointer transition-colors duration-300`}
                    >
                        Última semana
                    </button>
                    <button
                        onClick={() => setTimeRange("monthly")}
                        className={`px-4 py-2 mx-2 ${timeRange === "monthly" ? "bg-blue-500" : "bg-gray-600"} text-white border-none rounded-lg cursor-pointer transition-colors duration-300`}
                    >
                        Último mes
                    </button>
                </div>
                {loading ? (
                    <p className="text-center text-gray-600">Cargando...</p>
                ) : (
                    <table className="table-auto w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Término de búsqueda</th>
                                <th className="px-4 py-2">Número de búsquedas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trends && selectedTrendsByTimeRange && selectedTrendsByTimeRange.map((element: HistoryElement, index: number) => (
                                <tr key={index} className="border-t">
                                    <td
                                        className="px-4 py-2 text-gray-800 cursor-pointer"
                                        onClick={() => handleClick(element)}
                                    >
                                        {element.searchTerm}
                                    </td>
                                    <td className="px-4 py-2">{element.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}
export default TrendsView;
