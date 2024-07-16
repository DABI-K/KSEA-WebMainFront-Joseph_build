import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { MessageService } from 'primeng/api';
import { KseaInfoService } from 'src/app/service/ksea-info.service';
import { PaymentService } from 'src/app/service/payment.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  providers: [MessageService],
  styleUrls: ['../../css/common.scss', './donation.component.scss'],
})
export class DonationComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  donationData: any = {};
  errorMessage: any;
  paymentLoading: boolean = false;
  apiURL = environment.apiURLs.ksea_info_api_URL;

  constructor(
    private kseaInfoService: KseaInfoService,
    private paymentService: PaymentService,
    private stripeService: StripeService,
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'auto',
  };

  ngOnInit(): void {
    this.reset();
  }
  reset() {
    this.donationData = {};
    this.donationData.chapter = 0;
    this.donationData.education = 0;
    this.donationData.nextGeneration = 0;
    this.donationData.innovationEntrepreneurship = 0;
    this.donationData.midCareer = 0;
    this.donationData.seniorMember = 0;
    this.donationData.general = 0;
    this.donationData.isAnonymousDonation = false;
    this.donationData.donationMemory = undefined;
    this.donationData.donationHonor = undefined;
    this.donationData.confirmationEmail = undefined;
  }

  subTotal() {
    if (!this.donationData.chapter) this.donationData.chapter = 0;
    if (!this.donationData.education) this.donationData.education = 0;
    if (!this.donationData.nextGeneration) this.donationData.nextGeneration = 0;
    if (!this.donationData.innovationEntrepreneurship)
      this.donationData.innovationEntrepreneurship = 0;
    if (!this.donationData.midCareer) this.donationData.midCareer = 0;
    if (!this.donationData.seniorMember) this.donationData.seniorMember = 0;
    if (!this.donationData.general) this.donationData.general = 0;

    return (
      this.donationData.chapter +
      this.donationData.education +
      this.donationData.nextGeneration +
      this.donationData.innovationEntrepreneurship +
      this.donationData.midCareer +
      this.donationData.seniorMember +
      this.donationData.general
    );
  }

  getDestinations() {
    return 'KSEA';
  }

  payAndSubmit() {
    this.paymentLoading = true;
    this.paymentService
      .createCustomerWithoutToken('donor', this.donationData.confirmationEmail)
      .subscribe((customerData: any) => {
        console.log(customerData);

        if (customerData.id) {
          this.stripeService
            .createToken(this.card.element, {
              name: this.donationData.confirmationEmail,
            })
            .subscribe((result) => {
              if (result.token) {
                this.errorMessage = null;
                this.paymentService
                  .payOnetimeWithoutToken(
                    result.token.id,
                    this.subTotal(),
                    this.donationData.confirmationEmail,
                    '[KSEA-Donation]' +
                      this.donationData.confirmationEmail +
                      ' Chapter:' +
                      this.donationData.chapter +
                      ' EDU:' +
                      this.donationData.education +
                      ' NextGen:' +
                      this.donationData.nextGeneration +
                      ' Innov:' +
                      this.donationData.innovationEntrepreneurship +
                      ' MidCareer:' +
                      this.donationData.midCareer +
                      ' Senior:' +
                      this.donationData.seniorMember +
                      ' General:' +
                      this.donationData.general +
                      ' ' +
                    customerData.id
                  )
                  .subscribe({
                    next: (paymentResult: any) => {
                      const result = paymentResult;
                      if (result.status === 'succeeded') {
                        this.donationData.id = customerData.id;
                        this.donationData.total = this.subTotal();
                        console.log(result);
                        this.putDonationData();
                      } else {
                        this.errorMessage = 'The payment is failed.';
                      }
                    },
                    error: (error) => {
                      this.paymentLoading = false;
                      alert(error.error);
                      console.log('oops', error);
                    },
                  });
              } else if (result.error) {
                this.paymentLoading = false;
                this.errorMessage = result.error.message;
              }
            });
        }
      });
  }
  putDonationData() {
    this.http
      .put<any>(
        this.apiURL + '/ksea-api/donation',
        JSON.stringify(this.donationData),
        this.httpOptions
      )
      .subscribe((res) => {
        this.http
          .get(
            'https://ksea-files.s3.us-west-2.amazonaws.com/emailTemplates/KSEA+Donation+receipt_template_3.html',
            {
              responseType: 'text',
            }
          )
          .subscribe((data) => {
            const htmlContents = data
              .split('$NAME$')
              .join(this.donationData.name)
              .split('$EMAIL$')
              .join(this.donationData.confirmationEmail)
              .split('$DATE$')
              .join(new Date().toDateString())


              .split('$CHAPTER$')
              .join('' + this.donationData.chapter)
              .split('$EDUCATION$')
              .join('' + this.donationData.education)
              .split('$NEXTGEN$')
              .join('' + this.donationData.nextGeneration)
              .split('$INNOVATION$')
              .join('' + this.donationData.innovationEntrepreneurship)
              .split('$MIDCAREER$')
              .join('' + this.donationData.midCareer)
              .split('$SENIOR$')
              .join('' + this.donationData.seniorMember)
              .split('$GENERAL$')
              .join('' + this.donationData.general)




              .split('$AMOUNT$')
              .join('' + this.donationData.total)
              .split('$DESINATIONS$')
              .join('' + this.getDestinations());

            const emailData: any = {
              toEmails: [this.donationData.confirmationEmail, 'itm@ksea.org'],
              subject: 'KSEA Donation Confirmation',
              htmlMessage: htmlContents,
            };

            this.http
              .post<any>(
                environment.apiURLs.email_api_URL + '/sendSimpleEmail',
                JSON.stringify(emailData),
                this.httpOptions
              )
              .subscribe((res) => {
                this.paymentLoading = false;
                this.reset();
                this.messageService.add({
                  severity: 'info',
                  summary: 'Donation processed',
                  detail: 'Thank you for your donation.',
                });
              });
          });
      });
  }
}
