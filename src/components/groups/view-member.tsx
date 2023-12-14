import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { createGroupSchema } from "@/schema";
import { GroupType } from "@/types/groups";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import AppInput from "../ui/app-input";
import { useCreateGroupMutation } from "@/services/mutations/group.mutation";
import toast from "react-hot-toast";
import { Form } from "../ui/form";
import LoadingSpinner from "../ui/spinner";

interface Props {
    data: any
}

const ViewMemberDetails = ({ data }: Props) => {

    return (
        <DialogContent className="max-w-[100%] w-full sm:max-w-[40rem]">
            <DialogHeader>
                <DialogTitle>Member Details</DialogTitle>
            </DialogHeader>

            <div className="mt-8 mb-20 flex justify-space-between gap-10 flex-col md:flex-row text-[1.1rem]">
                <div className="flex flex-col w-[100%] sm:w-[50%] gap-8 ">
                <p className="font-medium">
                    <span className="text-neutral-400 font-normal mr-1 sm:mr-4">First name</span>
                    kkk
                </p>
                <p className="font-medium">
                    <span className="text-neutral-400 font-normal mr-1 sm:mr-4">Middle name</span>
                    kkk
                </p>
                <p className="font-medium">
                    <span className="text-neutral-400 font-normal mr-1 sm:mr-4">Last name</span>
                    kkk
                </p>
                <p className="font-medium">
                    <span className="text-neutral-400 font-normal mr-1 sm:mr-4">Phone number</span>
                    kkk
                </p>
                </div>
                <div className="flex flex-col w-[100%] sm:w-[50%] gap-8">
                <p className="font-medium">
                    <span className="text-neutral-400 font-normal mr-1 sm:mr-4">Gender</span>
                    kkk
                </p>
                <p className="font-medium">
                    <span className="text-neutral-400 font-normal mr-1 sm:mr-4">Email</span>
                    kkk
                </p>
                <p className="font-medium">
                    <span className="text-neutral-400 font-normal mr-1 sm:mr-4">Date Joined</span>
                    kkk
                </p>
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
