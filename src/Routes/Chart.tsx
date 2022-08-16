import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../fetchers";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Chart = () => {
  const coinId = useOutletContext() as string;
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="line"
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: {
                show: false,
                datetimeFormatter: {
                  month: "mmm 'yy",
                },
              },
              type: "datetime",
              categories:
                data?.map(({ time_close }) => new Date(time_close)) || [],
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
          }}
          series={[
            {
              name: "close",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
        />
      )}
    </div>
  );
};

export default Chart;
