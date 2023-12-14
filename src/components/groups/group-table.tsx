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
import InviteMembers from "./invite-members";
import { useState } from "react";
import ViewMemberDetails from "./view-member";

interface Props {
    data: any;
}

const GroupTable = ({ data }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between gap-10 items-start sm:items-center mb-10 flex-wrap">
                <h1 className="font-bold text-[1.4rem]">Members</h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 ">
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
                                    <div className="flex items-center gap-4">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <EyeIcon onClick={() => {}}/>
                                            </DialogTrigger>
                                            <ViewMemberDetails data={data} />
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
