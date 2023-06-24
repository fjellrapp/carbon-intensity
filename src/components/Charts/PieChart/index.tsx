import useIsMobile from "@/utils/hooks/useIsMobile";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

type Props = {
  /** The data for the pie chart. Must be an array of objects. Each object must have a key of dataKey */
  data: any[];
  /** The key for the data. Must be a string */
  dataKey: string;
};

/**
 * PieChartSimple component
 * @param param0
 * @returns JSX.Element
 */

export default function PieChartSimple({ data, dataKey }: Props) {
  const isMobile = useIsMobile();
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active: boolean | undefined;
    payload: any;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-12 bg-gray-100 rounded-md opacity-75 ">
          <div className="flex flex-col">
            <strong>{payload[0].payload.fuel}</strong>
            <p>{payload[0].payload.perc}%</p>
          </div>
        </div>
      );
    }
    return null;
  };
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FF00FF",
  ];
  return (
    <div className="w-full  h-[300px] md:h-[500px] flex items-center justify-center py-12">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey={dataKey}
            data={data}
            alignmentBaseline="middle"
            outerRadius={isMobile ? 60 : 170}
            innerRadius={isMobile ? 50 : 120}
            paddingAngle={8}
            fill="#82ca9d"
            label={(props) => `${props.fuel} (${props.perc})`}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            content={({ active, payload }) => (
              <CustomTooltip active={active} payload={payload} />
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
