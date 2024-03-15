import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wyn-no-content',
  standalone: true,
  imports: [CommonModule],
  template: `<p>no-content works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent {}
