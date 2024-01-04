import React, {useEffect, useRef, useState} from "react";
import HighchartsReact from "highcharts-react-official";
import {getCookie} from "cookies-next";
import {socialChart} from "@/types/charts";
import Image from "next/image";
import Download from "@public/assets/icons/download.svg";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import exporting from "highcharts/modules/exporting";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

export const SourceMessageBlock = () => {
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
    plotOptions: {
      pie: {
        innerSize: 150
      },
      series: {
        cursor: 'pointer',
        showInLegend: true,
        dataLabels: [{
          enabled: false,
          distance: 20
        }, {
          enabled: true,
          distance: -40,
          format: '{point.percentage:.1f}%',
          style: {
            color: '#fff',
            fontSize: '16px',
            textOutline: 'none',
            opacity: 1
          },
          filter: {
            operator: '>',
            property: 'percentage',
            value: 10
          }
        }]
      }
    },
    series: [
      {
        data: [
          {
            name: 'telegram.org',
            y: 32,
          },
          {
            name: 'twitter.com',
            y: 53,
          },
          {
            name: 'facebook.com',
            y: 21,
          },
          {
            name: 'qaz365.kz',
            y: 64
          },
          {
            name: 'instagram.com',
            y: 89
          }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="font-['Work Sans',sans-serif] text-black  prose-lg font-semibold">Сообщений по источникам</p>
        <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center"
                onClick={downloadChart}>
          <Image src={Download} alt="icon" width={24} height={24}/>
        </button>
      </div>
      <PieChart highcharts={Highcharts} ref={chartComponentRef} options={options}/>
    </div>
  )
}

export default SourceMessageBlock;
