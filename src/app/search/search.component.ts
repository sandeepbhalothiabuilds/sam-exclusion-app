import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [CommonModule, FormsModule],
})
export class SearchComponent {
  classificationOptions = ['Firm', 'Individual', 'Special Entity Designation', 'Vessel'];
  agencyOptions = ['AF', 'AID', 'APHIS', 'ARMY', 'CIA'];

  searchCriteria = {
    classification: '',
    name: '',
    address: '',
    excludingAgency: '',
  };

  results: any = {};

  onSearch() {
    console.log('Search criteria:', this.searchCriteria);
    // Simulated search results
    this.results = {
      primaryData: [
        {
          Name: 'John Doe',
          Classification: 'Individual',
          Address: '123 Main St',
          ExcludingAgency: 'CIA',
          Alias: ['Johnny', 'J.D.'],
        },
      ],
    };
  }
}
