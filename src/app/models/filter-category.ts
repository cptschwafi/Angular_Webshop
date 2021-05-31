export class FilterCategory {
  categoryname: string;
  subcategories: string [] = [];
  constructor(categoryname: string, subcategories: string[])
  {
    this.categoryname = categoryname;
    this.subcategories = subcategories;
  }
}
