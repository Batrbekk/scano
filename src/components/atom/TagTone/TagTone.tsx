import Image from "next/image";
import Download from "@public/assets/icons/download.svg";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {Spinner} from "@nextui-org/spinner";
import React, {useEffect, useRef, useState} from "react";
import HighchartsReact from "highcharts-react-official";
import {getCookie} from "cookies-next";
import {socialChart} from "@/types/charts";
import exporting from "highcharts/modules/exporting";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

export const TagTone = () => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const id = getCookie('currentTheme');
  const token = getCookie('scano_acess_token');
  const [pending, setPending] = useState<boolean>(false);
  const [countries, setCountries] = useState<ReadonlyArray<socialChart>>([]);

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

  const getChart = async () => {
    try {
      setPending(true);
      const res = await fetch(
        `https://test.scano.kz/api/v1/themes/${id}/analytics/authors_gender`,
        {
          method: 'GET', // Assuming you are sending a POST request
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setCountries(data);
        setPending(false);
      } else {
        setPending(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getChart();
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
            name: 'Негатив',
            y: 32,
            color: '#cf6662'
          },
          {
            name: 'Позитив',
            y: 53,
            color: '#8fc145'
          },
          {
            name: 'Нейтрально',
            y: 11,
            color: '#b5b9c4'
          }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="font-['Work Sans',sans-serif] text-black  prose-lg font-semibold">Тональность по тегам</p>
        <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center"
                onClick={downloadChart}>
          <Image src={Download} alt="icon" width={24} height={24}/>
        </button>
      </div>
      <PieChart highcharts={Highcharts} ref={chartComponentRef} options={options}/>
    </div>
  )
}

export default TagTone;
