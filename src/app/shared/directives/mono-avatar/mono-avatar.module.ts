import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonoAvatarDirective } from './mono-avatar.directive';

@NgModule({
  declarations: [MonoAvatarDirective],
  imports: [
    CommonModule
  ],
  exports: [MonoAvatarDirective]
})
export class MonoAvatarModule { }
