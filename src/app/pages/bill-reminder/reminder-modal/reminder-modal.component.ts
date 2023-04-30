import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.scss'],
})
export class ReminderModalComponent implements OnInit {
  reminder: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismiss() {
    await this.modalController.dismiss();
  }
}
