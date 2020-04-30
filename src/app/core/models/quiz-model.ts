export class Quiz {
    id: number;
    name?: string;
    description?: string;
    categoryId: number;
    category?: string;
    settingId: number;
    topicId: number;
    topic?: string;
    createDate?: string;
    createUserId?: number;


    constructor(
    id?: number,
    name?: string,
    description?: string,
    categoryId?: number,
    category?: string,
    settingId?: number,
    topicId?: number,
    topic?: string,
    createDate?: string,
    createUserId?: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.category = category;
        this.settingId = settingId;
        this.topicId = topicId;
        this.topic = topic;
        this.createDate = createDate
        this.createUserId = createUserId;
      }
}
