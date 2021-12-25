import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-play-again',
  templateUrl: './play-again.component.html',
  styleUrls: ['./play-again.component.css']
})
export class PlayAgainComponent implements OnInit {

	@Input()
	public won: boolean;

	@Input()
	public word: string;

	@Output()
	public playAgain: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

	public emitPlayAgain(): void {
		this.playAgain.emit();
	}

}
