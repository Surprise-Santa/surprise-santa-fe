import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { inviteMemberSchema } from "@/schema";
import { useInviteMembersMutation } from "@/services/mutations/group.mutation";
import { MemberType } from "@/types/groups";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, SubmitHandler, useForm, Form } from "react-hook-form";
import LoadingSpinner from "../ui/spinner";


interface Props {
    data: any;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}
const InviteMembers = ({ data, setOpen }: Props) => {
    const { mutateAsync: inviteMembers, isLoading } = useInviteMembersMutation(data?.id);


    const formHook = useForm<MemberType>({
        resolver: yupResolver(inviteMemberSchema),
        defaultValues: {
            email: "",
        },
    } as { resolver: Resolver<MemberType> });
    const {
        handleSubmit,
        control,
    } = formHook;

    const submit: SubmitHandler<MemberType> = async (data: MemberType) => {
        const result = await inviteMembers(data);
        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                toast.success(result.data.message || "Group Created Successfully");
                setOpen(false)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <DialogContent className="max-w-[100%] sm:max-w-[40rem] mb-0">
            <DialogHeader>
                <DialogTitle>Invite Members</DialogTitle>
            </DialogHeader>
            <Form   {...formHook}>

            <form onSubmit={handleSubmit(submit)}>
                <div className="mt-8 mb-60">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Invite Members" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {/* to do populate the list here */}
                                <SelectLabel>Groups</SelectLabel>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <DialogFooter className="mt-10 ">
                    <DialogClose asChild>
                        <Button variant="outline" type="button" className="w-max mr-4">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isLoading} className="w-max">
                        {isLoading ? <LoadingSpinner /> : " Add Selected"}

                    </Button>
                </DialogFooter>
            </form>
            </Form>
        </DialogContent>
    );
};

export default InviteMembers;
