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
  noticeForm:any = FormGroup;
  loader:boolean = false;
  noticeList:any =[];
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


  constructor(private FB: FormBuilder, private service:ApiService) { }

  ngOnInit(): void {
    this.getNotice()
    {
      this.noticeForm = this.FB.group({
        id: [''],
        notice: ['', Validators.required],
      })
    }
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
  Add(){
    this.loader =  true;
     const payLoad = {
        // "id":this.noticeForm.value.id,
        "notice":this.noticeForm.value.notice,
        // "notice":this.wfile,
     }
     this.service.noticeService(this.noticeForm.value.id , payLoad).subscribe((res:any) => {
      if(res.status){
        this.getNotice()
        this.service.SuccessSnackbar(res.message)
        this.loader =  false;
      }else {
        this.service.SuccessSnackbar('something went wrong...!!')
        this.loader =  false;
      }
     }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
  })
    }



}
