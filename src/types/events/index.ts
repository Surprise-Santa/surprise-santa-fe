export interface EventType {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    createdBy: string;
}

export interface ParticipantType {
    id: string;
    name: string;
    email: string;
    group: string;
    status: boolean;
}

export interface CreateEventType {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    groupId: string;
}
