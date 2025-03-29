import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [CommonModule, SharedModule, AngularEditorModule],
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export default class NoticeComponent implements OnInit {
  noticeForm: any = FormGroup;
  alertForm: any = FormGroup;
  loader: boolean = false;
  loader2: boolean = false;
  noticeList: any = [];
  isUpadte: boolean = false;
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
    this.getNotice()
    this.getAlerts()
    {
      this.noticeForm = this.FB.group({
        id: [''],
        notice: ['', Validators.required],
      })
    }
    this.alertForm = this.FB.group({
      id1: [''],
      alertstitle: ['', Validators.required],  // Ensure it matches patchValue key
      alertsubtitle: ['', Validators.required], // Ensure it matches patchValue key
      alertsurl: ['', Validators.required]  // 
    });

  }

  getNotice() {
    this.service.noticeGet().subscribe((res) => {
      if (res.data) {
        this.noticeForm.patchValue({
          id: res.data[0].id, // Set ID
          notice: res.data[0].notice // Set Notice content
        });
      }
    });
  }
  Add() {
    this.loader = true;
    const payLoad = {
      // "id":this.noticeForm.value.id,
      "notice": this.noticeForm.value.notice,
      // "notice":this.wfile,
    }
    this.service.noticeService(this.noticeForm.value.id, payLoad).subscribe((res: any) => {
      if (res.status) {
        this.getNotice()
        this.service.SuccessSnackbar(res.message)
        this.loader = false;
      } else {
        this.service.SuccessSnackbar('something went wrong...!!')
        this.loader = false;
      }
    }, (err: any) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }
  alerts: any = []
  getAlerts() {
    this.service.alertsGet().subscribe((res) => {
      if (res.data) {
        this.alerts = res.data
        // this.noticeForm.patchValue({
        //   id: res.data[0].id, // Set ID
        //   notice: res.data[0].notice // Set Notice content
        // });
      }
    });
  }
  Submit() {
    this.loader2 = true;
    const payLoad = {
      alertstitle: this.alertForm.value.alertstitle, // Use correct key
      alertsubtitle: this.alertForm.value.alertsubtitle,
      alertsurl: this.alertForm.value.alertsurl,
    };
  
    const request = this.isUpadte
      ? this.service.alertServiceUpdate(this.alertForm.value.id1, payLoad)
      : this.service.alertService(this.alertForm.value.id1, payLoad);
  
    request.subscribe(
      (res: any) => {this.handleResponse(res), this.alertForm.reset(), this.isUpadte = false,this.getAlerts()},
      (err) => this.handleError(err)
    );
  }
  
  handleResponse(res: any) {
    if (res.status === 200) {
      this.getAlerts();
      this.service.SuccessSnackbar(res.message);
    } else if (res.status === 400) {
      this.service.ErrorSnackbar(res.message);
    } else {
      this.service.SuccessSnackbar('Something went wrong...!!');
    }
    this.loader2 = false;
  }
  
  handleError(err: any) {
    this.service.ErrorSnackbar(err.message);
    this.loader2 = false;
  }
  
  handleEdit(data: any) {
    this.isUpadte = true; // Fix typo
  
    this.alertForm.patchValue({
      id1: data.id, // Ensure it matches formControlName
      alertstitle: data.alertstitle,
      alertsubtitle: data.alertsubtitle,
      alertsurl: data.alertsurl
    });
  }
  
  handleDelete(id: number) {
    this.service.alertDelete(id).subscribe(
      (res: any) => {
        // if (res.status === 200) {
          this.getAlerts();
          this.service.SuccessSnackbar(res.message);
      //   } else {
      //     this.service.ErrorSnackbar("Failed to delete alert.");
      //   }
      },
      (err) => {
        this.service.ErrorSnackbar(err.message);
      }
    );
  }
  
}
