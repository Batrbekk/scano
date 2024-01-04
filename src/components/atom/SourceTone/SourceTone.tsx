import React, {useEffect, useRef, useState} from "react";
import HighchartsReact from "highcharts-react-official";
import Image from "next/image";
import Download from "@public/assets/icons/download.svg";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import exporting from "highcharts/modules/exporting";
import Select from "@/components/atom/Select";
import {Mode} from "@/types";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

export const SourceTone = () => {
  const optionsSelect = [
    {
      label: 'Telegram.org"',
      key: {
        data: [
          {
            name: 'Негатив',
            y: 12,
            color: '#cf6662'
          },
          {
            name: 'Позитив',
            y: 33,
            color: '#8fc145'
          },
          {
            name: 'Нейтрально',
            y: 41,
            color: '#b5b9c4'
          }
        ]
      }
    },
    {
      label: 'Qaz365.kz',
      key: {
        data: [
          {
            name: 'Негатив',
            y: 18,
            color: '#cf6662'
          },
          {
            name: 'Позитив',
            y: 87,
            color: '#8fc145'
          },
          {
            name: 'Нейтрально',
            y: 14,
            color: '#b5b9c4'
          }
        ]
      }
    },
    {
      label: 'instagram.com',
      key: {
        data: [
          {
            name: 'Негатив',
            y: 22,
            color: '#cf6662'
          },
          {
            name: 'Позитив',
            y: 63,
            color: '#8fc145'
          },
          {
            name: 'Нейтрально',
            y: 14,
            color: '#b5b9c4'
          }
        ]
      }
    },
    {
      label: 'facebook.com',
      key: {
        data: [
          {
            name: 'Негатив',
            y: 12,
            color: '#cf6662'
          },
          {
            name: 'Позитив',
            y: 51,
            color: '#8fc145'
          },
          {
            name: 'Нейтрально',
            y: 8,
            color: '#b5b9c4'
          }
        ]
      }
    },
    {
      label: 'twitter.com',
      key: {
        data: [
          {
            name: 'Негатив',
            y: 82,
            color: '#cf6662'
          },
          {
            name: 'Позитив',
            y: 43,
            color: '#8fc145'
          },
          {
            name: 'Нейтрально',
            y: 91,
            color: '#b5b9c4'
          }
        ]
      }
    }
  ];

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const [selectedSource, setSelectedSource] = useState(optionsSelect[0]);

  const handleSelectChange = (value: Mode) => {
    setSelectedSource(value);
  };

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
      text: selectedSource.label,
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
    series: [selectedSource.key]
  };

  return (
    <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="font-['Work Sans',sans-serif] text-black  prose-lg font-semibold">Тональность по источникам</p>
        <div className="flex items-center gap-x-2">
          <Select options={optionsSelect} value={selectedSource} onChange={handleSelectChange} />
          <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center"
                  onClick={downloadChart}>
            <Image src={Download} alt="icon" width={24} height={24}/>
          </button>
        </div>
      </div>
      <PieChart highcharts={Highcharts} ref={chartComponentRef} options={options}/>
    </div>
  )
}

export default SourceTone;
