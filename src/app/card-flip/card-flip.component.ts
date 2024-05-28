import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, inject, signal, type ElementRef } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { DataService } from '../service/data.service';

interface cardI {
  url: string,
  isVisible: boolean;
  isMatch: boolean;
  index: number;
}

@Component({
  selector: 'app-card-flip',
  standalone: true,
  templateUrl: './card-flip.component.html',
  styleUrl: './card-flip.component.scss',
  imports: [CardComponent, AsyncPipe, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFlipComponent {
  dataService = inject(DataService);
  changeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('FlipImageBtn') FlipImageBtn!: ElementRef;

  firstClick: cardI | null = null;
  misClick = signal(0);
  isFlipAllImages = signal(true);
  isClickable = signal(false);
  isCompleted = signal(false);
  cardObj!: Array<cardI>;

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    this.cardObj = this.dataService.allImageUrl?.map((url, index) => ({ url, index, isVisible: false, isMatch: false }));
    this.misClick.set(0);
    this.isFlipAllImages.set(true);
    this.isClickable.set(false);
    this.isCompleted.set(false);
  }

  flipAllImages() {
    this.isFlipAllImages.set(false);
    this.isClickable.set(true);
    // this.isStarted.set(true);
    this.cardObj.forEach((item) => item.isVisible = true);

    setTimeout(() => {
      this.cardObj.forEach((item) => item.isVisible = false);
      this.changeDetectorRef.detectChanges();
    }, 5000);
  }

  flipSingleImage(index: number) {
    this.cardObj[index].isVisible = !this.cardObj[index].isVisible;

    if (this.firstClick === null) {
      this.firstClick = this.cardObj[index];
    } else {
      this.isClickable.set(false);
      setTimeout(() => {
        if (!this.firstClick) return;

        if (this.cardObj[index].url === this.firstClick?.url) {
          this.cardObj[index].isMatch = true;
          this.cardObj[this.firstClick.index].isMatch = true;
        } else {
          this.cardObj[index].isVisible = false;
          this.cardObj[this.firstClick.index].isVisible = false;
          this.misClick.update(val => val + 1);
        }
        if (this.cardObj.every((item) => item.isMatch === true)) {
          this.isCompleted.set(true);
        }
        this.firstClick = null;
        this.isClickable.set(true);
        this.changeDetectorRef.detectChanges();
      }, 500);
    }
  }

  pleaseStartGame() {
    this.FlipImageBtn.nativeElement.classList.add('heart-beat');
    setTimeout(() => {
      this.FlipImageBtn.nativeElement.classList.remove('heart-beat');
    }, 1000);
  }
}