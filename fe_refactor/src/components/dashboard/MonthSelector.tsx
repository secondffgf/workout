import { useLoaderData } from "react-router-dom";

const MonthSelector = ({ startDate, onChange}: { startDate: string; onChange: (newMonth: string) => void }) => {
    const data = useLoaderData();
    return <div>Select Month Component</div>;
};

export default MonthSelector;