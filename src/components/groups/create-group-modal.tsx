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
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroup = ({ setOpen }: Props) => {
    const { mutateAsync: createGroup, isLoading } = useCreateGroupMutation();

    const formHook = useForm<GroupType>({
        resolver: yupResolver(createGroupSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    } as { resolver: Resolver<GroupType> });
    const { handleSubmit, control } = formHook;

    const submit: SubmitHandler<GroupType> = async (data: GroupType) => {
        const result = await createGroup(data);
        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                toast.success(result.data.message || "Group Created Successfully");
                setOpen(false);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <DialogContent className="max-w-[100%] w-full sm:max-w-[40rem]">
            <DialogHeader>
                <DialogTitle>Create Group</DialogTitle>
            </DialogHeader>
            <Form {...formHook}>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="mt-8 mb-20">
                        <AppInput
                            type="text"
                            label="Group name"
                            placeholder="Enter group title"
                            control={control}
                            name="name"
                            isRequired
                        />
                        <AppInput
                            type="text"
                            label="Description"
                            placeholder="Enter group description"
                            control={control}
                            name="description"
                            isRequired
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" className="w-max mr-4">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading} className="w-max">
                            {isLoading ? <LoadingSpinner /> : "Create Group"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};

export default CreateGroup;
