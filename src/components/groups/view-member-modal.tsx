import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { convertDateFormat } from "@/lib/utils";

interface Props {
    memberDetails: any;
}

const ViewMemberDetails = ({ memberDetails }: Props) => {
    return (
        <DialogContent className="max-w-[100%] w-full sm:max-w-[45rem]">
            <DialogHeader>
                <DialogTitle>Member Details</DialogTitle>
            </DialogHeader>

            <div className="mt-6 ">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={memberDetails?.user?.profileImgUrl} />
                        <AvatarFallback>
                            {memberDetails?.user?.firstName?.charAt(0) ?? ""}{" "}
                            {memberDetails?.user?.lastName?.charAt(0) ?? ""}{" "}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex ">
                        <p className="font-bold text-[1.2rem]">
                            {memberDetails?.user?.firstName} {memberDetails?.user?.middleName}{" "}
                            {memberDetails?.user?.lastName}
                        </p>
                    </div>
                </div>
                <div className="mt-8 mb-20 flex justify-space-between gap-8 flex-col md:flex-row text-[1.1rem]">
                    <div className="flex flex-col w-[100%] sm:w-[50%] gap-8 ">
                        <p className="font-medium">
                            <span className="text-neutral-400 font-normal mr-1 sm:mr-4">
                                Gender:
                            </span>
                            {memberDetails?.user?.gender ?? "N/A"}
                        </p>
                        <p className="font-medium">
                            <span className="text-neutral-400 font-normal mr-1 sm:mr-4">
                                Email:
                            </span>
                            {memberDetails?.user?.email ?? "N/A"}
                        </p>
                    </div>
                    <div className="flex flex-col w-[100%] sm:w-[50%] gap-8">
                        <p className="font-medium">
                            <span className="text-neutral-400 font-normal mr-1 sm:mr-4">
                                Phone:
                            </span>
                            {memberDetails?.user?.phone ?? "N/A"}
                        </p>
                        <p className="font-medium">
                            <span className="text-neutral-400 font-normal mr-1 sm:mr-4">
                                Date Joined:
                            </span>
                            {convertDateFormat(memberDetails?.createdAt) ?? "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" type="button" className="w-max mr-4">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};

export default ViewMemberDetails;
