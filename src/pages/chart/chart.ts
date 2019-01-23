import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {
  public doughnutChartLabels: string[] = ['Correctas', 'Incorrectas'];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';
  public test: any;
  public grade: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.test = this.navParams.get('test');
    this.grade = (this.test.correctAnswers / 20) * 10;
    this.fillDoughnutChart();

  }
  fillDoughnutChart() {
    this.doughnutChartData.push(Number(this.test.correctAnswers));
    this.doughnutChartData.push(Number(this.test.incorrectAnswers));
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

}
