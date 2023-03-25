import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  // get All Requests Data and display in tabular format
  allConnectionRequest() {
    return this.http.get(environment.base_url + 'all_requests/')
  }
  // get bar chart data from report data API
  allReportData() {
    return this.http.get(environment.base_url + 'get_report_data/')
  }

  //update request data 
  updateConnectionRequest(data: any, selectedRow: any) {
    const formData = new FormData();
    formData.append("Applicant_Name", data.Applicant_Name);
    formData.append("Gender", data.Gender.label);
    formData.append("District", data.District.label);
    formData.append("State", data.State);
    formData.append("Pincode", data.Pincode);
    formData.append("Ownership", data.Ownership.label);
    formData.append("Category", data.Category.label);
    formData.append("Load_Applied", data.Load_Applied);
    formData.append("Date_of_Approval", moment(data.Date_of_Approval).format('YYYY-MM-DD'));
    formData.append("Modified_Date", moment(new Date()).format('YYYY-MM-DD'));
    formData.append("Status", data.Status.label);
    formData.append("Reviewer_Name", data.Reviewer_Name);
    formData.append("Reviewer_Comments", data.Reviewer_Comments);
    formData.append("ID_Number", selectedRow.ID_Number);
    formData.append("request_Id", selectedRow.request_Id);
    formData.append("Reviewer_ID", selectedRow.Reviewer_ID);
    return this.http.post(environment.base_url + 'update_requests/', formData)
  }
}
