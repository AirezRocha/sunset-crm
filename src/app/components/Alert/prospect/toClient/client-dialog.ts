import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-modal',
  templateUrl: './client-dialog.html',
  styleUrl: './client-dialog.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class ClientDialogComponent {
  constructor(public modalRef: MatDialogRef<ClientDialogComponent>) {}
}