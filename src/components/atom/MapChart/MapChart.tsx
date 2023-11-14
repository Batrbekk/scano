import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import mapData from "@/mock/mapData";
import Image from "next/image";
import Download from "@public/assets/icons/download.svg";

require('highcharts/modules/map')(Highcharts);

export const MapChart = () => {

  const mapOptions = {
    title: {
      text: ''
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
      mapData: mapData,
      dataLabels: {},
      name: 'Norway',
      data: [
        ['no-mr', 0],
        ['no-st', 1],
        ['no-ho', 2],
        ['no-sf', 42],
        ['no-va', 4],
        ['no-of', 5],
        ['no-nt', 6],
        ['no-ro', 7],
        ['no-bu', 8],
        ['no-vf', 9],
        ['no-fi', 10],
        ['no-no', 11],
        ['no-tr', 12],
        ['no-ak', 13],
        ['no-op', 14],
        ['no-he', 15],
        ['no-os', 16],
        ['no-te', 17],
        ['no-aa', 18]
      ]
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
          <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center">
            <Image src={Download} alt="icon" width={24} height={24} />
          </button>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'mapChart'}
          options={mapOptions}
        />
      </div>
    </div>
  )
}

export default MapChart;
