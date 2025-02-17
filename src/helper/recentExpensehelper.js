// export const trimToRecent10 = (expenses) => {
//     if (!Array.isArray(expenses)) return [];

//     return [...expenses]
//         .filter(expense => expense.date)  // Ensure expense has a date
//         .sort((a, b) => new Date(b.date) - new Date(a.date))  // Sort by date (newest first)
//         .slice(0, 10);  // Keep only the top 10
// };