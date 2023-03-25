import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { RequestsService } from 'src/app/services/requests.service';
import * as moment from 'moment';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  chart: any;
  constructor(private _requestService: RequestsService) { }
  ngOnInit() {
    this.init();
  }

  //initialze bar chart data
  init() {

    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Electricity Connection Request Report'
      },
      credits: {
        enabled: false
      },
      series: [
      ]
    });
    // load dynamic values into the chart
    this._requestService.allReportData().subscribe(
      {
        next: (res: any) => {
          let data: any = [];
          if (res['data']) {
            if (res['data']['requests'] && res['data']['requests'].length) {
              res['data']['requests'].forEach((element: any, index: any) => {
                console.log("index", index);
                let approved = res['data']['approved'] && res['data']['approved'][index] && res['data']['approved'][index]['total'] ? res['data']['approved'][index]['total'] : 0
                let pending = res['data']['pending'] && res['data']['pending'][index] && res['data']['pending'][index]['total'] ? res['data']['pending'][index]['total'] : 0
                let release = res['data']['release'] && res['data']['release'][index] && res['data']['release'][index]['total'] ? res['data']['release'][index]['total'] : 0
                this.chart.addSeries(
                  {
                    name: moment(new Date(element['month'])).format('YYYY-MM-DD'),
                    type: 'column',
                    data: [["Total", element['total']], ['Approved', approved], ["Pending", pending], ['Connection Release', release]],
                  });

              });
            }
          }
        },
        error: (err) => { }
      }
    )
  }
}
