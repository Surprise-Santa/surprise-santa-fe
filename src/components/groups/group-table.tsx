"use client";

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { convertDateFormat } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import EyeIcon from "../../../public/icons/eye";
import InviteMembers from "./invite-members-modal";
import { useState } from "react";
import ViewMemberDetails from "./view-member-modal";
import JoinGroupModal from "./join-group-modal";

interface Props {
    data: any;
}

const GroupTable = ({ data }: Props) => {
    const [open, setOpen] = useState(false);
    const [memberDetails, setMemberDetails] = useState({});

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between gap-10 items-start sm:items-center mb-10 flex-wrap">
                <h1 className="font-bold text-[1.4rem]">Members</h1>
                <div className="flex flex-col sm:flex-row gap-4 ">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button type="button">
                                <Plus size={20} />
                                <p className="ml-2">Add Member</p>
                            </Button>
                        </DialogTrigger>
                        <InviteMembers data={data} setOpen={setOpen} />
                    </Dialog>
                    <Input type="text" placeholder="Search members" />
                </div>
            </div>

            {data?.members?.length ? (
                <Table className="mt-2">
                    <TableHeader>
                        <TableRow className="font-bold text-base mt-8 bg-[#C7E8CA]">
                            <TableHead>Name</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Email Address</TableHead>
                            <TableHead>Date Joined</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.members?.map((member: any) => (
                            <TableRow key={member.id} className="text-[1.1rem]">
                                <TableCell>
                                    {member?.user?.firstName} {member.user.lastName}
                                </TableCell>
                                <TableCell>{member?.user?.gender}</TableCell>
                                <TableCell>{member?.user?.email}</TableCell>
                                <TableCell> {convertDateFormat(member?.user?.createdAt)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4 cursor-pointer">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <EyeIcon
                                                    onClick={() => {
                                                        setMemberDetails(member);
                                                    }}
                                                />
                                            </DialogTrigger>
                                            <ViewMemberDetails memberDetails={memberDetails} />
                                        </Dialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="font-medium flex items-center justify-center py-10">
                    <p className="font-medium">There are no members yet</p>
                </div>
            )}

            <hr />
        </div>
    );
};

export default GroupTable;

// "use client";
// import { Button } from "@/components/ui/button";
// // import { groupTableData } from "@/lib/dummy-data";
// import { DialogTrigger } from "@/components/ui/dialog";
// import { Dialog } from "@radix-ui/react-dialog";

// import DataTable, { TableColumn } from "react-data-table-component";
// import { Search, Plus } from "lucide-react";
// import EyeIcon from "../../../public/icons/eye";
// import { customStyles } from "@/lib/customTableStyles";
// import ViewMemberDetails from "./view-member";
// import { useState } from "react";
// import { useGetGroupMembers } from "@/services/queries/groups";

//  interface Props {
//      data: any;
//      groupId: any;
//  }

//  const GroupTable = ({ data, groupId }: Props) => {
//      const [open, setOpen] = useState(false);

//      const { data:membersData, isLoading } = useGetGroupMembers(groupId as string);

//      console.log(groupId, "groupId")
//      console.log(membersData, "membersData")

//     const columns: TableColumn<any>[] = [
//         {
//             name: "Name",
//             cell: (row: any) => <div>{row.name}</div>,
//         },
//         {
//             name: "Gender",
//             cell: (row: any) => <div>{row.gender}</div>,
//         },
//         {
//             name: "Email Address",
//             width: "18rem",
//             cell: (row: any) => <div>{row.email}</div>,
//         },
//         {
//             name: "Date Joined",
//             cell: (row: any) => <div>{row.date}</div>,
//         },

//         {
//             name: "Actions",
//             cell: (row) => (
//                 <div className="flex items-center gap-4 cursor-pointer">
//                     <Dialog>
//                         <DialogTrigger asChild>
//                             <EyeIcon onClick={() => {}} />
//                         </DialogTrigger>
//                         <ViewMemberDetails data={data} />
//                     </Dialog>
//                 </div>
//                 // <div className="flex items-center gap-4">
//                 //     <EyeIcon onClick={() => {}} />
//                 // </div>
//             ),
//         },
//     ];

//     return (
//         <div>
//             <div className="flex flex-col sm:flex-row justify-between gap-10 items-start sm:items-center mb-10 flex-wrap">
//                 <h1 className="font-bold text-[1.4rem]">Members</h1>
//                 <div className="flex flex-col sm:flex-row items-center gap-4 ">
//                     <Button type="button" size={"formLg"}>
//                         <Plus size={20} />
//                         <p className="ml-2">Add Member</p>
//                     </Button>
//                     <div style={{ position: "relative" }}>
//                         <input
//                             type="search"
//                             placeholder="Search members"
//                             style={{
//                                 border: "2px solid #d9d9d9",
//                                 padding: ".45rem",
//                                 borderRadius: ".5rem",
//                                 paddingLeft: "2rem",
//                             }}
//                         />
//                         <div
//                             style={{
//                                 position: "absolute",
//                                 top: "50%",
//                                 transform: "translateY(-50%)",
//                                 left: "0.5rem",
//                             }}
//                         >
//                             <Search size={20} color="#c4c3c3" />{" "}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <DataTable
//                 columns={columns}
//                 data={membersData}
//                 pagination={false}
//                 customStyles={customStyles}
//                 selectableRows
//                 highlightOnHover
//             />
//             <hr />
//         </div>
//     );
// };

// export default GroupTable;
