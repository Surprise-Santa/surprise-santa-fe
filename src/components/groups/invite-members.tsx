import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { inviteMemberSchema } from "@/schema";
import { useInviteMembersMutation } from "@/services/mutations/group.mutation";
import { MemberType } from "@/types/groups";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "lucide-react";
import { useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AppInput from "../ui/app-input";
import { Form } from "../ui/form";
import LoadingSpinner from "../ui/spinner";

interface Props {
    data: any;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const InviteMembers = ({ data, setOpen }: Props) => {
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

    const { mutateAsync: inviteMembers, isLoading } = useInviteMembersMutation(data?.id);
    const formHook = useForm<MemberType>({
        resolver: yupResolver(inviteMemberSchema),
        defaultValues: {
            email: "",
        },
    } as { resolver: Resolver<MemberType> });
    const { handleSubmit, control, setValue, watch } = formHook;

    const handleSelectedEmail = () => {
        const email = watch("email");
        if (email && !selectedEmails.includes(email)) {
            setSelectedEmails((prevEmails: any) => [...prevEmails, email]);
            setValue("email", "");
        }
    };

    const handleDeleteEmail = (index: any) => {
        setSelectedEmails((prevEmails) => {
            const updatedEmails = prevEmails.filter((_, i) => i !== index);
            return updatedEmails;
        });
    };

    const submit: SubmitHandler<MemberType> = async () => {
        const payload = {
            emails: selectedEmails,
        };
        try {
            const result = await inviteMembers(payload);
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                toast.success(result.data.message || "Members Added Successfully");
                setOpen(false);
                setSelectedEmails([]);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <DialogContent className="max-w-[100%] sm:max-w-[42rem] mb-0">
            <DialogHeader>
                <DialogTitle>Invite Members</DialogTitle>
            </DialogHeader>
            <Form {...formHook}>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="mt-8 mb-20 flex-col">
                        <div className="mt-0 flex gap-2 items-center">
                            <AppInput
                                type="email"
                                label="Invite members"
                                placeholder="Add member email"
                                onChange={(e) => setValue("email", e.target.value)}
                                control={control}
                                name="email"
                            />
                            <Button type="button" className="mt-2" onClick={handleSelectedEmail}>
                                Add Member
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {selectedEmails &&
                                selectedEmails?.map((email, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="bg-primary-light px-2 py-1 w-fit rounded-md flex gap-2 items-center"
                                        >
                                            <p className="text-[.9rem] leading-0">{email}</p>
                                            <div
                                                onClick={() => handleDeleteEmail(index)}
                                                className="cursor-pointer"
                                            >
                                                <X size={18} />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    <DialogFooter className="mt-10 ">
                        <DialogClose asChild>
                            <Button variant="outline" type="button" className="w-max mr-4">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isLoading || !selectedEmails?.length}
                            className="w-max"
                        >
                            {isLoading ? <LoadingSpinner /> : " Add Selected"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};

export default InviteMembers;
