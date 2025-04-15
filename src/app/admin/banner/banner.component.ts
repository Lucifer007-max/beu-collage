import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export default class BannerComponent {
  @ViewChild('formSection') formSection!: ElementRef;
  isUpdate:boolean = false;
  bannerForm: any = FormGroup;
  wfile: File | any = null;
  bannerList: any;
  loader: boolean = false;
  baseUrl: String = environment.imgUrl;
  bannerID:any;
  selectedFileName:string = ""
  constructor(private FB: FormBuilder, private service: ApiService) { }

  ngOnInit(): void {
    this.getBanner()
    {
      this.bannerForm = this.FB.group({
        bannerTitle: ['', Validators.required],
        bannerImage: ['', Validators.required],
      })
    }
  }
  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.wfile = event.target.files[0];
      console.log(this.wfile)
    }
  }

  addBanner() {
    this.loader = true;
    const payLoad = {
      "title": this.bannerForm.value.bannerTitle,
      "bannerPath": this.wfile || this.selectedFileName,
    }

    const service  = this.isUpdate ? this.service.bannerUpdateService(payLoad,this.bannerID) : this.service.bannerService(payLoad);

    service.subscribe((res: any) => {
      if (res.status) {
        this.getBanner()
        this.bannerForm.reset()
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

  getBanner() {
    this.service.bannerGet().subscribe((res: any) => {
      // console.log(res.data)
      this.bannerList = res.data;
    })
  }

  handleDelete(id: number) {
    this.service.bannerDelete(id).subscribe((res) => {
      console.log(res)
      this.getBanner();
      this.service.SuccessSnackbar(res.message)
    })
  }


  handleEdit(data:any) {
    console.log(data)
    this.bannerForm.patchValue({
      // bannerImage:data.bannerPath,
      bannerTitle: data.title
    })
    this.selectedFileName = data.bannerPath;
    this.bannerID = data.bannerID
    setTimeout(() => {
      this.formSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    this.isUpdate = true
  }
}
