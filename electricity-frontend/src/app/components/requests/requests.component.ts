import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { RequestsService } from 'src/app/services/requests.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  // @ViewChild('dt') dt: Table;
  gender = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }

  ]
  district = [
    { label: 'North', value: 'North' },
    { label: 'South', value: 'South' },
    { label: 'East', value: 'East' },
    { label: 'West', value: 'West' }

  ]
  ownership = [
    { label: 'JOINT', value: 'JOINT' },
    { label: 'INDIVIDUAL', value: 'INDIVIDUAL' },

  ]
  GovtIDOptions = [
    { label: 'VOTER_ID', value: 'VOTER_ID' },
    { label: 'PAN', value: 'PAN' },
    { label: 'AADHAR', value: 'AADHAR' },
    { label: 'PASSPORT', value: 'PASSPORT' },

  ]
  CategoryOptions = [
    { label: 'Commerical', value: 'Commerical' },
    { label: 'Residential', value: 'Residential' },

  ]
  statusOptions = [
    { label: 'Approved', value: 'Approved' },
    { label: 'Rejected', value: 'Rejected' },
    { label: 'Connection Released', value: 'Connection Released' },

  ]
  form: FormGroup;
  requestData = [];
  selectedRow = {};
  displayRow: any = [];
  displayEditDialog: boolean = false;
  displayViewDialog: boolean = false;
  displayDateFilterDialog: boolean = false;
  start_date: any;
  end_date: any;
  minDate: any;
  constructor(private _requestService: RequestsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    fb: FormBuilder) {
    this.form = fb.group({
      ID_Number: [null, Validators.required],
      Applicant_Name: [null, Validators.required],
      Gender: [null, Validators.required],
      District: [null, Validators.required],
      State: [null, Validators.required],
      Pincode: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9\s]{0,10}$')]],
      Ownership: [null, Validators.required],
      GovtID_Type: [null, Validators.required],
      Category: [null, Validators.required],
      Load_Applied: [null, Validators.required],
      Date_of_Application: [null, Validators.required],
      Date_of_Approval: [null, Validators.required],
      // Modified_Date: [null, Validators.required],
      Status: [null, Validators.required],
      Reviewer_Name: [null, Validators.required],
      Reviewer_Comments: [null, Validators.required],

    })
  }

  ngOnInit() {
    this.loadData();
  }
  // get request data from API and assign to the table
  loadData() {
    this._requestService.allConnectionRequest().subscribe(
      {
        next: (res: any) => {
          if (res['data']) {
            let extractedData: any = [];
            res['data'].forEach((element: any) => {
              extractedData.push({
                ...element['requests'],
                ...element['reviewer'],
                Category: element['Category'],
                Date_of_Application: element['Date_of_Application'],
                Date_of_Approval: element['Date_of_Approval'],
                ID_Number: element['ID_Number'],
                Load_Applied: element['Load_Applied'],
                // Modified_Date: element['Modified_Date'],
                Status: element['Status']
              });
            });

            this.requestData = extractedData;
          }
        },
        error: (err) => { }
      }
    )
  }

  applyFilterGlobal($event: any, stringVal: string, dt: any) {
    dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  onView(request: any) {
    this.displayRow = [];
    this.displayRow.push(request);
    this.displayViewDialog = true;
  }
  showEditDialog(request: any) {
    //on select row patch value to the form
    this.selectedRow = request;
    this.form.patchValue({
      Applicant_Name: request.Applicant_Name,
      Gender: { label: request.Gender, value: request.Gender },
      District: { label: request.District, value: request.District },
      State: request.State,
      Pincode: request.Pincode,
      Ownership: { label: request.Ownership, value: request.Ownership },
      GovtID_Type: { label: request.GovtID_Type, value: request.GovtID_Type },
      Category: { label: request.Category, value: request.Category },
      Load_Applied: request.Load_Applied,
      Date_of_Application: new Date(request.Date_of_Application).toLocaleString(),
      Date_of_Approval: new Date(request.Date_of_Approval),
      Status: { label: request.Status, value: request.Status },
      Reviewer_Name: request.Reviewer_Name,
      Reviewer_Comments: request.Reviewer_Comments,
      ID_Number: request.ID_Number

    })
    this.form.controls['Date_of_Application'].disable();
    this.form.controls['GovtID_Type'].disable();
    this.form.controls['Date_of_Application'].disable();
    this.form.controls['ID_Number'].disable();
    this.displayEditDialog = true;
  }
  onFormSubmit() {
    // check for valid or not if yes then ask for confirmation
    if (this.form.valid) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          //update request details
          this.displayEditDialog = false;
          this._requestService.updateConnectionRequest(this.form.value, this.selectedRow).subscribe(
            {
              next: (res: any) => {
                if (res['status'])
                  this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record Updated' });
                this.loadData();
              },
              error: (err) => {
                this.messageService.add({ severity: 'warn', summary: 'Not Updated', detail: 'Record Not Updated' });
              }
            }
          )
        },
        reject: () => {

        }
      });
    }
  }
  onApplyDateFilter() {
    let start_date = new Date(this.start_date).getTime();
    let end_date = new Date(this.end_date).getTime();
    this.requestData = this.requestData.filter((d: any) => {
      var time = new Date(d.Date_of_Application).getTime();
      return (start_date < time && time < end_date);
    });
    this.displayDateFilterDialog = false;
  }
  onDateSelect(event: any) {
    this.minDate = new Date(event);

  }
  onResetDateFilter() {
    this.loadData();
    this.displayDateFilterDialog = false;

  }
}
