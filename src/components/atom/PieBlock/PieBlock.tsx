import Image from "next/image";
import Download from "@public/assets/icons/download.svg";
import React from "react";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

const PieBlock = () => {
  const options = {
    chart: {
      type: "pie"
    },
    title: {
      text: '',
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
        <button className="bg-[#ebf1fd] rounded w-[36px] h-[36px] flex items-center justify-center">
          <Image src={Download} alt="icon" width={24} height={24} />
        </button>
      </div>
      <PieChart highcharts={Highcharts} options={options} />
    </div>
  )
}

export default PieBlock;
