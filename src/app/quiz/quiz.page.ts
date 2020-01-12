import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Howl, Howler} from 'howler';
import { Note } from '../../note';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})

export class QuizPage implements OnInit {

  notes: Note[] = [];
  options: string[] = ['c','d','e','f','g','a','h'];
  suffledOptions: string[] = [];
  correctAnswers: Note[] = [];
  correctAnswersArray: string[] = [];
  correctAnswersAmount: string[] = [];
  activeQuestion: Note;
  quizLenght: number;
  questionCounter: number;
  music: any;
  disabled: boolean;
  feedback: string;
  nextQuestion: boolean;
  //time
  startTime: Date;
  endTime: Date;
  duration: number;

  constructor(public router: Router) { }

  ngOnInit() {
    this.questionCounter = 0;
    this.disabled = false;
    this.nextQuestion = false;
    this.quizLenght = 5;
    this.correctAnswersAmount.splice(0, this.correctAnswersAmount.length);
    this.correctAnswers.splice(0, this.correctAnswers.length);
    this.correctAnswersArray.splice(0, this.correctAnswersArray.length);
    this.setQuestion();
    this.startTime = new Date();
  }

  setQuestion() {
    
    if (this.questionCounter === this.quizLenght) {
      if(this.music !== undefined) {
        if (this.music.playing) {
          this.music.stop();
        }
      }
      
      this.endTime = new Date();
      this.duration = this.endTime.getTime() - this.startTime.getTime();
      this.router.navigateByUrl('result/' + 
      this.duration + 
      '/' + this.correctAnswersArray + 
      '/' + this.correctAnswersAmount + 
      '/' + this.quizLenght);
      
    } else {
      this.suffledOptions.splice(0, this.suffledOptions.length);
      fetch('./assets/data/notes.json')
      .then(res => res.json())
      .then(json => {
        this.notes = json;
        this.setOptions(this.notes);
      });
      this.feedback = '';
      this.disabled = false;
      this.nextQuestion = false;
      this.questionCounter++;
      if(this.music !== undefined) {
        if (this.music.playing) {
          this.music.stop();
        }
      }
    }
  }

  setOptions(data: Note[]) {
    let randomNumber = this.randomNumber(data.length);
    //take into correctAnswers array
    this.correctAnswers.push(data[randomNumber]);
    this.correctAnswersArray.push(data[randomNumber].note.toString());
    let selectedOptions: string[] = [];

    selectedOptions.push(data[randomNumber].note);

    do {
      let randomNote = this.randomNumber(this.options.length);
        if (!(selectedOptions.includes(this.options[randomNote]))) {
          selectedOptions.push(this.options[randomNote]);
        }
    } while (selectedOptions.length < 3)

    //suffle selected options
    let randomOrder: number[] = this.suffle(3);
    for (let i = 0; i < randomOrder.length; i++) {
      this.suffledOptions.push(selectedOptions[randomOrder[i]]);
    }
    this.activeQuestion = this.correctAnswers[this.questionCounter - 1];
    this.setAudio();
    return this.correctAnswers;
  }

  suffle (amount: number) : Array<number> {
    let suffle: number[] = [];

    for (let i = 0; suffle.length < amount; i++) {
    let random = this.randomNumber(amount);
    if(suffle.length === 0) {
      suffle.push(random);
    } else {
      if (!(suffle.includes(random))) {
        suffle.push(random);
      }
    }
  }
  return suffle;
  }

  randomNumber (max: number) {
    let number: number;
    number = Math.floor(Math.random() * Math.floor(max));
    
    return number;
  }

  setAudio() {
    this.music = new Howl({src: [(this.correctAnswers[this.questionCounter - 1].audio).toString()]});
    return this.music;
  }

  playAudio() {
    if(this.music !== undefined) {
      if (this.music.playing()) {
        this.music.stop();
      } else {
        this.music.play();
      }
    }
  }

  isPlaying() {
    if(this.music !== undefined) {
      if (this.music.playing()) {
        return true;
      } else {
        return false;
      }
    }
  }

  isCorrect(value: string) {
    if (value === this.correctAnswers[this.questionCounter - 1].note) {
      this.nextQuestion = true;
      this.disabled = true;
      this.feedback = 'CORRECT';
      this.correctAnswersAmount.push("true");
    } else {
      this.nextQuestion = true;
      this.disabled = true;
      this.feedback = 'FALSE';
      this.correctAnswersAmount.push("false");
    }
  }

  ionViewDidLeave() {
    this.music.stop();
    this.ngOnInit();
  }

}
