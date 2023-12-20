import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form } from "@/components/ui/form";
import AppInput from "../ui/app-input";
import { useController, Resolver, useForm } from "react-hook-form";
import { CreateEventType } from "@/types/events";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEventSchema } from "@/schema";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { useGetOwnGroups } from "@/services/queries/groups";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateEventMutation } from "@/services/mutations/events.mutation";
import toast from "react-hot-toast";
import LoadingSpinner from "../ui/spinner";

const CreateEvent = () => {
    const { data: ownGroups } = useGetOwnGroups();
    const { pageEdges: groups } = ownGroups || {};
    const formHook = useForm<CreateEventType>({
        resolver: yupResolver(createEventSchema),
    } as { resolver: Resolver<CreateEventType> });
    const { handleSubmit, control } = formHook;

    const { field: startDateField, fieldState: startDateFieldState } = useController({
        name: "startDate",
        control,
        defaultValue: "",
    });

    const { field: endDateField, fieldState: endDateFieldState } = useController({
        name: "endDate",
        control,
        defaultValue: "",
    });

    const { field: groupIdField, fieldState: groupIdFieldState } = useController({
        name: "groupId",
        control,
        defaultValue: "",
    });

    const { mutateAsync: createEvent, isLoading } = useCreateEventMutation();

    const submit = async (data: any) => {
        const { title, description, startDate, endDate, groupId } = data;
        const result = await createEvent({
            title,
            description,
            startDate,
            endDate,
            groupId,
        });
        try {
            if (!result) return;

            if (result.status === 200 || result.status === 201) {
                toast.success(result.data.message || "Event Created Successfully");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
        document.getElementById("closeDialog")?.click();
    };

    return (
        <DialogContent className="max-w-[20rem] sm:max-w-[40rem] sm:max-h-[60rem] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Create Event</DialogTitle>
            </DialogHeader>
            <Form {...formHook}>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="my-2">
                        <div className="flex flex-col gap-2 mt-2 mb-6">
                            <Label
                                htmlFor="groupId"
                                className={
                                    groupIdFieldState?.error?.message
                                        ? "text-destructive text-sm"
                                        : ""
                                }
                            >
                                Group <span className="text-destructive text-sm ">*</span>
                            </Label>
                            <Select
                                value={groupIdField.value}
                                onValueChange={(value) => groupIdField.onChange(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Groups</SelectLabel>
                                        {groups?.map((item: any) => {
                                            const { node: group } = item;
                                            return (
                                                <SelectItem key={group.id} value={group.id}>
                                                    {group.name}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <span className="text-destructive font-medium text-sm">
                                {groupIdFieldState?.error?.message}
                            </span>
                        </div>
                        <AppInput
                            type="text"
                            label="Event Title"
                            placeholder="Enter event title"
                            control={control}
                            name="title"
                            isRequired
                        />
                        <AppInput
                            type="text"
                            label="Event Description"
                            placeholder="Enter event description"
                            control={control}
                            name="description"
                            isRequired
                        />

                        <div className="sm:flex block gap-4 w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <Label
                                    htmlFor="startDates"
                                    className={
                                        startDateFieldState?.error?.message
                                            ? "text-destructive text-sm"
                                            : ""
                                    }
                                >
                                    Start Date <span className="text-destructive text-sm">*</span>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !startDateField.value && "text-muted-foreground",
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {startDateField.value ? (
                                                format(new Date(startDateField.value), "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            // @ts-ignore
                                            selected={
                                                startDateField.value
                                                    ? new Date(startDateField.value)
                                                    : null
                                            }
                                            onSelect={(date) =>
                                                date &&
                                                startDateField.onChange(
                                                    new Date(
                                                        date.getTime() -
                                                            date.getTimezoneOffset() * 60000,
                                                    ).toISOString(),
                                                )
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <span className="text-destructive font-medium text-sm">
                                    {startDateFieldState?.error?.message}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label
                                    htmlFor="endDate"
                                    className={
                                        endDateFieldState?.error?.message
                                            ? "text-destructive text-sm"
                                            : ""
                                    }
                                >
                                    End Date <span className="text-destructive text-sm ">*</span>
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !endDateField.value && "text-muted-foreground",
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {endDateField.value ? (
                                                format(new Date(endDateField.value), "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            // @ts-ignore
                                            selected={
                                                endDateField.value
                                                    ? new Date(endDateField.value)
                                                    : null
                                            }
                                            onSelect={(date) =>
                                                date &&
                                                endDateField.onChange(
                                                    new Date(
                                                        date.getTime() -
                                                            date.getTimezoneOffset() * 60000,
                                                    ).toISOString(),
                                                )
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <span className="text-destructive font-medium text-sm">
                                    {endDateFieldState?.error?.message}
                                </span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="w-max ml-auto my-4">
                        <DialogClose asChild id="closeDialog">
                            <Button variant="outline" type="button" className="w-max mr-4">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading} className="w-max">
                            {isLoading ? <LoadingSpinner /> : "Create Event"}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    );
};

export default CreateEvent;
