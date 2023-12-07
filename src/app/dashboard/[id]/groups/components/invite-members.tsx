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

const InviteMembers = () => {
    return (
        <DialogContent className="max-w-[100%] sm:max-w-[40rem] mb-0">
            <DialogHeader>
                <DialogTitle>Invite Members</DialogTitle>
            </DialogHeader>
            <form>
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
                    <Button type="submit" className="w-max">
                        Add Selected
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default InviteMembers;
