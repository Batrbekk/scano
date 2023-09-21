import React from "react";

interface Props {
  positive: number,
  negative: number,
  neutral: number
}

export const InlineChart: React.FC<Props> = ({positive, neutral, negative}) => {
  const total = positive + neutral + negative;

  const positivePercent = (positive * 100) / total;
  const neutralPercent = (neutral * 100) / total;
  const negativePercent = (negative * 100) /total;

  return (
    <div className="flex items-center gap-x-0.5 w-20">
      <div className={`${total === 0 ? 'bg-gray-300' : 'bg-[#60CA23]'} h-0.5 positive`} />
      <div className={`${total === 0 ? 'bg-gray-300' : 'bg-[#4779d0]'} h-0.5 neutral`} />
      <div className={`${total === 0 ? 'bg-gray-300' : 'bg-[#cf6662]'} h-0.5 negative`} />
      <style jsx>
        {`
          .positive {
            width: ${total === 0 ? '33.3' : positivePercent}%;
          }
          .neutral {
            width: ${total === 0 ? '33.3' : neutralPercent}%;
          }
          .negative {
            width: ${total === 0 ? '33.3' : negativePercent}%;
          }
        `}
      </style>
    </div>
  )
}

export default InlineChart;
