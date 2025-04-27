import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone:true,
  imports:[SharedModule, CommonModule],
  styleUrls: ['./profile.component.scss']
})
export default class ProfileComponent {
  passwordForm: any;
  loading = false;
  userid:any =  sessionStorage.getItem('id')
  constructor(private fb: FormBuilder, public userService :ApiService) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    });
  }


  onSubmit(){
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      console.log(this.passwordForm)
      return;
    }

    const { id, currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      alert('New Password and Confirm Password do not match!');
      return;
    }

    this.loading = true;
    // this.userid = sessionStorage.getItem('id')
    this.userService.updatePassword({ id: this.userid, currentPassword, newPassword })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          alert(res.message || 'Password updated successfully!');
          this.passwordForm.reset();
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to update password');
        }
      });
  }


}
