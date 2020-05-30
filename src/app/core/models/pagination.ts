
export interface QuizPaginator{
    allPages: number,
    CurrentPage: number
}


export interface Pages {
    previousPredicate: boolean,
    previous?: number,
    current: number,
    nextPredicate: boolean,
    next?: number,
    page: { number: number, link: number }[]
  };

export interface ComputeData {
    start: number;
    end: number;
}