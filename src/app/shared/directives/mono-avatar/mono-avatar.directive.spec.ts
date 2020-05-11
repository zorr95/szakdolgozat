import { MonoAvatarDirective } from './mono-avatar.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div sziveMonoAvatar>`
})
class TestMonoAvatarComponent { }

describe('MonoAvatarDirective', () => {

  let directive: MonoAvatarDirective;

  let component: TestMonoAvatarComponent;
  let fixture: ComponentFixture<TestMonoAvatarComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonoAvatarDirective, TestMonoAvatarComponent]
    });

    fixture = TestBed.createComponent(TestMonoAvatarComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('div'));

    directive = new MonoAvatarDirective(inputEl);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should construct the monogram correctly with one name', () => {
    directive.name = 'John';
    expect(directive.getChars()).toBe('J');
  });

  it('should construct the monogram correctly with two name', () => {
    directive.name = 'John Smith';
    expect(directive.getChars()).toBe('JS');
  });

  it('should construct the monogram correctly with three name', () => {
    directive.name = 'John Smith Alejandro';
    expect(directive.getChars()).toBe('JS');
  });

  it('should construct the monogram correctly without name', () => {
    directive.name = '';
    expect(directive.getChars()).toBe('?');
    directive.name = ' ';
    expect(directive.getChars()).toBe('?');
  });

  it('should html element background changed', () => {
    expect(inputEl.nativeElement.style.backgroundColor).not.toBe('transparent');
  });
});
