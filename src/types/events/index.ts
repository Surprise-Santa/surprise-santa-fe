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
    group: string;
    status: boolean;
    user: {
        firstName: string;
        lastName: string;
        gender: string;
        email: string;
    };
}

export interface CreateEventType {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    groupId: string;
}
