import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillReminderPage } from './bill-reminder.page';

describe('BillReminderPage', () => {
  let component: BillReminderPage;
  let fixture: ComponentFixture<BillReminderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillReminderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillReminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
