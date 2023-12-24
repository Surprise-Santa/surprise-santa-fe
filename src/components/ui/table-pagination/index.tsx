import { ChevronRight, ChevronLeft } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PropType {
    totalCount: number;
    handlePreviousLoad: () => void;
    handleNextLoad: () => void;
    nextLoad?: string;
    previous?: string;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const TablePagination = ({
    totalCount,
    handlePreviousLoad,
    handleNextLoad,
    previous,
    nextLoad,
    count,
    setCount,
    filters,
    setFilters,
}: PropType) => {
    const pageSizes = [10, 20, 30, 40, 50, 100];
    return (
        <div className="flex font-light my-4 items-center justify-end gap-8">
            <div className="flex gap-4 items-center">
                <p className="text-xs w-full">Rows per page: </p>
                <Select
                    onValueChange={(value) => {
                        setFilters((prevState: any) => {
                            const { cursor, ...otherPrevState } = prevState;
                            return {
                                ...otherPrevState,
                                size: Number(value),
                            };
                        });
                    }}
                    defaultValue={filters?.size?.toString()}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {pageSizes?.map((size) => (
                                <SelectItem
                                    key={size}
                                    value={size.toString()}
                                    style={{ cursor: "pointer" }}
                                >
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-6 items-center">
                <p className="text-xs">
                    {count === 0 ? count + 1 : count * filters?.size + 1} -{" "}
                    {count * filters?.size + filters?.size > totalCount
                        ? totalCount
                        : count * filters?.size + filters?.size}{" "}
                    of {totalCount}
                </p>
                <div className="flex gap-2">
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full outline-none ${
                            count < 1 ? "cursor-not-allowed" : "cursor-pointer"
                        }}`}
                        onClick={() => {
                            if (count < 1 || !previous) return;
                            handlePreviousLoad();
                            setCount((_count) => _count - 1);
                        }}
                    >
                        <ChevronLeft
                            color={!previous ? "#9FA2B4" : "#6B7280"}
                            style={{ pointerEvents: !previous ? "none" : "auto" }}
                        />
                    </div>
                    <div
                        className={`flex items-center justify-center rounded-full outline-none h-8 w-8 ${
                            count * filters?.size > totalCount || !nextLoad
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                        }`}
                        onClick={() => {
                            if (count + filters?.size > totalCount || !nextLoad) return;
                            handleNextLoad();
                            setCount((_count) => _count + 1);
                        }}
                    >
                        <ChevronRight
                            style={{ pointerEvents: !nextLoad ? "none" : "auto" }}
                            color={!nextLoad ? "#9FA2B4" : "#6B7280"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TablePagination;
