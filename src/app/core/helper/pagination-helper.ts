import { OnInit, Injectable } from '@angular/core';
import { QuizPaginator, ComputeData } from '../models/pagination';


@Injectable({
    providedIn: 'root'
})

export class PaginationAgorithm {

    Compute(page: QuizPaginator, pagesForView: number): ComputeData {
        const allPages: number = page.allPages - 1;
        let data: ComputeData;

        let start: number;
        let end: number;

        if (allPages > pagesForView) {
            if (page.CurrentPage === 0) {
                start = 0;
                end = pagesForView;
            } else if (page.CurrentPage === allPages) {
                end = allPages;
                start = end - pagesForView;
            }
            else {
                const pagesForViewPreviuos = pagesForView % 2 === 0
                    ? pagesForView / 2
                    : Math.round(pagesForView / 2);

                const pagesForViewPartNext = pagesForView % 2 === 0
                    ? pagesForViewPreviuos - 1
                    : pagesForView - pagesForViewPreviuos;

                if (page.CurrentPage - pagesForViewPreviuos <= 1) {
                    start = 1;
                    end = pagesForView;
                }
                else {
                    start = page.CurrentPage - pagesForViewPreviuos;
                    end = page.CurrentPage + pagesForViewPartNext;

                    if (end > allPages) {
                        const different = end - allPages;
                        start = start - different;
                        end = allPages;
                    }
                }
            }
        } else {
            start = 1;
            end = allPages + 1;

        }
        return data = { start, end };
    }



}