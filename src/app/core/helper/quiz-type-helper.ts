import { Injectable } from '@angular/core';
import { QuizType } from '../models/quiz.enum';

@Injectable({
    providedIn: 'root'
})

export class ViewQuizType {
    output(type: QuizType): string {
        switch (type) {
            case QuizType.OneTime:
                return 'одноразове';
            case QuizType.Multiple:
                return 'багаторазове';
            case QuizType.Learning:
                return 'режим заучування';
            case QuizType.EstimatedOneTime:
                return 'оцінкове одноразове';
            case QuizType.EstimatedMultiple:
                return 'оцінкове багаторазове';
            case QuizType.Custom:
                return '';
        }
    }
}
