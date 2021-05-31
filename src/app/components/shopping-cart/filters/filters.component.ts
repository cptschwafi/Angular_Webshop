import { MessengerService } from 'src/app/services/messenger.service';
import { FilterCategory } from './../../../models/filter-category';
import { FilterService } from './../../../services/filter.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  // availableFilters that get shown
  availableFilters = { genders: ['Damen', 'Herren'] ,
   filters: [new FilterCategory('', [''])]
  };

  // Gets toggled when burger menu is clicked in mobile view
  displayfilters = true;


  constructor(private filterservice: FilterService, private msg: MessengerService) { }

  ngOnInit(): void {
    this.loadFilters();
    this.handleSubscription();

  }
  loadFilters(): void {

    this.filterservice.getFilters(location.search).subscribe(filters =>
      {
        this.availableFilters.filters = filters;
      }
      );
  }
  async ChangeFilters(value: string, category: string, type: string): Promise<void>
  {
    this.filterservice.ChangeFilters(value, category, type);
  }

  handleSubscription(): void{
    this.msg.getBurgerToggle().subscribe(data =>
      {
        if (this.displayfilters && window.scrollY === 0 && window.innerWidth < 768)
        {
          this.displayfilters = false;
        }
        else{
          this.displayfilters = true;
        }
        this.scrollToTop();
      });
    this.msg.getFilters().subscribe(data => {
      this.loadFilters();
        });
  }

  scrollToTop(): void {
    (function smoothscroll(): void {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 8));
        }
    })();
}
}
