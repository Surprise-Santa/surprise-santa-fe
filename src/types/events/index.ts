import { User } from "../groups";

export interface EventType {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    createdBy: string;
    participants: ParticipantType[];
}

export interface ParticipantType {
    id: string;
    name: string;
    email: string;
    group: string;
    status: boolean;
    user: User;
}

export interface CreateEventType {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    groupId: string;
}
