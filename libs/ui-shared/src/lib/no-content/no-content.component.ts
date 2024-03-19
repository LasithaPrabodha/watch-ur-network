import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wyn-no-content',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>404: page missing</h1>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent {}
