export class Product {

  id: string;
  name: string;
  description: string;
  price: number;
  ImageUrl: string;
  ProductImages: string[];
  availableSizes: string[];
  selectedSize: string;
  gender: string;
  category: string;
  subcategory: string;

  constructor(id: string, name: string, gender: string, category: string, subcategory: string,
              description= '', price= 0, availableSizes= ['S', 'M', 'L', 'XL'], selectedSize= '',
              ImageUrl= '', ProductImages= [''], )
  {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.ImageUrl = ImageUrl;
    this.availableSizes = availableSizes;
    this.selectedSize = selectedSize;
    this.ProductImages = ProductImages;
    this.gender = gender;
    this.category = category;
    this.subcategory = subcategory;
  }
  slug(): string
  {
    const Slug = this.name.replace(' ', '-');
    return Slug;

  }
}


