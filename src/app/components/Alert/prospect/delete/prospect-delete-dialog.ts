import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef,} from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-modal',
  templateUrl: './prospect-delete-dialog.html',
  styleUrl: './prospect-delete-dialog.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class ProspectDeleteDialogComponent {
  constructor(public modalRef: MatDialogRef<ProspectDeleteDialogComponent>) {}
}