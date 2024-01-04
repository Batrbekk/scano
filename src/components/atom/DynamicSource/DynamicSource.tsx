import React, {useRef} from "react";
import HighchartsReact from "highcharts-react-official";
import Image from "next/image";
import Download from "@public/assets/icons/download.svg";
import LineChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import exporting from "highcharts/modules/exporting";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

export const DynamicSource = () => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

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
    title: {
      text: '',
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    series: [
      {
        name: 'telegram.org',
        data: [43934, 48656, 65165, 81827, 112143, 142383,
          171533, 165174, 155157, 161454, 154610]
      },
      {
        name: 'twitter.com',
        data: [24916, 37941, 29742, 29851, 32490, 30282,
          38121, 36885, 33726, 34243, 31050]
      },
      {
        name: 'facebook.com',
        data: [11744, 30000, 16005, 19771, 20185, 24377,
          32147, 30912, 29243, 29213, 25663]
      },
      {
        name: 'qaz365.kz',
        data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
          17300, 13053, 11906, 10073]
      }
    ],
  }

  return (
    <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="font-['Work Sans',sans-serif] text-black  prose-lg font-semibold">Динамика по источникам</p>
        <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center" onClick={downloadChart}>
          <Image src={Download} alt="icon" width={24} height={24} />
        </button>
      </div>
      <LineChart
        highcharts={Highcharts} ref={chartComponentRef} options={options}
      />
    </div>
  )
}

export default DynamicSource;
