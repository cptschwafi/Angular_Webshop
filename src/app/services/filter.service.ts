import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MessengerService } from 'src/app/services/messenger.service';
import { Injectable } from '@angular/core';
import { FilterCategory } from '../models/filter-category';
import { filtersUrl } from '../config/apiconfig';
import { Observable } from 'rxjs';


interface QueryParameters{
  // gender
  g?: string;
  // category
  c?: string;
  // subcategory
  s?: string;
  // subcategory
  size?: string;
}

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  constructor(private msg: MessengerService, private router: Router, private route: ActivatedRoute, private http: HttpClient)
  {
  }

  AllFilters: FilterCategory[] = [];

  getFilters(query: string): Observable<FilterCategory[]>
  {
    return this.http.get<FilterCategory[]>(filtersUrl + query);
  }
  getSizes(query: any ): Observable<string[]>
  {
    return this.http.get<string[]>(filtersUrl + '/sizes' + query);
  }

  async ChangeFilters(value: string, category: string, type: string): Promise<void>
  {
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    const queryparams: QueryParameters = <any> {};

    // Get current query Params from URL
    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(data => {
      queryparams.g = data.g;
      queryparams.c = data.c;
      queryparams.s = data.s;
      queryparams.size = data.size;
    });

    // ADD New selected Filfters to QueryParams
    switch ( type ) {
      case 'gender':
        queryparams.g = value;
       // delete queryparams.size; //OPTIONAL DEPENDS ON TASTE
        break;
      case 'subcategory':
        queryparams.c = category;
        delete queryparams.size;
        if (value === 'all')
        {
          delete queryparams.s;
        }
        else
        {
          queryparams.s = value;
        }
        break;

      case 'size':
        queryparams.size = value;
        break;

      case 'resetallfilters':
        delete queryparams.g;
        delete queryparams.c;
        delete queryparams.s;
        delete queryparams.size;
        break;

      case 'reset':
        if (value === 'size')
        {
          delete queryparams.size;
        }
        else if (value === 'subcategory')
        {
          delete queryparams.s;
        }
        else if (value === 'category')
        {
          delete queryparams.s;
          delete queryparams.c;
        }
        else if (value === 'gender')
        {
          delete queryparams.g;
        }
        break;
    }

    await this.router.navigate(['home/'], {queryParams: queryparams});
    // NOTIFY FILTERS CHANGED
    this.msg.filtersChanged();

  }



}

