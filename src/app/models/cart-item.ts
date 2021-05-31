export class CartItem {

  itemid: string;
  // Database Id
  // tslint:disable-next-line: variable-name
  _id: string;
  name: string;
  price: number;
  ImageUrl: string;
  selectedSize: string;
  quantity: number;

  // tslint:disable-next-line: variable-name
  constructor(itemid: string, _id= '', name: string, price= 0, ImageUrl = '' , selectedSize= '', quantity: number)
  {
    // ID OF THE PRODUCT IN DATABASE
    this.itemid = itemid;
    // ID OF THE CART ITEM TO IDENTIFY
    this._id = _id;
    this.name = name;
    this.price = price;
    this.ImageUrl = ImageUrl;
    this.selectedSize = selectedSize;
    this.quantity = quantity;

  }
}
