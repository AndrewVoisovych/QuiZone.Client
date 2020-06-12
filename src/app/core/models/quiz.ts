export interface Quiz {
    id?: number;
    name: string;
    description: string;
    categoryId: number;
    category?: string;
    settingId?: number;
    topicId?: number;
    topic?: string;
    accessHash?: string,
    accessId: number,
    access?: string,
    setting: QuizSettings;
    imagePath?: string;
    createDate?: Date;
}

export interface QuizSettings {
    id: number;
    randomPosition?: boolean;
    price?: number;
    timerValue?: number;
    dateStart?: Date;
    dateEnd?: Date;
    blockTab?: boolean;
    createUserId?: number;
}