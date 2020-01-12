import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'result/:duration/:correctAnswersArray/:correctAnswersAmount/:quizLength', loadChildren: './result/result.module#ResultPageModule' },
  { path: 'quiz', loadChildren: './quiz/quiz.module#QuizPageModule' },
  { path: 'help', loadChildren: './help/help.module#HelpPageModule' },
  { path: 'answers/:correctAnswersArray/:correctAnswersAmount', loadChildren: './answers/answers.module#AnswersPageModule' },
  //{ path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
