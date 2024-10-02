import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UploadService } from '../../services/upload.service';
import { map, Subject, take, takeUntil } from 'rxjs';
import { uploadFileResponse } from '../../models/ีuploadFileResponse';
import { data } from '../../models/data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit, OnDestroy {
  constructor(
    protected formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: UploadService,
    private router: Router
  ){}
  destroy$: Subject<any> = new Subject();
  
  @ViewChild('fileInput') fileInput: any;
  file!: any;
  form!: FormGroup;
  resultFormGroup!: FormGroup;
  FILE_MAXSIZE = 1048576;

  showResult: boolean = false;
  showData: boolean = false;
  result!: data[];
  errorMessage: any;

  ngOnInit(): void {
    this.browseFIleForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  browseFIleForm(): void {
    this.form = this.formBuilder.group({
      flightNo: ['', {validators: [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{2,4}$/)] }],
      file: this.formBuilder.group({ 
        file: [null, { validators: Validators.required }],
        name: ['', { validators: Validators.required }],
        size: [null, { validators: Validators.required }],
        type: ['', { validators: Validators.required }]
      })
    })
  }

  toUpperCase(controlName: string): void {
    const control = this.form.get(controlName);
    if (control) {
        control.setValue(control.value.toUpperCase());
    }
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement; 
    const files = fileInput.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const fileSizeValid = this.validateFileSize(selectedFile);

      if (fileSizeValid) {
          this.file = selectedFile; 
          this.form.patchValue({
              file: {
                  file: this.file,
                  name: this.file.name,
                  size: this.file.size,
                  type: this.file.type
              }
          });
      } else {
          this.openSnackBar(); 
      }
    }
  }
  
  save(): void {
    if (this.form.valid) {
        const formData = new FormData();
        formData.append('file', this.file, this.file.name);
        formData.append('flightNo', this.form.value.flightNo);
        this.service.uploadFile(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp: uploadFileResponse) => {
          if (resp.messageCode === 200) {
            this.service.setData(resp?.data);
            this.router.navigate(['upload/result']);
          } else {
            this.showResult = false;
            this.errorMessage = resp.data; 
          }
        })   
    } else {
        this.form.markAllAsTouched(); 
    }
  }

  validateFileSize(files: any): boolean {
    if (files?.size > this.FILE_MAXSIZE) {
      return false;
    }
    return true;
  }

  openSnackBar(): void {
    const message: string = 'File size must be less than 1 MB';
    this.snackBar.open(message, undefined, {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  cancel(): void {
    this.form.reset();
    this.file = null;

    if (this.fileInput) { 
      this.fileInput.nativeElement.value = '';
    }
  }

  onEdit(data: boolean): void {
    if (!data) {
      this.showData = false;
    }
  }
}
