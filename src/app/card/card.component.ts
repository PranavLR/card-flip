import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  changeDetectorRef = inject(ChangeDetectorRef);

  url = input<string>('');
  index = input<number>(0);
  isMatch = input<boolean>(false);
  isVisible = input<boolean>(false);

  flipSingleImageEmit = output<number>();

  flipSingleImage() {
    this.flipSingleImageEmit.emit(this.index());
  }
}
