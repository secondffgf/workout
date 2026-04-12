import { Select } from "antd";

type WeekSelectorProps = {
    startDate: string;
    onChange: (newWeek: string) => void;
};

function formatDate(date: Date, includeYear = false) {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    if (includeYear) {
        const y = date.getFullYear().toString().slice(-2);
        return `${d}.${m}.${y}`;
    } else {
        return `${d}.${m}`;
    }
}

function getWeekRangesFrom(startDate: string) {
    const result: { value: string; label: string }[] = [];
    const currentYear = new Date().getFullYear();
    const today = new Date();
    // Clone startDate and set to start of the week (Monday)
    let start = new Date(startDate);
    // Adjust to Monday: getDay() returns 0 (Sun) to 6 (Sat)
    let day = start.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day; // Sunday treated as 7th day
    start.setDate(start.getDate() + diffToMonday);
    start.setHours(0, 0, 0, 0);
    while (start <= today) {
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();
        const includeYear = (startYear !== currentYear) || (endYear !== currentYear);
        const formattedStart = formatDate(start, includeYear);
        const formattedEnd = formatDate(end, includeYear);
        let week = `${formattedStart} - ${formattedEnd}`
        result.push({ value: formattedStart, label: week });
        start.setDate(start.getDate() + 7);
    }
    return result;
}

const WeekSelector = ({ startDate, onChange }: WeekSelectorProps) => {
    let options = getWeekRangesFrom(startDate);
    options = options.reverse();
    const currentWeek = options[0].value;

    return (
        <div className="mb-4 mt-16 flex justify-center">
            <Select
                style={{ width: 220 }}
                options={options}
                defaultValue={currentWeek}
                onChange={(value) => onChange(value)}
                
            />
        </div>
    )
}

export default WeekSelector;