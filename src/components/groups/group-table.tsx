"use client";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";

import { customStyles } from "@/lib/customTableStyles";
import { convertDateFormat, reformData } from "@/lib/utils";
import { useGetGroupMembers } from "@/services/queries/groups";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useDebounce } from "use-debounce";
import EyeIcon from "../../../public/icons/eye";
import ViewMemberDetails from "./view-member-modal";
import LoadingSpinner from "@/components/ui/spinner";
import InviteMembers from "./invite-members-modal";

interface Props {
    groupId: any;
}

const GroupTable = ({ groupId }: Props) => {
    const [memberDetails, setMemberDetails] = useState({});
    const [filters, setFilters] = useState<any>({});
    const [debouncedTerm] = useDebounce(filters.term, 500);
    const [selectedPageSize, setSelectedPageSize] = useState(10);
    const [open, setOpen] = useState(false);

    const {
        data: membersData,
        isLoading: membersLoading,
        isSuccess: memberSuccess,
    } = useGetGroupMembers(groupId as string, {
        ...(debouncedTerm && { term: debouncedTerm }),
        ...{ ...filters, size: selectedPageSize },
    });

    const memoizedData = useMemo(() => {
        if (memberSuccess) return reformData(membersData);
        return [];
    }, [membersData, memberSuccess]);

    const columns: TableColumn<any>[] = [
        {
            name: "Name",
            cell: (row: any) => (
                <div>
                    {row.user?.firstName} {row.user?.lastName}
                </div>
            ),
        },
        {
            name: "Gender",
            cell: (row: any) => <div>{row.user?.gender ?? "N/A"}</div>,
        },
        {
            name: "Email",
            width: "18rem",
            cell: (row: any) => <div>{row.user?.email ?? "N/A"}</div>,
        },
        {
            name: "Phone",
            width: "18rem",
            cell: (row: any) => <div>{row.user?.phone ?? "N/A"}</div>,
        },
        {
            name: "Date Joined",
            cell: (row: any) => <div>{convertDateFormat(row.user?.createdAt)}</div>,
        },

        {
            name: "Actions",
            center: true,
            cell: (row) => (
                <div className="flex items-center gap-4 cursor-pointer">
                    <Dialog>
                        <DialogTrigger asChild>
                            <EyeIcon
                                onClick={() => {
                                    setMemberDetails(row);
                                }}
                            />
                        </DialogTrigger>
                        <ViewMemberDetails memberDetails={memberDetails} />
                    </Dialog>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1 className="font-bold text-[1.4rem]">Members</h1>
            <div className="flex justify-between gap-10  my-10  flex-wrap">
                <div style={{ position: "relative" }}>
                    <input
                        type="search"
                        placeholder="Search"
                        style={{
                            border: "2px solid #d9d9d9",
                            padding: ".45rem",
                            borderRadius: ".5rem",
                            paddingLeft: "2rem",
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            //   setCount(0);
                            setFilters((prevState: any) => {
                                const { cursor, ...otherPrevState } = prevState;
                                return {
                                    ...otherPrevState,
                                    term: e.target.value,
                                };
                            });
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            left: "0.5rem",
                        }}
                    >
                        <Search size={20} color="#c4c3c3" />{" "}
                    </div>
                </div>
                <div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button type="button" size={"formLg"}>
                                <Plus size={20} />
                                <p className="ml-2">Add Member</p>
                            </Button>
                        </DialogTrigger>
                        <InviteMembers setOpen={setOpen} groupId={groupId} />
                    </Dialog>
                </div>
            </div>
            {membersLoading ? (
                <div className="flex items-center justify-center mt-10">
                    <LoadingSpinner />
                </div>
            ) : (
                <div>
                    <DataTable
                        columns={columns}
                        data={memoizedData}
                        pagination={false}
                        customStyles={customStyles}
                        highlightOnHover
                    />

                    <hr />
                </div>
            )}
        </div>
    );
};

export default GroupTable;
