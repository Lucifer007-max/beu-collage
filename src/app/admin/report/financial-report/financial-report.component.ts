import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  standalone:true,
  imports:[SharedModule,CommonModule],
  styleUrls: ['./financial-report.component.scss']
})
export default class FinancialReportComponent {
  annualreportForm: any;
  wfile: File | any = null;
  loader: boolean = false;
  annualreportList:any;
  selectedFile:any;
  selectedThumbnail:any;
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.getReport();
   }


  ngOnInit() {
    {
      this.annualreportForm = this.FB.group({
        thumbnail: ['', Validators.required],
        file: [null, Validators.required],
      })
    }
  }


  // Handle file selection
  onFileSelect(event: any, type:string) {
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = ['pdf', 'docx'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions.includes(fileExtension!)) {
        this.service.ErrorSnackbar("Invalid file type. Only PDF & DOCX allowed.");
        return;
      }

      console.log(file, this.selectedFile)
      if(type === 'file') {

        this.selectedFile = file;
        this.annualreportForm.patchValue({ file: this.selectedFile });
      }else {
        this.selectedThumbnail = file;
        this.annualreportForm.patchValue({thumbnail : this.selectedThumbnail });

      }
    }
  }

  handleSubmit() {
    if (this.annualreportForm.valid) {
      this.loader = true;
      const payLoad = {
        "thumbnail": this.selectedThumbnail,
        "file": this.selectedFile,
      }
      this.service.ReportService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.getReport();
          this.service.SuccessSnackbar(res.message);
        } else {
          this.service.ErrorSnackbar('Something went wrong...!!');
        }
        this.loader = false;
      }, (err) => {
        this.service.ErrorSnackbar(err.message);
        this.loader = false;
      });
    } else {
      this.service.ErrorSnackbar('Form is invalid');
    }
  }

  getReport() {
    this.service.reportGet().subscribe((res: any) => {
      this.annualreportList = res;
    });
  }
  handleDelete(id:number){
    this.service.reportDelete(id).subscribe((res) => {
      this.getReport()
      this.service.SuccessSnackbar(res.message);
    } ,(err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
  })
  }

}
