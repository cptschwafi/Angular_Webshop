import { MessengerService } from 'src/app/services/messenger.service';
import { FilterService } from './../../../../services/filter.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

interface IFilters {
  selectedFilters: {
    gender: string;
    category: string;
    subcategory: string;
  };
  selectedSize: string;
  availableSizes: string[];
}

@Component({
  selector: 'app-filterandsort',
  templateUrl: './filterandsort.component.html',
  styleUrls: ['./filterandsort.component.css']
})
export class FilterandsortComponent implements OnInit {

  constructor(private filterservice: FilterService, private msg: MessengerService,
              private route: ActivatedRoute) { }


  Filters: IFilters = {
    selectedFilters: {
      gender: '',
      category: '',
      subcategory: ''
    },
    selectedSize: '',
    availableSizes: ['M', 'L', 'XL']
  };


  ngOnInit(): void {
    this.handleSubscription();
    this.getSizes();
  }

  async ChangeFilters(value: string, category: string, type: string): Promise<void>
  {
    if (value === 'set')
    {
      value = this.Filters.selectedSize;
    }
    this.filterservice.ChangeFilters(value, category, type);
  }

  handleSubscription(): void
  {
    // get selected Filters from Query Parameters
    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(query => {
      this.Filters.selectedFilters.gender = query.g || '';
      this.Filters.selectedFilters.category = query.c || '';
      this.Filters.selectedFilters.subcategory = query.s || '';
      this.Filters.selectedSize = query.size || '';
    });
    // tslint:disable-next-line: deprecation
    this.msg.getFilters().subscribe(sizes => {
      this.getSizes();
    });

  }
  getSizes(): void{
    // tslint:disable-next-line: deprecation
    this.filterservice.getSizes(location.search).subscribe(sizes => {
      this.Filters.availableSizes = sizes;
    });

  }
}
