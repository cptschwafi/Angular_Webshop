import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }
  sendMessage(): void{
    // TODO SEND EMAIL TO MYSELF WITH MESSAGE
  }

  onSubmit(): void {
    if (this.contactForm.valid)
    {
      this.sendMessage();
    }
    else{
      this.contactForm.markAllAsTouched();
    }
  }

}
