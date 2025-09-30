import type { FC } from "react"
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
import type { PricePoint } from "../utils/chainLinkFeeds"

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
    history: PricePoint[];
    tokenSymbol: string;
}

const ChartComponent: FC<ChartComponentProps> = ({ history, tokenSymbol }) => {
  const labels = history.map((point) => new Date(point.timestamp).toLocaleTimeString());
  const data = {
    labels,
    datasets: [
      {
        label: `${tokenSymbol} Price (USD)`,
        data: history.map((point) => point.price),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${tokenSymbol} Price Trend`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default ChartComponent;