import { type FC, useState } from "react"
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { useHistoricalData } from "../hooks/useHistoricalData";
import type { Token } from "../utils/chainLinkFeeds";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps{
    token: Token;
    apiKey?: string;
}

const ChartComponent: FC<ChartComponentProps> = ({ token, apiKey }) => {
  const [timeRange, setTimeRange] = useState<'2d' | '7d' | '30d'>('2d');
  const days = timeRange === '2d' ? 2 : timeRange === '7d' ? 7 : 30;
  
  const { data: historical, isLoading, error, refetch } = useHistoricalData({ token, days, apiKey });

  if (isLoading) return <div className="bg-gray-800 p-4 rounded-lg text-white">Loading chart...</div>;
  if (error){
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-red-500">
        Error loading chart: {error.message}
        {error.message.includes('Rate limited') && (
          <button
            onClick={() => refetch()}
            className="mt-2 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            Retry in 1 min
          </button>
        )}
      </div>
    );
  }

  const now= Date.now();
  const rangeMs = timeRange === '2d' ? 2 * 24 * 60 * 60 * 1000 : timeRange === '7d' ? 7 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
  const filteredPrices = historical?.prices.filter(([Timestamp])=> now-Timestamp <=rangeMs) || [];

  const maxLabels=10;
  const step=Math.max(1, Math.floor(filteredPrices.length/maxLabels));
  const labels = filteredPrices
    .filter((_, index) => index % step === 0)
    .map(([timestamp]) =>
      new Date(timestamp).toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
      })
    );

  const prices = filteredPrices.filter((_, index) => index % step === 0).map(([, price]) => price);
  const data = {
    labels,
    datasets: [
      {
        label: `${token.symbol} Price (USD)`,
        data: prices,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: window.innerWidth < 640 ? 12 : 14,
          },
          color: '#fff',
        },
      },
      title: {
        display: true,
        text: `${token.name} Price - Last ${timeRange === '2d' ? '2 Days' : timeRange === '7d' ? '7 Days' : '30 Days'}`,
        color: '#fff',
        font:{
          size: window.innerWidth < 640 ? 14 : 16,
        }
      },
      tooltip: {
        bodyFont: { size: window.innerWidth < 640 ? 10 : 12 },
        titleFont: { size: window.innerWidth < 640 ? 12 : 14 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
          maxRotation: 45,
          minRotation: 45,
          font: { size: window.innerWidth < 640 ? 10 : 12 },
        },
      },
      y: {
        ticks: {
          color: '#fff',
          font: { size: window.innerWidth < 640 ? 10 : 12 },
        },
        title: {
          display: true,
          text: 'Price (USD)',
          color: '#fff',
          font: { size: window.innerWidth < 640 ? 12 : 14 },
        },
      },
    },
    layout: {
      padding: window.innerWidth < 640 ? 10 : 20,
    },
  };

  return(
    <div className="bg-gray-800 p-2 sm:p-4 rounded-lg shadow w-full max-w-full">
      <div className="mb-2 sm:mb-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <h2 className="text-base sm:text-xl font-semibold text-white">{token.symbol} Price Chart</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as '2d' | '7d' | '30d')}
          className="bg-gray-700 text-white text-sm sm:text-base rounded p-2 sm:p-2.5 w-full sm:w-auto max-w-[150px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="2d">2 Days</option>
          <option value="7d">7 Days</option>
          <option value="30d">30 Days</option>
        </select>
      </div>
      <div className="relative h-[250px] sm:h-[400px]">
        <Line data={data} options={options} />
      </div>
      <p className="text-gray-400 text-xs sm:text-sm mt-2 text-center">
        {filteredPrices.length} data points from CoinGecko API
      </p>
    </div>
  );
};

export default ChartComponent;