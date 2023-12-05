"use client";
import { Button } from "@/components/ui/button";
import { groupTableData } from "@/lib/dummy-data";
import DataTable, { TableColumn } from "react-data-table-component";
import { Search, Plus } from "lucide-react";
import EyeIcon from "../../../../../../public/icons/eye";
import EditIcon from "../../../../../../public/icons/edit";
import { customStyles } from "@/lib/customTableStyles";
import InviteMembers from "./invite-members";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import CreateEvent from "@/components/events/create-event-popup";

const GroupTable = () => {
    const columns: TableColumn<any>[] = [
        {
            name: "Name",
            cell: (row: any) => <div>{row.name}</div>,
        },
        {
            name: "Gender",
            cell: (row: any) => <div>{row.gender}</div>,
        },
        {
            name: "Email Address",
            width: "18rem",
            cell: (row: any) => <div>{row.email}</div>,
        },
        {
            name: "Date Joined",
            cell: (row: any) => <div>{row.date}</div>,
        },

        {
            name: "Actions",
            cell: (row) => (
                <div className="flex items-center gap-4">
                    <EyeIcon onClick={() => {}} />
                    <EditIcon onClick={() => {}} />
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between gap-10 items-start sm:items-center mb-10 flex-wrap">
                <h1 className="font-bold text-[1.4rem]">Members</h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 ">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button type="button" size={"formLg"}>
                                <Plus size={20} />
                                <p className="ml-2">Add Member</p>
                            </Button>
                        </DialogTrigger>
                        <InviteMembers />
                    </Dialog>
                    <div style={{ position: "relative" }}>
                        <input
                            type="search"
                            placeholder="Search members"
                            style={{
                                border: "2px solid #d9d9d9",
                                padding: ".45rem",
                                borderRadius: ".5rem",
                                paddingLeft: "2rem",
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
                </div>
            </div>
            <DataTable
                columns={columns}
                data={groupTableData}
                pagination={false}
                customStyles={customStyles}
                selectableRows
                highlightOnHover
            />
            <hr />
        </div>
    );
};

export default GroupTable;
