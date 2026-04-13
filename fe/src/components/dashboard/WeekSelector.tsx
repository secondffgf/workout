import { Select } from "antd";
import type { WeekSelectOption } from "@/types";

type WeekSelectorProps = {
  options: WeekSelectOption[];
  value: string;
  onChange: (newWeek: string) => void;
};

const WeekSelector = ({ options, value, onChange }: WeekSelectorProps) => {
  return (
    <div className="mb-4 mt-16 flex justify-center">
      <Select
        style={{ width: 220 }}
        options={options}
        value={value}
        onChange={(v) => onChange(v)}
      />
    </div>
  );
};

export default WeekSelector;
