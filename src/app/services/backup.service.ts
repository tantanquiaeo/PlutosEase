import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, AlertController } from '@ionic/angular';

import { File } from '@ionic-native/file/ngx';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import * as AES from 'crypto-js/aes';
import * as Utf8 from 'crypto-js/enc-utf8';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  secretKey = 'secret-key';

  constructor(
    private storage: Storage,
    private file: File,
    private plt: Platform,
    private chooser: Chooser,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  // #region BACKUP

  backup() {
    console.log('Log All Data:');

    let storageLength = 0;

    this.storage.length().then((res) => {
      storageLength = res;
    });

    let json = '';

    this.storage
      .forEach((val, key, i) => {
        json += `"${key}" : ${JSON.stringify(val)}`;
        if (i < storageLength) {
          json += ',';
        }
      })
      .then(() => {
        json = '{' + json + '}';
      })
      .then(() => {
        const encryptedData = AES.encrypt(json, this.secretKey).toString();
        this.writeToFile(encryptedData);
      });
  }

  writeToFile(encryptedData: string) {
    let date = new Date();
    const filename = date.toString().slice(4, 24).replace(/[\s:]/g, '_');
    console.log('FILENAME: ', filename);

    this.file
      .writeFile(
        `${this.file.externalDataDirectory}`,
        `BDG_${filename}.txt`,
        encryptedData,
        {
          replace: true,
        }
      )
      .then((res) => {
        console.log('Write Success: ', res);
        this.toastBackupSuccess(res.nativeURL);
      })
      .catch((err) => {
        console.log('Write Fail: ', err);
      });

    return filename;
  }

  async toastBackupSuccess(filename) {
    const toast = await this.toastCtrl.create({
      message: `All data backed up to: ${filename}`,
      duration: 2000,
    });
    toast.present();
  }

  async alertConfirmBackup() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Backup',
      message: `Are you sure you want to generate a new backup file?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Restore Cancelled');
          },
        },
        {
          text: 'Confirm',
          handler: () => {
            this.backup();
          },
        },
      ],
    });

    await alert.present();
  }

  //#endregion

  //#region RESTORE
  clear;
  overwrite;

  chooseFile(clear, overwrite) {
    //init restore options first
    this.clear = clear;
    this.overwrite = overwrite;

    this.chooser
      .getFile('text/plain')
      .then((value: ChooserResult) => {
        //remove data:text tags, get only btoa-encoded base64, with regex
        let raw = value.dataURI.match(/\w*$/);

        //decode base64 uri
        const decodedStr = atob(raw[0]);
        console.log('File Value: ', decodedStr);

        try {
          const decryptedStr = AES.decrypt(decodedStr, this.secretKey).toString(Utf8);
          console.log('Decrypted Value: ', decryptedStr);

          const jsonData = JSON.parse(decryptedStr);
          console.log('JSON Data: ', jsonData);
    
          if (clear) {
            this.storage.clear().then(() => {
              console.log('Storage Cleared');
              this.processData(jsonData);
            });
          } else {
            this.processData(jsonData);
          }
        } catch (error) {
          console.log('Error: ', error);
          this.toastInvalidFile();
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.toastInvalidFile();
      });

    }

    processData(jsonData) {
    const entries = Object.entries(jsonData);
    console.log('Entries: ', entries);

    let count = 0;
const total = entries.length;

entries.forEach(([key, value]) => {
  console.log('Key: ', key, 'Value: ', value);
  this.storage.set(key, value).then(() => {
    console.log(`Set ${key} - ${value}`);
    count++;

    if (count == total) {
      console.log('Completed Restore');
      this.toastRestoreSuccess();
    }
  });
});
}

async toastRestoreSuccess() {
const toast = await this.toastCtrl.create({
message: 'Restore successful!',
duration: 2000,
});
toast.present();
}

async toastInvalidFile() {
const toast = await this.toastCtrl.create({
message: 'Invalid backup file!',
duration: 2000,
});
toast.present();
}

async alertConfirmRestore() {
const alert = await this.alertCtrl.create({
header: 'Confirm Restore',
message: 'Are you sure you want to restore from backup file?',
buttons: [
{
text: 'Cancel',
role: 'cancel',
cssClass: 'secondary',
handler: () => {
console.log('Restore Cancelled');
},
},
{
text: 'Confirm',
handler: () => {
this.chooseFile(this.clear, this.overwrite);
},
},
],
});

await alert.present();
}

//#endregion
}
