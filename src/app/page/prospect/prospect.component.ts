import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ProspectDataSource, ProspectItem } from './prospect-datasource';
import { ProspectService } from '../../service/prospect.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProspectFormComponent } from '../../components/form/prospect-form/prospect-form.component';
import { ProspectModel } from '../../model/prospect.model';
import { ProspectDeleteDialogComponent } from '../../components/Alert/prospect/delete/prospect-delete-dialog';
import { ClientDialogComponent } from '../../components/Alert/prospect/toClient/client-dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrl: './prospect.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  providers: [ProspectService]
})
export class ProspectComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProspectItem>;
  dataSource = new ProspectDataSource();

  constructor(private service: ProspectService, public dialog: MatDialog) {

  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'document', 'birth', 'city', 'action'];


  ngAfterViewInit(): void {
    this.service.list().subscribe(response => {
      this.dataSource = new ProspectDataSource();
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    var value = filterValue.trim().toLowerCase();

    if (!value) {
      this.ngAfterViewInit();
      return;
    }
    this.service.findByNameOrDocument(value).subscribe(response => {

      this.dataSource = new ProspectDataSource();
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });


  }

  openDialog(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(ProspectFormComponent, { data: { id: id } });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result.id > 0) {
        this.update(result);
      } else {
        this.save(result);
      }
      
    });
  }

  save(data: ProspectModel) {
    this.service.save(data);
  }

  update(data: ProspectModel) {
    this.service.update(data);
  }

  client(id: number) {
    const dialogRef = this.dialog.open(ClientDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.client(id);
      }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ProspectDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(id);
      }
    });

  }
}
