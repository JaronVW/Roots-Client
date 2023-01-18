import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Event, Tag } from '../event.interface';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddtagDialogComponent } from './addtag-dialog/addtag-dialog.component';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import tinymce from 'tinymce';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addevent',
  templateUrl: './addeditevent.component.html',
  styleUrls: ['./addeditevent.component.css'],
})
export class AddediteventComponent implements OnInit {
  dropdownList: any = [];
  dropdownSettings = {};

  error: boolean = false;
  errorMessage: string = '';
  isFirstVisit: boolean = true;
  buttonText: string = 'Aanmaken';
  eventid: number | null = null;
  isEditing: boolean = false;

  editor: any;

  event: Event = {
    title: '',
    description: '',
    content: '',
    dateOfEvent: new Date().toISOString(),
    tags: [],
    multimediaItems: [],
  };

  tagSuggestions: Tag[] = [];

  modalmode = {
    title: '',
    body: '',
    buttontext: '',
  };

  constructor(
    private router: Router,
    private EventService: EventService,
    private _location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    if (tinymce.activeEditor != null) tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'longerdescription');
    tinymce.init({
      selector: '#longerdescription',
      base_url: '/tinymce',
      suffix: '.min',
      setup: (editor) => {
        this.editor = editor;

        editor.on('init', () => {
          if (this.event.content) {
            editor.setContent(this.event.content);
          }
        });

        editor.on('keyup, blur', () => {
          this.event.content = editor.getContent();
        });
      },
      plugins: 'lists link image table code help wordcount',
      branding: false,
      promotion: false,
      placeholder: 'Omschrijving typen...',
      // add image (just before table) to get image button in toolbar
      toolbar:
        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | table | bullist numlist outdent indent code',
      height: 300,
      menubar: false,
      inline_boundaries: false,
    });

    this.eventid = Number(this.route.snapshot.paramMap.get('id'));
    if (this.eventid) {
      this.isEditing = true;
      this.EventService.getEvent(this.eventid).subscribe((response: Event) => {
        console.log(response);
        this.event = response;
        if (response.dateOfEvent) this.event.dateOfEvent = new Date(response.dateOfEvent).toISOString();
        response.tags.forEach((element) => {
          element.tagText = `${element.subject}`;
        });
      });
    }

    if (this.isEditing) {
      this.modalmode.title = 'Wijzigingen opslaan?';
      this.modalmode.body = 'Weet u zeker dat u al uw wijzigingen wilt opslaan?';
      this.modalmode.buttontext = 'Aanpassen';
    } else {
      this.modalmode.title = 'Event aanmaken?';
      this.modalmode.body = 'Weet u zeker dat u deze gebeurtenis wilt aanmaken?';
      this.modalmode.buttontext = 'Aanmaken';
    }

    if (this.isEditing) this.buttonText = 'Update';

    this.EventService.getTags().subscribe((response: any[]) => {
      response.forEach((tag) => {
        tag.tagText = `${tag.count} | ${tag.subject}`;
      });
      this.dropdownList = response;
      this.tagSuggestions = this.dropdownList.filter(
        (tag: Tag) => !this.event.tags.map((tag) => tag.subject).includes(tag.subject),
      );
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'subject',
      textField: 'tagText',
      subject: 'subject',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      enableCheckAll: false,
      classes: 'tag-dropdown',
    };

    window.addEventListener('resize', () => {
      this.changeTagName();
    });
    setTimeout(() => {
      this.changeTagName();
    });
  }

  validate() {
    if (this.event.tags.length <= 0) {
      this.setError(true, 'Er moet tenminste 1 tag geselecteerd worden.');
    }
    if (this.event.description == '') {
      this.setError(true, 'De beschrijving mag niet leeg zijn.');
    }
    if (this.event.title == '') {
      this.setError(true, 'De titel mag niet leeg zijn.');
    }
    if (this.event.title != '' && this.event.description != '' && this.event.tags.length > 0) {
      this.setError(false, '');
    }
  }

  open(content: any) {
    this.validate();
    if (this.error == false) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
  }

  addedit() {
    if (this.isEditing) {
      this.updateEvent();
    } else {
      this.createEvent();
    }
  }

  createEvent() {
    if (this.event.dateOfEvent) this.event.dateOfEvent = new Date(this.event.dateOfEvent).toISOString();
    const data = {
      ...this.event,
    };
    this.EventService.addEvent(data).subscribe((response: Event) => {
      this.router.navigate(['/events']);
    });
  }

  updateEvent() {
    if (this.eventid != null) {
      if (this.event.dateOfEvent) this.event.dateOfEvent = new Date(this.event.dateOfEvent).toISOString();
      this.EventService.updateEvent(this.eventid, this.event).subscribe((response: Event) => {
        this.router.navigate(['/events']);
      });
    }
  }

  setError(error: boolean, errorMessage: string) {
    this.error = error;
    this.errorMessage = errorMessage;
  }

  backClicked() {
    this._location.back();
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        console.log(term);
        console.log(text$);
        return term.length < 2
          ? []
          : [].filter((v: string) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
      }),
    );

  tagChange() {
    setTimeout(() => {
      this.changeTagName();
    });
  }

  changeTagName() {
    this.tagSuggestions = this.dropdownList.filter(
      (tag: Tag) => !this.event.tags.map((tag) => tag.subject).includes(tag.subject),
    );

    document.querySelectorAll('.multiselect-dropdown span.selected-item span').forEach((element) => {
      const parts = element.innerHTML.split(' | ');
      if (parts.length > 1) element.innerHTML = parts[1];
      else element.innerHTML = parts[0];
    });

    let dropzone = document.getElementById('dropzone');
    let tagSize = document.querySelector('ng-multiselect-dropdown#tags')?.getBoundingClientRect().height;
    if (tagSize && dropzone) {
      if (window.innerWidth >= 768) dropzone.style.marginTop = +tagSize - 38 + 'px';
      else dropzone.style.marginTop = 0 + 'px';
    }

    // document.querySelectorAll('.multiselect-item-checkbox div').forEach((element) => {});
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddtagDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result != undefined) {
        this.dropdownList = [...this.dropdownList, { ...result, tagText: `0 | ${result.subject}` }];
        this.event.tags = [...this.event.tags, { ...result, tagText: `0 | ${result.subject}` }];
        setTimeout(() => {
          this.changeTagName();
        });
      }
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      for (const element of event.target.files) {
        if (this.event.multimediaItems == undefined) this.event.multimediaItems = [];
        this.event.multimediaItems = [...this.event.multimediaItems, { multimedia: element.name, file: element }];
      }
    }
  }

  filterMultimedia(multimedia: string) {
    if (this.event.multimediaItems == undefined) this.event.multimediaItems = [];
    this.event.multimediaItems = this.event.multimediaItems.filter((item) => item.multimedia != multimedia);
  }

  onFileDropped(files: Array<any>) {
    for (const element of files) {
      if (this.event.multimediaItems == undefined) this.event.multimediaItems = [];
      this.event.multimediaItems = [...this.event.multimediaItems, { multimedia: element.name, file: element }];
    }
  }

  drag() {
    document.querySelector('.dropzone-text')?.classList.add('drag');
  }
}
