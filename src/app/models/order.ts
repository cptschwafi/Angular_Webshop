export class Order {

  Products: any[];
  Address: string;
  City: string;
  PostalCode: number;
  Email: string;
  Country: string;
  billingAddress: string;
  billingCity: string;
  billingPostalCode: number;
  billingCountry: string;
  Total: number;
  CustomerName: string;
  billingCustomerName: string;
  TimeStamp: string;

  constructor(Email: string, CustomerName: string, Address: string, City: string,
              PostalCode: number, Country: string, billingCustomerName: string, billingAddress: string, billingCity: string,
              billingPostalCode: number, billingCountry: string, Total= 0, Products: any[], TimeStamp: string)
  {
    this.CustomerName = CustomerName;
    this.Address = Address;
    this.City = City;
    this.PostalCode = PostalCode;
    this.Country = Country;
    this.billingCustomerName = billingCustomerName;
    this.billingAddress = billingAddress;
    this.billingCity = billingCity;
    this.billingPostalCode = billingPostalCode;
    this.billingCountry = billingCountry;
    this.Total = Total;
    this.Products = Products;
    this.Email = Email;
    this.TimeStamp = TimeStamp;
  }
}
