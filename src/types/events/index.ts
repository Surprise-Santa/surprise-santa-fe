import { User } from "../groups";

export interface EventType {
    node: {
        id: string;
        title: string;
        description: string;
        startDate: string;
        endDate: string;
        createdBy: string;
        participants: ParticipantType[];
        organizer: {
            id: string;
            firstName: string;
            lastName: string;
            middleName: string;
        };
    };
}

export interface ParticipantType {
    node: {
        id: string;
        group: string;
        status: boolean;
        user: User;
    };
    user: User;
}

export interface CreateEventType {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    groupId: string;
}
