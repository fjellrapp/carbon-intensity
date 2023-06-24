import useIsMobile from "@/utils/hooks/useIsMobile";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label,
} from "recharts";

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
    "#F3c560",
    "#00FFFF",
  ];
  return (
    <div className="w-full h-[350px] md:h-[550px] flex items-center justify-center py-12">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey={dataKey}
            data={data}
            aria-label="Generation Mix"
            outerRadius={isMobile ? 60 : 180}
            innerRadius={isMobile ? 50 : 160}
            paddingAngle={2}
            startAngle={0}
            endAngle={-350}
            lengthAdjust={2}
            label={(props) => `${props.fuel} (${props.perc})`}
          >
            <Label value="Generation Mix" position="center" />
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
