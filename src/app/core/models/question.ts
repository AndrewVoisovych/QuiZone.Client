export interface Question {
  id?: number;
  category?: string;
  categoryId: number;
  quizId?: number;
  position?: number;
  body: string;
  randomOption: boolean;
  answers: Answer[];
  imagePath?: string;
  code?: string;
  price?: number;
  createDate?: Date;
}

export interface Answer {
  id?: number;
  body: string;
  imagePath?: string;
  code?: string;
  checked: boolean;
}

