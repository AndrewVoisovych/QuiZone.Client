import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { QuizStartComponent } from './components/quiz-page/quiz-start/quiz-start.component';
import { QuizProcessComponent } from './components/quiz-process/quiz-process.component';
import { AddQuizComponent } from './components/quiz-page/add-quiz/add-quiz.component';
import { EndProcessComponent } from './components/quiz-process/end-process/end-process.component';
import { CompletedAddComponent } from './components/quiz-page/add-quiz/completed-add/completed-add.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'email-confirm/:email/:hash',
    component: HomePageComponent
  },
  {
    path: 'endquiz/:quiz/:hash',
    component: EndProcessComponent
  },
  {
    path: 'quiz',
    component: QuizPageComponent
  },
  {
    path: 'quiz/:id',
    component: QuizProcessComponent
  },
  {
    path: 'quiz/start/:id',
    component: QuizStartComponent
  },

  {
    path: 'addquiz',
    component: AddQuizComponent
  },
  {
    path: 'addquiz/completed',
    component: CompletedAddComponent
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
