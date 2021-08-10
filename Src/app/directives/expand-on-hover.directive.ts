import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appExpandOnHover]'
})
export class ExpandOnHoverDirective {

  @Input() enable!: boolean;
  
  constructor(private el:ElementRef) { 
    
  }

  @HostListener('mouseenter') onMouseEnter() {
    if(this.enable){
      this.el.nativeElement.style.cursor = 'pointer'
      this.el.nativeElement.style.transform = 'scale(1.1)'
      this.el.nativeElement.style.fontWeight="900"
    }
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    if(this.enable){
      this.el.nativeElement.style.transform = 'scale(1)'
      this.el.nativeElement.style.fontWeight="400"
    }
  }
  
}
