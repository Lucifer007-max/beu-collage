import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-importantlink',
  standalone: true,
  imports: [CommonModule, SharedModule, AngularEditorModule],
  templateUrl: './importantlink.component.html',
  styleUrls: ['./importantlink.component.scss']
})
export default class ImportantlinkComponent {
  importnatLinks: any = FormGroup;
  loader: boolean = false;
  loader2: boolean = false;
  importantLinksData: any;
  imgUrl = environment.imgUrl
  @ViewChild('formSection') formSection!: ElementRef;
  isUpdate: boolean = false;
  id: any = null;
  constructor(private FB: FormBuilder, private service: ApiService) {
    this.getImportantLink()
    {
      this.importnatLinks = this.FB.group({
        id: [''],
        implinks: ['', Validators.required],
        linkurl: [''],
        urlType: ['']
      })
    }
  }

  newFile: any
  onFileSelectLink(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      // console.log(this.wfile)
    }
  }

  toggleImportantLink(item: any): void {
    // this.loader2 = true;

    // Toggle between 1 and 0
    const updatedImportant = item.isimportant === 1 ? 0 : 1;

    const payload = {
      isimportant: updatedImportant
    };

    this.service.importantLinkServiceUpdate(item.id, payload).subscribe({
      next: (res: any) => {
        if (res.status) {
          item.isimportant = updatedImportant; // Reflect change in UI
          this.service.SuccessSnackbar(res.message);
        } else {
          this.service.SuccessSnackbar('Something went wrong...!!');
        }
        this.loader = false;
      },
      error: (err: any) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
      }
    });
  }

  AddLinks() {
    this.loader2 = true;
    const payLoad = {
      // "id":this.noticeForm.value.id,
      "linktitle": this.importnatLinks.value.implinks,
      "linkurl": (this.newFile ?? this.selectedFileName) || this.importnatLinks.value.linkurl,
      // ...(this.isUpdate && { id: this.id })
    }
    // if (this.isUpdate) {
    //   payLoad.id = this.id;
    // }

    this.service.importantLinksService(this.id, payLoad).subscribe((res: any) => {
      if (res.status) {
        this.getImportantLink()
        this.service.SuccessSnackbar(res.message)
        this.loader2 = false;
        this.newFile = '';
        this.id = null
        this.importnatLinks.reset();
        this.selectedFileName = '';
      } else {
        this.service.SuccessSnackbar('something went wrong...!!')
        this.loader2 = false;
      }
    }, (err: any) => {
      this.service.ErrorSnackbar(err.message);
      this.loader2 = false;
    })
  }


  handleDeleteLink(id: number) {
    this.service.importantLinkDelete(id).subscribe((res) => {
      console.log(res)
      this.getImportantLink()
      this.service.SuccessSnackbar(res.message)
    })
  }


  onUrlTypeChangeLinks(type: string) {
    this.importnatLinks.get('urlType')?.setValue(type);
    this.importnatLinks.get('linkurl')?.reset();
  }

  getImportantLink() {
    this.service.importantLinkGet().subscribe((res: any) => {
      this.importantLinksData = res
    });
  }

  selectedFileName: any;
  handleEdit(data: any) {
    console.log(data)

    data.linkurl.endsWith('.pdf') ? (this.selectedFileName = data.linkurl, this.importnatLinks.patchValue({ urlType: 'file', implinks: data.linktitle })) :
      this.importnatLinks.patchValue({ urlType: 'text', linkurl: data.linkurl, implinks: data.linktitle })
    this.id = data.id
    setTimeout(() => {
      this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    this.isUpdate = true
  }

}
