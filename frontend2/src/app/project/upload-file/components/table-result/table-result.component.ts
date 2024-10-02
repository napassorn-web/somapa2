import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { data } from '../../models/data';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-result',
  templateUrl: './table-result.component.html',
  styleUrl: './table-result.component.scss'
})
export class TableResultComponent implements OnInit, OnDestroy {
  destroy$: Subject<any> = new Subject();
  constructor(
    protected formBuilder: FormBuilder,
    private router: Router
  ){}
  @Input() responseData!: data[];
  @Output() onEdit = new EventEmitter<data>();
  
  displayedColumns: string[] = ['No', 'edit', 'FirstName', 'LastName', 'Gender', 'DateOfBirth', 'Nationality'];
  dataSourceTable:Array<data> = [];

  editResult!: data;
  ngOnInit(): void {
    if (this.responseData) {
      this.dataSourceTable = this.responseData;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  edit(element: data): void {
    this.onEdit.emit(element);
  }

  onSaveData(event: { updatedData: data, rowData: number }): void {
    this.dataSourceTable[event.rowData-1] = event.updatedData;
    this.dataSourceTable = [...this.dataSourceTable];
  }

  cancel(): void {
    this.router.navigate(['upload/']);
  }
}
