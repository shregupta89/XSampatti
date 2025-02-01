export const formatDate = (isoString) => {
    if (!isoString) return "Invalid Date";

    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};