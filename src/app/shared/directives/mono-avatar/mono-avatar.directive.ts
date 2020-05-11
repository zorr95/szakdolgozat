import { Directive, ElementRef, Input, OnInit } from '@angular/core';

const COLORS = [
  '#F44336', '#E91E63', '#9C27B0', ' #673AB7',
  '#3F51B5', '#1E88E5', '#0288D1', '#0097A7',
  '#009688', '#43A047', '#558B2F', '#E65100'];

@Directive({
  selector: '[incMonoAvatar]'
})
export class MonoAvatarDirective implements OnInit {

  @Input() name: string;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const randomNumber = parseInt(((Math.random() * (COLORS.length - 1)) + 1).toString(), 10);
    const elStyle = this.el.nativeElement.style;
    elStyle.backgroundColor = COLORS[randomNumber];
    elStyle.width = '40px';
    elStyle.height = '40px';
    elStyle.borderRadius = '360px';
    elStyle.verticalAlig = 'middle';
    elStyle.display = 'flex';
    elStyle.justifyContent = 'center';
    elStyle.alignItems = 'center';
    elStyle.cursor = 'default';
    elStyle.color = 'white';
    this.el.nativeElement.textContent = this.getChars();
  }

  getChars(): string {
    if (this.name && this.name !== ' ') {
      const tmp = this.name.split(' ');

      let monogram = tmp[0].charAt(0);
      if (tmp.length > 1) {
        monogram += tmp[1].charAt(0);
      }
      return monogram.toUpperCase();
    }
    return '?';
  }
}
