import Image from "next/image";
import Download from "@public/assets/icons/download.svg";
import React, {useEffect, useRef} from "react";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import exporting from 'highcharts/modules/exporting';
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

const PieBlock = () => {
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
      type: "pie"
    },
    title: {
      text: '',
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    series: [
      {
        data: [
          {
            y: 100
          },
          {
            y: 50
          }
        ]
      }
    ]
  };

  return(
    <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="font-['Work Sans',sans-serif] text-black  prose-lg font-semibold">Страны</p>
        <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center" onClick={downloadChart}>
          <Image src={Download} alt="icon" width={24} height={24} />
        </button>
      </div>
      <PieChart highcharts={Highcharts} ref={chartComponentRef} options={options} />
    </div>
  )
}

export default PieBlock;
