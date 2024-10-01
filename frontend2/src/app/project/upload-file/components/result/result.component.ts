import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { data } from '../../models/data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit, OnDestroy {
  destroy$: Subject<any> = new Subject();
  constructor(
    protected formBuilder: FormBuilder,
  ){}
  datePipe = new DatePipe('en-US');
  form!: FormGroup;
  maxDate!: Date;
  rowData!: number;
  
  @Input() result!: data;
  @Output() saveData = new EventEmitter<{ updatedData: data, rowData: number }>();

  ngOnInit(): void {
    this.resultForm(this.result);
    this.rowData = this.result?.row;
    this.maxDate = new Date();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  resultForm(result: data): void {
    const parsedDate = this.parseDate(result?.dateOfBirth);
    this.form = this.formBuilder.group({
      firstName: [result?.firstName, { validators: [Validators.required, Validators.maxLength(20)] }],
      lastName: [result?.lastName, { validators: [Validators.required, Validators.maxLength(20)] }],
      gender: [result?.gender, { validators: Validators.required }],
      dateOfBirth: [parsedDate, { validators: Validators.required }],
      nationality: [result?.nationality, { validators: Validators.required }],
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
      this.saveData.emit({ updatedData, rowData: this.rowData });
    }
  }

  Clear(): void {
    this.form.reset();
  }
}
