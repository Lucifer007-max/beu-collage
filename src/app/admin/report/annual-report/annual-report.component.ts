import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-annual-report',
  templateUrl: './annual-report.component.html',
  standalone:true,
  imports:[SharedModule,CommonModule],
  styleUrls: ['./annual-report.component.scss']
})
export default class AnnualReportComponent {
  annualreportForm: any;
  wfile: File | any = null;
  loader: boolean = false;
  annualreportList:any;
  selectedFile:any;
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.getReport();
   }


  ngOnInit() {
    {
      this.annualreportForm = this.FB.group({
        title: ['', Validators.required],
        file: [null, Validators.required],
      })
    }
  }


  // Handle file selection
  onFileSelect(event: any) {
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = ['pdf', 'docx'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!allowedExtensions.includes(fileExtension!)) {
        this.service.ErrorSnackbar("Invalid file type. Only PDF & DOCX allowed.");
        return;
      }

      console.log(file, this.selectedFile)
      this.selectedFile = file;
      this.annualreportForm.patchValue({ file: this.selectedFile });
    }
  }

  handleSubmit() {
    if (this.annualreportForm.valid) {
      this.loader = true;
      const payLoad = {
        "title": this.annualreportForm.value.title,
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
      console.log(res)
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
