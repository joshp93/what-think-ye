import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output() onClickOutside = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) { }

  @HostListener("document:click", ["$event.target"])
  public onClick(target: any) {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.onClickOutside.emit(target);
    }
  }
}
