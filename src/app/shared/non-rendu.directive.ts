import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNonRendu]',
  standalone: true
})
export class NonRenduDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.backgroundColor = 'orangered';
    el.nativeElement.style.color = 'white';
  }
}
