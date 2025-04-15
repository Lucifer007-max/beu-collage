import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
  styleUrls: ['./mentor.component.scss']
})
export default class MerchandiseComponent {
  wfile: File | any = null;
  loader: boolean = false;
  testimonialList: any;
  mentorForm: any;
  mentorList: any
  imgUrl = environment.imgUrl
  constructor(private service: ApiService, private FB: FormBuilder) {
    this.mentorGets();
  }


  ngOnInit() {
    this.mentorForm = this.FB.group({
      mentorImage: ['', Validators.required], // Image Upload
      mentortitle: ['', Validators.required], // Title
      role: ['', Validators.required], // Role
      position: ['', Validators.required], // Position
    });
  }

  handleDelete(id: number,value:string) {
    this.service.mentorDelete(id,value).subscribe((res) => {
      // console.log(res)
      this.mentorGets()
      this.service.SuccessSnackbar(res.data.message);
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    })
  }

  handleSubmit() {
    if (this.mentorForm.valid) {
      this.loader = true;
      const payLoad = {
        "mentortitle": this.mentorForm.value.mentortitle,
        "mentorImage": this.mentorForm.value.mentorImage,
        "role": this.mentorForm.value.role,
        "position": this.mentorForm.value.position,
      }
      this.service.MnetorService(payLoad).subscribe((res: any) => {
        if (res.status) {
          this.service.SuccessSnackbar(res.message);
          this.mentorForm.reset()
          this.mentorGets()
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

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mentorForm.patchValue({ mentorImage: file });
    }
  }

  mentorGets() {
    this.service.mentorGet().subscribe((res: any) => {
      this.mentorList = res.data
    })
  }

  editIndex: number | null = null;
  editableRow: any = {};
  previewImage: string | null = null;
  selectedFile: File | null = null;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // this.mentorForm.patchValue({ mentorImage: file });
      this.selectedFile = file

    }
  }

  startEdit(index: number, row: any) {
    this.editIndex = index;
    this.editableRow = { ...row }; // clone the row
    this.previewImage = this.imgUrl + row.mentorImage;
  }

  cancelEdit() {
    this.editIndex = null;
    this.editableRow = {};
    this.previewImage = null;
    this.selectedFile = null;
  }

  updateRow(index: number) {
    const updatedData = { ...this.editableRow };

    if (this.selectedFile) {
      updatedData.mentorImage = this.selectedFile;
    }

    this.mentorList[index] = updatedData;

    console.log(updatedData, this.mentorList[index])

    this.service.mentorUpdateService(this.mentorList[index]).subscribe((res: any) => {
      if (res.status) {
        this.service.SuccessSnackbar(res?.data?.message);
        // this.mentorForm.reset()
        this.mentorGets()
        this.cancelEdit();

      } else {
        this.service.ErrorSnackbar('Something went wrong...!!');
      }
      this.loader = false;
    }, (err) => {
      this.service.ErrorSnackbar(err.message);
      this.loader = false;
    });
  }


}
