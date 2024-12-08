import { Component } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UploadComponent {
  selectedFile!: File;
  message: string = '';

  constructor(private fileUploadService: FileUploadService) {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]; // Get the selected file
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (response: any) => {
          this.message = response.message || 'File uploaded successfully!';
        },
        (error) => {
          this.message = error.error.message || 'Failed to upload the file.';
        }
      );
    } else {
      this.message = 'Please select a file to upload!';
    }
  }
}
