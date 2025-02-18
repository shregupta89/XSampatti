export const getDate=(date)=>{
    const today = new Date();

  // Get the current month and year
  const currentMonth = today.getMonth(); // Months are 0-indexed (0 = January)
  const currentYear = today.getFullYear();
  
  // Create a new date using the current month and year, and the given day
  const customDate = new Date(currentYear, currentMonth, date).toISOString().split('T')[0];
  return customDate
}