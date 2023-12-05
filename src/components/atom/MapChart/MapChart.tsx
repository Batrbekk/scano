import React, {useEffect, useRef, useState} from 'react'
import HighchartsReact from 'highcharts-react-official'
import Image from "next/image";
import Download from "@public/assets/icons/download.svg";
import Highcharts from "highcharts/highmaps";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import exporting from 'highcharts/modules/exporting';
import {getCookie} from "cookies-next";
import {socialChart} from "@/types/charts";
import PieChart from "highcharts-react-official";
import {Spinner} from "@nextui-org/spinner";

if (typeof Highcharts === 'object') {
  exporting(Highcharts);
}

export const MapChart = () => {
  const id = getCookie('currentTheme');
  const token = getCookie('scano_acess_token');
  const [pending, setPending] = useState<boolean>(false);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [countries, setCountries] = useState<ReadonlyArray<socialChart>>([]);
  const [massiveCountries, setMassiveCountries] = useState<Array<[string, number]>>([]);

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
        `https://scano-0df0b7c835bf.herokuapp.com/api/v1/themes/${id}/analytics/countries`,
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

  useEffect(() => {
    if (countries.length > 0) {
      setMassiveCountries(countries.map((item) => [item.name, item.y]));
    }
  }, [countries]);

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

  const mapOptions = {
    title: {
      text: ''
    },
    chart: {
      map: worldMap,
      height: 600,
      events: {
        load: function() {
          // @ts-ignore
          this.series[0].data[74].zoomTo();
        }
      }
    },
    navigation: {
      buttonOptions: {
        enabled: false,
      },
    },
    colorAxis: {
      min: 0,
      stops: [
        [0, '#EFEFFF'],
        [0.67, '#4444FF'],
        [1, '#000022']
      ]
    },
    tooltip: {},
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'top'
      }
    },
    series: [{
      name: "Random data",
      states: {
        hover: {
          color: "#BADA55"
        }
      },
      dataLabels: {
        enabled: true,
        format: "{point.name}"
      },
      data: [massiveCountries]
    }]
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="font-['Work Sans',sans-serif] text-[#35415A] prose prose-2xl font-semibold">География</p>
      </div>
      <div className="flex flex-col gap-y-8 bg-white rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-1/2">
            <p className="text-sm text-gray-500">Отчет предоставлен только по тем авторам, для которых есть данные по местоположению.</p>
            <p className="text-sm text-gray-500">Страна: 44.07% от всех авторов темы; город: 32.81%;</p>
          </div>
          <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center" onClick={downloadChart}>
            <Image src={Download} alt="icon" width={24} height={24} />
          </button>
        </div>
        {countries.length > 0 ? (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'mapChart'}
            options={mapOptions}
            ref={chartComponentRef}
          />
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
      </div>
    </div>
  )
}

export default MapChart;
