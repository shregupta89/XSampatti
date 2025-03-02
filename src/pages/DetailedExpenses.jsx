// import React, { useState, useContext } from 'react';
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import PaginatedExpenses from '@/components/PaginatedExpenses';
// import { ExpenseContext } from "@/context/ExpenseContext";
// import { CategorySelector } from '@/components/SelectByCategory';

// const DetailedExpenses = () => {
//     const [date, setDate] = useState();
//     const [selectedCategories, setSelectedCategories] = useState([]);

//     const handleCategoryToggle = (category) => {
//         setSelectedCategories(prev => 
//             prev.includes(category)
//                 ? prev.filter(c => c !== category)
//                 : [...prev, category]
//         );
//     };

//     return (
//         <div className="h-screen max-h-screen overflow-hidden">
//             <div className="h-[calc(100vh-4rem)] p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div className="md:col-span-1 flex flex-col gap-4 max-h-full">
//                     <Card className="flex-none">
//                         <CardHeader>
//                             <CardTitle className="text-xl font-bold">Select by Date Range</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <Calendar
//                                 mode="single"
//                                 selected={date}
//                                 onSelect={setDate}
//                                 className="rounded-md border"
//                                 modifiersClassNames={{
//                                     selected: "bg-darkorange hover:bg-darkerorange text-white",
//                                     today: "text-darkorange font-bold"
//                                 }}
//                                 modifiersStyles={{
//                                     selected: {
//                                         fontWeight: "bold"
//                                     }
//                                 }}
//                             />
//                         </CardContent>
//                     </Card>
                    
//                     <div className="flex-1 h-fit">
//                         <CategorySelector 
//                             selectedCategories={selectedCategories}
//                             onCategoryToggle={handleCategoryToggle}
//                         />
//                     </div>
//                 </div>

//                 <div className="md:col-span-3 h-full">
//                     <PaginatedExpenses 
//                         selectedDate={date}
//                         selectedCategories={selectedCategories}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DetailedExpenses;
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaginatedExpenses from '@/components/PaginatedExpenses';
import { CategorySelector } from '@/components/SelectByCategory';
import { ScrollArea } from '@/components/ui/scroll-area';

const DetailedExpenses = () => {
    const [date, setDate] = useState();
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className="h-screen max-h-screen overflow-hidden p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
                
                {/* Left Panel */}
                <ScrollArea className="md:col-span-1 flex flex-col gap-4 max-h-full">
                    <Card className="flex-none">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Select by Date Range</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                                modifiersClassNames={{
                                    selected: "bg-darkorange hover:bg-darkerorange text-white",
                                    today: "text-darkorange font-bold"
                                }}
                                modifiersStyles={{
                                    selected: { fontWeight: "bold" }
                                }}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex-1 overflow-auto">
                        <CategorySelector 
                            selectedCategories={selectedCategories}
                            onCategoryToggle={handleCategoryToggle}
                        />
                    </div>
                </ScrollArea>

                {/* Right Panel: Paginated Expenses */}
                <div className="md:col-span-3 flex flex-col h-full overflow-y-auto">
                    <PaginatedExpenses 
                        selectedDate={date}
                        selectedCategories={selectedCategories}
                    />
                </div>

            </div>
        </div>
    );
};

export default DetailedExpenses;
