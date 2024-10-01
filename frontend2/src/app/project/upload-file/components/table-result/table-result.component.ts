import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { data } from '../../models/data';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table-result',
  templateUrl: './table-result.component.html',
  styleUrl: './table-result.component.scss'
})
export class TableResultComponent implements OnInit, OnDestroy {
  destroy$: Subject<any> = new Subject();
  constructor(
    protected formBuilder: FormBuilder,
  ){}
  @Input() result!: data[];
  @Output() onEdit = new EventEmitter<boolean>();
  
  displayedColumns: string[] = ['No', 'edit', 'FirstName', 'LastName', 'Gender', 'DateOfBirth', 'Nationality'];
  dataSourceTable:Array<data> = [];

  editData: boolean = false;
  editResult!: data;
  ngOnInit(): void {
    if (this.result) {
      this.dataSourceTable = this.result;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  edit(element: data): void {
    this.onEdit.emit(false);
    this.editData = true;
    this.editResult = element;
  }

  onSaveData(event: { updatedData: data, rowData: number }): void {
    this.dataSourceTable[event.rowData-1] = event.updatedData;
    this.dataSourceTable = [...this.dataSourceTable];
  }
}
