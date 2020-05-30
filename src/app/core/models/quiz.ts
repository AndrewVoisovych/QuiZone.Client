export interface Quiz {
    id?: number;
    name: string;
    description: string;
    categoryId: number;
    category?: string;
    settingId?: number;
    topicId?: number;
    topic?: string;
    createDate?: Date
}
