import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinancialResourcesPage } from './financial-resources.page';

describe('FinancialResourcesPage', () => {
  let component: FinancialResourcesPage;
  let fixture: ComponentFixture<FinancialResourcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialResourcesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialResourcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
