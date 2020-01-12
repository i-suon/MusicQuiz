import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../note';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  duration: number;
  durationSeconds: number;
  correctAnswersArray: string;
  correctAnswersAmount: string;
  correctAnswersAmountArray: string[] = [];
  correctAnswersPrintAmount: number;
  quizLength: number;
  notes: Note[] = [];
  message: string;
  

  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.correctAnswersPrintAmount = 0;
    this.message = '';
    this.duration = Number(this.activatedRoute.snapshot.paramMap.get('duration'));
    this.durationSeconds = Math.round((this.duration) / 1000);
    this.correctAnswersArray = this.activatedRoute.snapshot.paramMap.get('correctAnswersArray');
    this.correctAnswersAmount = this.activatedRoute.snapshot.paramMap.get('correctAnswersAmount');
    this.correctAnswersAmountArray = String(this.activatedRoute.snapshot.paramMap.get('correctAnswersAmount')).split(",");

    for (let i = 0; i < this.correctAnswersAmountArray.length; i++) {
      if(this.correctAnswersAmountArray[i] == "true") {
        this.correctAnswersPrintAmount++;
      }
    }
    this.quizLength = Number(this.activatedRoute.snapshot.paramMap.get('quizLength'));
    this.printMessage();
  }

  printMessage() {
    if (this.durationSeconds < 15 && this.correctAnswersPrintAmount === 5) {
      this.message = 'Great! You were fast and answered everything correctly.';
    } else if (this.durationSeconds < 15 && this.correctAnswersPrintAmount < 5 && this.correctAnswersPrintAmount > 2) {
      this.message = 'Nice! You were fast and answered almost everything correctly.';
    } else if (this.durationSeconds > 15 && this.correctAnswersPrintAmount === 5) {
      this.message = 'You were correct but a little slow. Try again to get faster!';
    } else if (this.durationSeconds > 15 && this.correctAnswersPrintAmount < 5 && this.correctAnswersPrintAmount > 2) {
      this.message = 'You were mostly correct but it took some time. Try again to get faster!';
    } else {
      this.message = 'You need to work on those notes. Try again!';
    }
  }

  seeAnswers() {
    this.router.navigateByUrl('answers/' + this.correctAnswersArray + '/' + this.correctAnswersAmount);
  }
  
  goToPage(page: string) {
    this.router.navigateByUrl(page);
  }

}
