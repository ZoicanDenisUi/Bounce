import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BounceAnimationComponent } from './bounce-animation.component';

describe('BounceAnimationComponent', () => {
  let component: BounceAnimationComponent;
  let fixture: ComponentFixture<BounceAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BounceAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BounceAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
