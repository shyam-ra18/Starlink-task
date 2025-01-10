import React from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";

interface PaginationProps {
    currentPage: number,
    perPageData: number,
    totalRecord: number,
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, perPageData, totalRecord, onPageChange }) => {
    const totalPages = Math.ceil(totalRecord / perPageData);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page)
        }
    }

    return (
        <div className="flex items-center gap-2">
            {/* First Page Button */}
            <button
                className="p-1.5 rounded-full hover:bg-midpurple transition-colors disabled:cursor-not-allowed"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
            >
                <FiChevronsLeft className="w-5 h-5 hover:text-white text-darkblue" />
            </button>

            {/* Previous Page Button */}
            <button
                className="p-2 rounded-full hover:bg-midpurple transition-colors disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaChevronLeft className="w-5 h-5 hover:text-white text-darkblue" />
            </button>

            <span className="text-sm text-darkblue">
                Page {currentPage} of {totalPages}
            </span>

            {/* Next Page Button */}
            <button
                className="p-2 rounded-full hover:bg-midpurple transition-colors disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight className="w-5 h-5 hover:text-white text-darkblue" />
            </button>

            {/* Last Page Button */}
            <button
                className="p-1.5 rounded-full hover:bg-midpurple transition-colors disabled:cursor-not-allowed"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                <FiChevronsRight className="w-5 h-5 hover:text-white text-darkblue" />
            </button>
        </div>
    )
}

export default Pagination