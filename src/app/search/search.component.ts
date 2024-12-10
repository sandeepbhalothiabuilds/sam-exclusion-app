import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../services/search.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class SearchComponent implements AfterViewInit {
  selectedTab = 0;

  classificationOptions = ['Firm', 'Individual', 'Special Entity Designation', 'Vessel'];
  agencyOptions = [
    'AF', 'AID', 'APHIS', 'ARMY', 'CIA', 'CNS', 'DHS-FEMA', 'DHS-ICE', 'DHS-TSA', 'DLA', 'DOC', 'DOD',
    'DOE-NNSA', 'DOI', 'DOJ', 'DOL', 'DON-AA', 'DOS', 'DOS-MBC', 'DOS-TFS', 'DOT', 'DOT-FAA', 'DOT-FHWA',
    'DOT-FMCSA', 'DOT-FRA', 'DOT-FTA', 'DOT-MARAD', 'EDUC', 'EPA', 'EXIMK', 'GSA', 'HHS', 'HUD', 'HUDA',
    'HUDC', 'HUDP', 'NASA', 'NAVY', 'NGA', 'NSA', 'NSF', 'OFCCP', 'OPM', 'PBGC', 'PS', 'SBA', 'STATE',
    'TREAS', 'TREAS-OFAC', 'USAID', 'USCIS', 'USDA', 'USDA-AMS', 'USDA-FAS', 'USDA-FS', 'USDA-FSA', 
    'USDA-NRCS', 'USDA-RD', 'USDA-RHS', 'USDA-RMA', 'USDA-RUS', 'USPS', 'USPSHQ', 'VA'
  ];
  searchCriteria = {
    name: '',
    classification: '',
    address: '',
    excludingAgency: '',
  };

  primaryDataSource = new MatTableDataSource<any>([]);
  secondaryDataSource = new MatTableDataSource<any>([]);

  displayedColumns: string[] = [
    'classification', 'fullName', 'alias', 'fullAddress', 'entityType', 
    'excludingAgency', 'additionalComments', 'activeDate', 'terminationDate', 
    'exclusionType', 'uniqueEntityId', 'samNumber', 'cage', 'exclusionProgram'
  ];

  @ViewChild('primaryPaginator') primaryPaginator!: MatPaginator;
  @ViewChild('secondaryPaginator') secondaryPaginator!: MatPaginator;

  constructor(private searchService: SearchService) {}

  ngAfterViewInit() {
    this.primaryDataSource.paginator = this.primaryPaginator;
    this.secondaryDataSource.paginator = this.secondaryPaginator;
  }

  onAliasClick(alias: string) {
    console.log('Clicked alias:', alias); // Log the clicked alias for debugging
    this.searchCriteria.name = alias; // Update search criteria with the clicked alias
    this.onSearch(); // Call the search function with the updated criteria
  }
  
  onSearch() {
    console.log('Search triggered with criteria:', this.searchCriteria); // Debugging
  
    this.searchService.search(this.searchCriteria).subscribe(
      (response) => {
        this.primaryDataSource.data = response.primaryData || [];
        this.secondaryDataSource.data = response.secondaryData || [];
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }      
}
