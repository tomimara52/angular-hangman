import { Component, HostListener, OnInit } from '@angular/core';
import { WordsService } from 'src/app/services/words.service';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {

	private _wordsList: Array<string>;
	public word: string;
	public letter: string;

	public won: boolean;

	public guessedLetters: Array<string>;
	public wrongLetters: Array<string>;

	public windowWidth: number;

  constructor(private _wordsService: WordsService) { }

  ngOnInit(): void {
		this.windowWidth = window.innerWidth;
		this.startGame();
  }

	ngAfterViewInit(): void {
		this.drawGallow();
	}

	private startGame(): void {
		if (this.won != null) {
			this.clearCanvas();
			this.drawGallow();
		}
		this.won = null;
		this.guessedLetters = [];
		this.wrongLetters = [];
		this.getWords();
	}

	private getWords(): void {
		this._wordsService.getWords()
		.subscribe(
			(data) => {
				this._wordsList = data.split(', ');
				this.chooseRandomWord();
			}
		);
	}

	private chooseRandomWord(): void {
		this.word = this._wordsList[Math.floor(Math.random() * this._wordsList.length)];
	}

	public checkLetter(): void {
		this.letter = this.letter.toLowerCase();
		if (this.guessedLetters.includes(this.letter) || this.wrongLetters.includes(this.letter)) {
			console.log('You already put that letter!');
		} else if (this.word.includes(this.letter)) {
			console.log('You guessed a letter!');
			this.guessedLetters.push(this.letter);
		} else if (!this.word.includes(this.letter)) {
			console.log('That letter is not in the word :(');
			this.wrongLetters.push(this.letter);
			this.drawHangman();
		}
		
		this.letter = '';
		this.checkGameState();
	}

	private checkGameState(): void {
		if (this.wrongLetters.length >= 6) {
			this.won = false;
		} else if (this.word.split('').every(l => this.guessedLetters.includes(l))) {
			this.won = true;
		}
	}

	private drawGallow(): void {
		const canvas = document.querySelector('canvas');
		const ctx = canvas.getContext('2d');
		const width = canvas.width;
		const height = canvas.height;
		ctx.fillRect(width / 1.5, 0, width / 30, height);
		ctx.fillRect(width / 1.5, height - height / 6, width / 8, height / 6);
		ctx.fillRect(width / 1.5 - width / 8 + width / 30, height - height / 6, width / 8, height / 6);
		ctx.fillRect(width / 3, 0, width / 1.5 - width / 3, width / 30);
		ctx.fillRect(width / 3, 0, height / 75, height / 4);
	}
	
	private drawHangman(): void {
		const canvas = document.querySelector('canvas');
		const ctx = canvas.getContext('2d');
		const width = canvas.width;
		const height = canvas.height;
		ctx.beginPath();
		let mistakes = this.wrongLetters.length;
		if (mistakes >= 1) {
			ctx.arc(width / 3 + width / 150, height / 4 + height / 15, width / 30, 0, 2 * Math.PI);
		}
		if (mistakes >= 2) {
			ctx.moveTo(width / 3 + width / 150, height / 4 + width / 15);
			ctx.lineTo(width / 3 + width / 150, height / 1.5);
		}
		if (mistakes >= 3) {
			ctx.moveTo(width / 3 + width / 150, height / 4 + height / 6);
			ctx.lineTo(width / 3 + width / 150 - width / 12, height / 2);
		}
		if (mistakes >= 4) {
			ctx.moveTo(width / 3 + width / 150, height / 4 + height / 6);
			ctx.lineTo(width / 3 + width / 150 + width / 12, height / 2);
		}
		if (mistakes >= 5) {
			ctx.moveTo(width / 3 + width / 150, height / 1.5);
			ctx.lineTo(width / 3 + width / 150 - width / 14, height / 1.5 + height / 6);
		}
		if (mistakes >= 6) {
			ctx.moveTo(width / 3 + width / 150, height / 1.5);
			ctx.lineTo(width / 3 + width / 150 + width / 14, height / 1.5 + height / 6);
		}
				ctx.stroke();
	}

	private clearCanvas(): void {
		const canvas = document.querySelector('canvas');
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	@HostListener('window:resize', ['$event'])
	private onWindowResize() {
		this.windowWidth = window.innerWidth;
		setTimeout(() => {
			this.clearCanvas();
			this.drawGallow();
			this.drawHangman();
		}, 0);
	}

}
