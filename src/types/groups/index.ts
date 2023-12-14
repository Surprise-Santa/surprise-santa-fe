export interface GroupType {
    id?: any;
    logo?: any;
    name?: string;
    description?: string;
}
export interface MemberType {
    id?: string;
    email?: string;
}

export interface User {
    createdAt: string;
    createdBy: string | null;
    email: string;
    firstName: string;
    gender: string;
    id: string;
    lastName: string;
    middleName: string;
    phone: string;
    profileImgUrl: string;
    status: boolean;
    updatedAt: string;
    updatedBy: string | null;
}

export interface Member {
    createdAt: string;
    createdBy: string | null;
    groupId: string;
    id: string;
    updatedAt: string;
    updatedBy: string | null;
    user: User;
    userId: string;
}

export interface GroupTypes {
    createdAt: string;
    createdBy: string;
    description: string;
    groupLink: string;
    id: string;
    isPublic: boolean;
    logoUrl: string;
    members: Member[];
    name: string;
    status: boolean;
    updatedAt: string;
    updatedBy: string | null;
}
