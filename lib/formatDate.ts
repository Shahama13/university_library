
export const formatDate = (date: Date | string | null) => {
    if (!date) return "—";
    const d = new Date(date);
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
    return `${month} ${d.getDate()} ${d.getFullYear()}`;
};