import { Select } from "antd";

type YearSelectorProps = {
    startDate: string;
    value: string;
    onChange: (newYear: string) => void;
};

function getYearOptions(startDate: string) {
    const result: { label: string; value: string }[] = [];
    for (let year = parseInt(startDate); year <= new Date().getFullYear(); year++) {
        result.push({ label: year.toString(), value: year.toString() });
    }
    return result;
}

const YearSelector = ({ startDate, value, onChange }: YearSelectorProps) => {
    let options = getYearOptions(startDate);
    options = options.reverse();

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

export default YearSelector;