import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, SharedModule, AngularEditorModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export default class EventsComponent {
  eventForm: any = FormGroup;
  loader: boolean = false;
  // eventist:any =[];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['insertImage', 'insertVideo', 'removeFormat'], // Removes Image, Video, and Erase (Remove Formatting) icons
      ['bold', 'italic'],
      ['fontSize']
    ]
  };


  constructor(private FB: FormBuilder, private service: ApiService) { }

  ngOnInit(): void {
    this.getEvents()
    {
      this.eventForm = this.FB.group({
        id: [''],
        events: ['', Validators.required],
      })
    }
  }

  getEvents() {
    this.service.eventsGet().subscribe((res) => {
      if (res.data) {
        this.eventForm.patchValue({
          id: res.data[0].id, // Set ID
          events: res.data[0].events // Set Notice content
        });
      }
    });
  }
  Add() {
    this.loader = true;
    const payLoad = {
      // "id":this.noticeForm.value.id,
      "events": this.eventForm.value.events,
      // "notice":this.wfile,
    }
    this.service.eventService(this.eventForm.value.id, payLoad).subscribe((res: any) => {
      if (res.status) {
        this.getEvents()
        this.service.SuccessSnackbar(res.message)
        this.loader = false;
      } else {
        this.service.SuccessSnackbar('something went wrong...!!')
        this.loader = false;
      }
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }


}
