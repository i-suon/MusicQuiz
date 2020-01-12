import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../note';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.page.html',
  styleUrls: ['./answers.page.scss'],
})
export class AnswersPage implements OnInit {

  correctAnswersArray: string[] = [];
  correctAnswersPrintArray: Note[] = [];
  correctAnswersAmount: string[] = [];
  correctAnswersPrintAmount: boolean[] = [];
  quizLength: number;
  notes: Note[] = [];

  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    fetch('./assets/data/notes.json')
      .then(res => res.json())
      .then(json => {
        this.notes = json;
        
        for (let i = 0; i < this.correctAnswersArray.length; i++) {
          for (let y = 0; y < this.notes.length; y++) {
            if (this.correctAnswersArray[i] == this.notes[y].note) {
            this.correctAnswersPrintArray.push(this.notes[y]);
            }
          }
        }
      });
      this.correctAnswersArray = String(this.activatedRoute.snapshot.paramMap.get('correctAnswersArray')).split(",");
      this.correctAnswersAmount = String(this.activatedRoute.snapshot.paramMap.get('correctAnswersAmount')).split(",");
      for (let i = 0; i < this.correctAnswersAmount.length; i++) {
        if(this.correctAnswersAmount[i] == "true") {
          this.correctAnswersPrintAmount.push(true);
        } else {
          this.correctAnswersPrintAmount.push(false);
        }
      }
      this.quizLength = Number(this.activatedRoute.snapshot.paramMap.get('quizLength'));
    }

    goToPage(page: string) {
      this.router.navigateByUrl(page);
    }

}
