import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { data } from '../../models/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { TableResultComponent } from '../table-result/table-result.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit, OnDestroy {
  destroy$: Subject<any> = new Subject();
  constructor(
    protected formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: UploadService,
  ){}
  @ViewChild(TableResultComponent) tableResultComponent!: TableResultComponent;
  
  datePipe = new DatePipe('en-US');
  form!: FormGroup;
  maxDate!: Date;
  rowData!: number;
  responseData!: data[];

  @Output() updateTable = new EventEmitter<{ updatedData: data, rowData: number }>();

  ngOnInit(): void {
    const data = this.service.getData();
    if (data) {
      this.responseData = data;
    }
    this.resultForm(null);
    this.maxDate = new Date();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  resultForm(result: data|null): void {
    let parsedDate = null;
    if(result?.dateOfBirth) {
      parsedDate = this.parseDate(result.dateOfBirth);
    }
    this.form = this.formBuilder.group({
      firstName: [result?.firstName, { validators: [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Za-z]+$/) ] }],
      lastName: [result?.lastName, { validators: [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Za-z]+$/)] }],
      gender: [result?.gender, { validators: Validators.required }],
      dateOfBirth: [parsedDate, { validators: Validators.required }],
      nationality: [result?.nationality, { validators: [Validators.required, Validators.pattern(/^[A-Z]{3}$/)] }],
    });
  }

  private parseDate(dateString: string): Date | null {
    if (dateString) {
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    }
    return null;
  }

  save(): void {
    if (this.form.valid) {
      const updatedData = this.form.value as data;
      updatedData.dateOfBirth = this.datePipe.transform(updatedData.dateOfBirth, 'dd-MM-yyyy') || updatedData.dateOfBirth;
      this.tableResultComponent.onSaveData({
        rowData: this.rowData,
        updatedData: updatedData});
    }
  }

  Clear(): void {
    this.form.reset();
  }

  onEdit(data: data): void {
    this.resultForm(data);
    this.rowData = data.row;
  }
}
