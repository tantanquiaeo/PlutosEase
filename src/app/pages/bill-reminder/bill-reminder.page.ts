import { Component } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { ModalController } from '@ionic/angular';
import { ReminderModalComponent } from './reminder-modal/reminder-modal.component';



@Component({
  selector: 'app-bill-reminder',
  templateUrl: './bill-reminder.page.html',
  styleUrls: ['./bill-reminder.page.scss'],
})
export class BillReminderPage {
  reminders = [];
  newReminder = {
    title: '',
    amount: '',
    dueDate: '',
    
  };

  

  

  constructor(private localNotifications: LocalNotifications, private modalController: ModalController) {}

  async showReminderDetails(reminder) {
    const modal = await this.modalController.create({
      component: ReminderModalComponent,
      componentProps: {
        reminder: reminder
      }
    });
    return await modal.present();
  }
  


  ionViewDidEnter() {
    const remindersString = localStorage.getItem('reminders');
    if (remindersString) {
      this.reminders = JSON.parse(remindersString);
    }
    // Request permission for local notifications
    this.localNotifications.requestPermission().then(
      (permission) => {
        console.log('Permission granted:', permission);
      },
      (error) => {
        console.log('Permission denied:', error);
      }
    );
  }

  addReminder(form) {
    if (form.invalid) {
      return;
    }
    this.reminders.push(this.newReminder);
    this.newReminder = {
      title: '',
      amount: '',
      dueDate: '',
    };
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }


  deleteReminder(reminder) {
    const index = this.reminders.indexOf(reminder);
    if (index >= 0) {
      this.reminders.splice(index, 1);
      localStorage.setItem('reminders', JSON.stringify(this.reminders));
    }
  }

  checkDueDates() {
    const today = new Date().toLocaleDateString();
    for (let i = this.reminders.length - 
      1; i >= 0; i--) {
      const reminderDate = new Date(this.reminders[i].dueDate).toLocaleDateString();
      if (reminderDate === today) {
        // delete the reminder
        this.reminders.splice(i, 1);
      } else {
        const timeDiff = new Date(this.reminders[i].dueDate).getTime() - new Date().getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (daysDiff <= 3 && daysDiff > 0) {
          // schedule local notification
          this.localNotifications.schedule({
            title: 'Bill Reminder',
            text: `Your ${this.reminders[i].title} bill is due in ${daysDiff} day(s)`,
            trigger: { 
              at: new Date(new Date(this.reminders[i].dueDate).getTime() - 3 * 24 * 60 * 60 * 1000),
              unit: ELocalNotificationTriggerUnit.SECOND 
            },
          });
        }
      }
    }
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }
}
