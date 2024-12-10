import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchService } from '../services/search.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [CommonModule, FormsModule, MatTabsModule],
})
export class SearchComponent {
  selectedTab = 0;
  
  classificationOptions = ['Firm', 'Individual', 'Special Entity Designation', 'Vessel'];
  agencyOptions = [
    'AF',
    'AID',
    'APHIS',
    'ARMY',
    'CIA',
    'CNS',
    'DHS-FEMA',
    'DHS-ICE',
    'DHS-TSA',
    'DLA',
    'DOC',
    'DOD',
    'DOE-NNSA',
    'DOI',
    'DOJ',
    'DOL',
    'DON-AA',
    'DOS',
    'DOS-MBC',
    'DOS-TFS',
    'DOT',
    'DOT-FAA',
    'DOT-FHWA',
    'DOT-FMCSA',
    'DOT-FRA',
    'DOT-FTA',
    'DOT-MARAD',
    'EDUC',
    'EPA',
    'EXIMK',
    'GSA',
    'HHS',
    'HUD',
    'HUDA',
    'HUDC',
    'HUDP',
    'NASA',
    'NAVY',
    'NGA',
    'NSA',
    'NSF',
    'OFCCP',
    'OPM',
    'PBGC',
    'PS',
    'SBA',
    'STATE',
    'TREAS',
    'TREAS-OFAC',
    'USAID',
    'USCIS',
    'USDA',
    'USDA-AMS',
    'USDA-FAS',
    'USDA-FS',
    'USDA-FSA',
    'USDA-NRCS',
    'USDA-RD',
    'USDA-RHS',
    'USDA-RMA',
    'USDA-RUS',
    'USPS',
    'USPSHQ',
    'VA'
  ];
  searchCriteria = {
    name: '',
    classification: '',
    address: '',
    excludingAgency: '',
  };

  results: any = {};
  activeTab: string = 'primary'; // Default to primaryData tab

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.search(this.searchCriteria).subscribe(
      (response) => {
        this.results = response;
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }

  // Combine name fields into a single value
  getCombinedName(row: any): string {
    return [row.prefixName, row.firstName, row.middleName, row.lastName, row.suffixName]
      .filter((namePart) => namePart) // Filter out null or undefined values
      .join(' ');
  }

  // Combine address fields into a single value
  getCombinedAddress(row: any): string {
    return [row.address1, row.address2, row.address3, row.address4]
      .filter((addressPart) => addressPart) // Filter out null or undefined values
      .join(', ');
  }

  // Format aliases as a comma-separated string
  getAliases(row: any): string {
    return row.samExclusionsAlias?.join(', ') || '';
  }

  // Set the active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
