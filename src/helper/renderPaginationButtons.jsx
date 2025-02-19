import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const renderPaginationButtons = (currentPage, setCurrentPage, filteredExpenses, totalPages) => {
    const buttons = [];
    const maxVisiblePages = 5;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Previous button
    buttons.push(
        <Button
            key="prev"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
            <ChevronLeft className="h-4 w-4" />
        </Button>
    );

    // Calculate visible page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
        buttons.push(
            <Button
                key={1}
                variant={currentPage === 1 ? "default" : "ghost"}
                size="icon"
                className={`h-8 w-8 ${currentPage === 1 ? 'bg-darkorange hover:bg-darkerorange' : 'hover:bg-darkorange'}`}
                onClick={() => handlePageChange(1)}
            >
                1
            </Button>
        );
        if (startPage > 2) {
            buttons.push(<span key="ellipsis1" className="px-2">...</span>);
        }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        buttons.push(
            <Button
                key={i}
                variant={currentPage === i ? "default" : "ghost"}
                size="icon"
                className={`h-8 w-8 ${currentPage === i ? 'bg-darkorange hover:bg-darkerorange' : 'hover:bg-darkorange'}`}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </Button>
        );
    }

    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            buttons.push(<span key="ellipsis2" className="px-2">...</span>);
        }
        buttons.push(
            <Button
                key={totalPages}
                variant={currentPage === totalPages ? "default" : "ghost"}
                size="icon"
                className={`h-8 w-8 ${currentPage === totalPages ? 'bg-darkorange hover:bg-darkerorange' : 'hover:bg-darkorange'}`}
                onClick={() => handlePageChange(totalPages)}
            >
                {totalPages}
            </Button>
        );
    }

    // Next button
    buttons.push(
        <Button
            key="next"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            <ChevronRight className="h-4 w-4" />
        </Button>
    );

    return buttons;
};

export default renderPaginationButtons;