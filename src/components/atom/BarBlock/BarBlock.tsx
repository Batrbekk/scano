import BarChart from "highcharts-react-official";
import Image from "next/image";
import Download from "@public/assets/icons/download.svg";
import Highcharts from "highcharts/highstock";
import React, {useEffect, useRef} from "react";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

const BarBlock = () => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    // Update the chart after the component mounts to ensure the exporting module is available
    if (chartComponentRef.current) {
      chartComponentRef.current.chart.update({
        exporting: {
          enabled: true,
        },
      });
    }
  }, []);

  const downloadChart = () => {
    const chart = chartComponentRef.current?.chart;

    if (chart) {
      // Use exportChart method with required chart options
      chart.exportChart({
        type: 'image/png',
        filename: 'chart',
      }, {
        chart: {
          backgroundColor: '#ffffff',
        },
      });
    }
  };

  const options = {
    chart: {
      type: 'bar',
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: ['До 18 лет', '18-24 лет', '25-34 лет', '35-44 лет', '45-54 лет', '55 и старше'],
      title: {
        text: null,
      },
      gridLineWidth: 1,
      lineWidth: 0,
    },
    yAxis: {
      title: ''
    },
    series: [
      {
        data: [21, 25, 13, 52, 34, 97],
        colorByPoint: true, // Each bar will have a different color
      },
    ],
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'], // Set custom colors for each category
    legend: {
      enabled: false, // Disable legend
    },
  }

  return (
    <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="font-['Work Sans',sans-serif] text-black  prose-lg font-semibold">Возраст авторов</p>
        <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center" onClick={downloadChart}>
          <Image src={Download} alt="icon" width={24} height={24} />
        </button>
      </div>
      <BarChart highcharts={Highcharts} ref={chartComponentRef} options={options} />
      <p className="text-sm text-gray-500">Данные по возрасту имеются для 7.9% авторов темы</p>
    </div>
  )
}

export default BarBlock;
