import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useJoinGroupMutation } from "@/services/mutations/group.mutation";
import LoadingSpinner from "../ui/spinner";
import { Input } from "../ui/input";

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroup = ({ setOpen }: Props) => {
    const [groupCode, setGroupCode] = useState("");
    const [inputError, setInputError] = useState("");
    const { mutateAsync: joinGroup, isLoading } = useJoinGroupMutation(groupCode as string);

    const submit = async () => {
        if (!groupCode) {
            setInputError("Group code is required");
            return;
        }
        const result = await joinGroup();
        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                toast.success(result.data.message || "You have successfully joined the group");
                setOpen(false);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
    return (
        <DialogContent className="max-w-[100%] w-full sm:max-w-[40rem]">
            <DialogHeader>
                <DialogTitle>Join Group</DialogTitle>
            </DialogHeader>
            <div className="mt-8 mb-10">
                <Input
                    type="text"
                    placeholder="Enter group code"
                    value={groupCode || ""}
                    onChange={(e) => {
                        setGroupCode(e.target.value);
                    }}
                />

                <p className="mt-2">
                    {inputError && (
                        <span className="text-red-500 text-[0.8rem] font-semibold">
                            {inputError}
                        </span>
                    )}
                </p>
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button
                        variant="outline"
                        type="button"
                        className="w-max mr-4"
                        onClick={() => setGroupCode("")}
                    >
                        Cancel
                    </Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading} className="w-max" onClick={submit}>
                    {isLoading ? <LoadingSpinner /> : "Join Group"}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default CreateGroup;
