import BarChart from "highcharts-react-official";
import Image from "next/image";
import Download from "@public/assets/icons/download.svg";
import Highcharts from "highcharts/highstock";
import React, {useEffect, useRef, useState} from "react";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import {getCookie} from "cookies-next";
import {socialChart} from "@/types/charts";
import {Spinner} from "@nextui-org/spinner";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

const BarBlock = () => {
  const id = getCookie('currentTheme');
  const token = getCookie('scano_acess_token');
  const [pending, setPending] = useState<boolean>(false);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [ages, setAges] = useState<ReadonlyArray<socialChart>>([]);
  const [agesName, setAgesName] = useState<ReadonlyArray<string>>([]);
  const [agesData, setAgesData] = useState<ReadonlyArray<number>>([]);

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
        `https://test.scano.kz/api/v1/themes/${id}/analytics/authors_age`,
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
        console.log(data);
        setAges(data);
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

  useEffect(() => {
    if (ages.length > 0) {
      setAgesName(ages.map((item) => item.name));
      setAgesData(ages.map((item) => item.y));
    }
  }, [ages]);

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
      categories: agesName,
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
        data: agesData,
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
      {ages.length > 0 ? (
        <BarChart highcharts={Highcharts} ref={chartComponentRef} options={options} />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center">
          {pending ? (
            <Spinner color="success" size="sm" />
          ) : (
            <div>
              <p>
                Данных нету
              </p>
            </div>
          )}
        </div>
      )}
      <p className="text-sm text-gray-500">Данные по возрасту имеются для 7.9% авторов темы</p>
    </div>
  )
}

export default BarBlock;
