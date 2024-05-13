import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ClientDataSource, ClientItem } from './client-datasource';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../../service/client.service';


@Component({
  selector: 'app-Client',
  templateUrl: './Client.component.html',
  styleUrl: './Client.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatButtonModule],
  providers: [ClientService]
})
export class ClientComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ClientItem>;
  dataSource = new ClientDataSource();

  constructor(private service: ClientService, public dialog: MatDialog) {

  }
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'document', 'birth', 'city'];

  ngAfterViewInit(): void {

    this.service.list().subscribe(response => {
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;

    });
  }
}
