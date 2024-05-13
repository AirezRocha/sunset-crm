import { Component, Inject, inject, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCalendar, MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { ProspectModel } from '../../../model/prospect.model';
import { ProspectService } from '../../../service/prospect.service';

@Component({
  selector: 'app-prospect-form',
  templateUrl: './prospect-form.component.html',
  styleUrl: './prospect-form.component.css',
  standalone: true,
  providers: [provideNativeDateAdapter(), ProspectService],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule

  ]
})
export class ProspectFormComponent {
  public model: ProspectModel = new ProspectModel();

  private fb = inject(FormBuilder);
  prospect = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    document: [null, Validators.required],
    birth: [null, Validators.required],
    city: [null, Validators.required]
  });

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

    }
    return '';
  };
  constructor(private service: ProspectService,
    public dialogRef: MatDialogRef<ProspectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this.data.id > 0) {
      this.service.findById(this.data.id).subscribe(result => {
        this.model = result;
      });
    }
  }

  hasUnitNumber = false;

  onSubmit(): void {
    if (this.prospect.valid) {
      this.dialogRef.close(this.prospect.value);
    }

    this.prospect.markAllAsTouched();
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
