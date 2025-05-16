import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule, AngularEditorModule],
  // imports: [CommonModule, SharedModule, AngularEditorModule],
  styleUrls: ['./notice-board.component.scss'],

})
export default class NoticeBoardComponent implements OnInit {
  noticeForm: any = FormGroup;
  importnatLinks: any = FormGroup;
  loader: boolean = false;
  loader2: boolean = false;
  noticeList: any = [];
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
    this.getImportantLink()
    {
      this.noticeForm = this.FB.group({
        id: [''],
        notice: ['', Validators.required],
        urlType: ['text'], // Default is 'text'
      })
    }
    {
      this.importnatLinks = this.FB.group({
        id: [''],
        implinks: ['', Validators.required],
      })
    }
  }
  wfile:any;
  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.wfile = event.target.files[0];
      console.log(this.wfile)
    }
  }
  boardData:any;
  getNotice() {
    this.service.noticeBoardGet().subscribe((res: any) => {
      if (res.data) {
        console.log(res)
        this.boardData = res.data
      }
    });
  }

  onUrlTypeChange(value: string): void {
    this.noticeForm.get('urlType')?.setValue(value);
  }

  Add() {
    this.loader = true;
    const payLoad = {
      // "id":this.noticeForm.value.id,
      "board": this.noticeForm.value.notice,
      "link":this.wfile,
    }
    this.service.noticeBoardService(this.noticeForm.value.id, payLoad).subscribe((res: any) => {
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

  getImportantLink() {
    this.service.importantLinkGet().subscribe((res: any) => {
      // console.log(res)
      if (res.data) {
        this.importnatLinks.patchValue({
          id: res.data[0].id, // Set ID
          implinks: res.data[0].implinks // Set Notice content
        });
      }
    });
  }

  AddLinks() {
    this.loader2 = true;
    const payLoad = {
      // "id":this.noticeForm.value.id,
      "implinks": this.importnatLinks.value.implinks,
      // "notice":this.wfile,
    }
    this.service.importantLinksService(this.noticeForm.value.id, payLoad).subscribe((res: any) => {
      if (res.status) {
        this.getImportantLink()
        this.service.SuccessSnackbar(res.message)
        this.loader2 = false;
      } else {
        this.service.SuccessSnackbar('something went wrong...!!')
        this.loader2 = false;
      }
    }, (err: any) => {
      this.service.ErrorSnackbar(err.message);
      this.loader2 = false;
    })
  }

  @ViewChild('copyContent', { static: false }) copyContent!: ElementRef;
  @ViewChild('copyContentnew', { static: false }) copyContentnew!: ElementRef;
  copySuccess: boolean = false;

  copyToClipboard(type: string) {
    if (type === "new") {
      const el = this.copyContentnew.nativeElement;
      const range = document.createRange();
      range.selectNode(el);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);

      try {
        document.execCommand('copy');
        this.copySuccess = true;
        setTimeout(() => (this.copySuccess = false), 2000); // Hide success message after 2s
      } catch (err) {
        console.error('Failed to copy:', err);
      }

      window.getSelection()?.removeAllRanges();

    } else {
      const el = this.copyContent.nativeElement;
      const range = document.createRange();
      range.selectNode(el);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);

      try {
        document.execCommand('copy');
        this.copySuccess = true;
        setTimeout(() => (this.copySuccess = false), 2000); // Hide success message after 2s
      } catch (err) {
        console.error('Failed to copy:', err);
      }

      window.getSelection()?.removeAllRanges();


    }
  }

}
