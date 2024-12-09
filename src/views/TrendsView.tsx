import { useState, useEffect } from "react";
import { categoriasInverso } from "../../public/categorias";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

interface HistoryElement {
    searchTerm: string;
    date: Date;
    imagePath: string;
    category: string;
}

function parseTrends(data: any) {
    const trends: { [key: string]: HistoryElement[] } = {};
    Object.keys(data).forEach((key: string) => {
        data[key].forEach((element: HistoryElement) => {
            if (!trends[element.searchTerm]) {
                trends[element.searchTerm] = [element];
            } else {
                trends[element.searchTerm].push(element);
            }
        });
    });
    return trends;
}

function getTrendsByTimeRange(trends: { [key: string]: HistoryElement[] }, timeRange: string) {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let filteredTrends: { [key: string]: HistoryElement[] } = {};

    if (timeRange === "week") {
        filteredTrends = Object.keys(trends).reduce((acc, key) => {
            const filtered = trends[key].filter((element: HistoryElement) => {
                return new Date(element.date) >= lastWeek;
            });
            if (filtered.length > 0) {
                acc[key] = filtered;
            }
            return acc;
        }, {} as { [key: string]: HistoryElement[] });
    } else if (timeRange === "month") {
        filteredTrends = Object.keys(trends).reduce((acc, key) => {
            const filtered = trends[key].filter((element: HistoryElement) => {
                return new Date(element.date) >= lastMonth;
            });
            if (filtered.length > 0) {
                acc[key] = filtered;
            }
            return acc;
        }, {} as { [key: string]: HistoryElement[] });
    } else {
        filteredTrends = trends;
    }

    return Object.keys(filteredTrends)
        .sort((a, b) => filteredTrends[b].length - filteredTrends[a].length)
        .slice(0, 10)
        .reduce((acc, key) => {
            acc[key] = filteredTrends[key];
            return acc;
        }, {} as { [key: string]: HistoryElement[] });
}

function TrendsView() {
    const [trends, setTrends] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [timeRange, setTimeRange] = useState("week");
    const { setProductName, setCategoria, setFile } = useAppContext();
    const navigate = useNavigate();

    const handleClick = async (historyElement: HistoryElement) => {
        setProductName(historyElement.searchTerm);
        setCategoria(categoriasInverso[historyElement.category]);
        console.log("categorias inverso", categoriasInverso[historyElement.category]);
        try {
            const response = await fetch(historyElement.imagePath);
            const blob = await response.blob();
            setFile(blob);
            navigate("/product");
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    useEffect(() => {
        const fetchTrends = async () => {
            setLoading(true);
            fetch(`./searchHistory.json`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setTrends(parseTrends(data));
                    console.log("Trends data", trends);
                    console.log("Trends by time range", getTrendsByTimeRange(trends, timeRange));
                    setLoading(false);
                });
        }

        fetchTrends();
    }, []);

    return (
        <div className="flex flex-col p-5 font-sans min-h-screen mt-10 items-center">
            <h1 className="text-center text-gray-800 mb-5 text-2xl font-semibold">Tendencias</h1>
            <div className="flex flex-col justify-center mb-5 gap-6">
                <div className="flex flex-row justify-center items-center">
                    <button
                        onClick={() => setTimeRange("week")}
                        className={`px-4 py-2 mx-2 ${timeRange === "week" ? "bg-blue-500" : "bg-gray-600"} text-white border-none rounded-lg cursor-pointer transition-colors duration-300`}
                    >
                        Última semana
                    </button>
                    <button
                        onClick={() => setTimeRange("month")}
                        className={`px-4 py-2 mx-2 ${timeRange === "month" ? "bg-blue-500" : "bg-gray-600"} text-white border-none rounded-lg cursor-pointer transition-colors duration-300`}
                    >
                        Último mes
                    </button>
                </div>
                {loading ? (
                    <p className="text-center text-gray-600">Cargando...</p>
                ) : (
                    <ul className="flex flex-col list-none justify-center items-start px-4">
                        {trends && Object.keys(getTrendsByTimeRange(trends, timeRange)).map((key: string, index: number) => (
                            <li key={index} className="mb-2">
                                <h2
                                    className="text-gray-800 cursor-pointer"
                                    onClick={() => handleClick(trends[key][0])}
                                >
                                    {key} ({getTrendsByTimeRange(trends, timeRange)[key].length})
                                </h2>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
}

export default TrendsView;
