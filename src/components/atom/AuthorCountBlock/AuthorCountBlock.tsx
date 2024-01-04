import Image from "next/image";
import Download from "@public/assets/icons/download.svg";
import React, {useRef} from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import exporting from "highcharts/modules/exporting";
import LineChart from "highcharts-react-official";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

export const AuthorCountBlock = () => {
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
    series: [{
      name: 'Количество авторов',
      data: [43934, 48656, 65165, 81827, 112143, 142383,
        171533, 165174, 155157, 161454, 154610]
    }],
  }

  return (
    <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="font-['Work Sans',sans-serif] text-black  prose-lg font-semibold">Динамика по авторам</p>
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

export default AuthorCountBlock;
