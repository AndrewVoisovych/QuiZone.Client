import { QuizAcces } from './../models/quiz.enum';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ViewQuizAccess {
    output(type: QuizAcces): string {
        switch (type) {
            case QuizAcces.Public:
                return 'публічне користування';
            case QuizAcces.Private:
                return 'особисте користування';
            case QuizAcces.Protected:
                return 'закритий доступ';
            case QuizAcces.Link:
                return 'по посиланні';
        }
    }
}
