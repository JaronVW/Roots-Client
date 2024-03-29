import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Tag } from '../../event.interface';

@Component({
  selector: 'app-addtag-dialog',
  templateUrl: './addtag-dialog.component.html',
})
export class AddtagDialogComponent  {
  newTag: Tag | undefined = {
    id: undefined,
    subject: '',
    count: 0,
  };

  error: boolean = false;
  errorMessage: string = '';

  constructor(public dialogRef: MatDialogRef<AddtagDialogComponent>) {}


  closeDialog() {
    this.newTag = undefined;
    this.dialogRef.close();
  }

  validate() {
    if (this.newTag!.subject.length <= 2) this.setError(true, 'De tag moet minstens 3 karakters bevatten.');
    if (this.newTag!.subject.length > 20) this.setError(true, 'De tag mag maximaal 20 karakters bevatten.');
    if (this.newTag!.subject.length > 2 && this.newTag!.subject.length <= 20) {
      this.setError(false, '');
      this.dialogRef.close(this.newTag);
    }
  }

  setError(error: boolean, errorMessage: string) {
    this.error = error;
    this.errorMessage = errorMessage;
  }
}
