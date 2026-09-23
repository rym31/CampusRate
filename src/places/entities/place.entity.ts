export enum Category {
    STUDY_SPACE = 'STUDY_SPACE',
    LIBRARY = 'LIBRARY',
    FOOD_SERVICE = 'FOOD_SERVICE',
    SPORTS = 'SPORTS',
    STUDENT_SERVICE = 'STUDENT_SERVICE',
    COMPUTER_LAB = 'COMPUTER_LAB',
    OTHER = 'OTHER',
}

export enum Status {
    ACTIVE = 'ACTIVE',
    TEMPORARILY_CLOSED = 'TEMPORARILY_CLOSED',
    INACTIVE = 'INACTIVE',
}
export class Place {
    id!: string;
    name!: string;
    description!: string;
    category!: Category;
    address!: string;
    services: string[] = [];
    status!: Status;
    averageRating!: number | null;
    reviewCount!: number;
    createdAt!: Date;
    updatedAt!: Date;
}