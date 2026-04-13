import { Select } from "antd";

type MonthSelectorProps = {
    startDate: string;
    value: string;
    onChange: (newMonth: string) => void;
};

const formatMonthLabel = (date: Date) =>
    new Intl.DateTimeFormat("en", {
        month: "long",
        year: "numeric",
    }).format(date);

const formatMonthValue = (date: Date) =>
    new Intl.DateTimeFormat("en", {
        month: "short",
        year: "numeric",
    }).format(date);

const getMonthOptions = (startDate: string) => {
    const fallbackStart = new Date();
    const parsedStart = new Date(startDate);
    const validStart = Number.isNaN(parsedStart.getTime()) ? fallbackStart : parsedStart;

    const start = new Date(validStart.getFullYear(), validStart.getMonth(), 1);
    const end = new Date();
    const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);

    const options: { label: string; value: string }[] = [];
    const cursor = new Date(start);

    while (cursor <= endMonth) {
        const label = formatMonthLabel(cursor);
        const value = formatMonthValue(cursor);
        options.push({
            label,
            value,
        });
        cursor.setMonth(cursor.getMonth() + 1);
    }

    return options.reverse();
};

const MonthSelector = ({ startDate, value, onChange }: MonthSelectorProps) => {
    const options = getMonthOptions(startDate);

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

export default MonthSelector;