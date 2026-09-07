import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { InventoryService } from '../../services/inventory-service';
import { GetProductReportResponse } from '../../interfaces/get-product-report-response';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  imports: [],
  selector: 'app-dashboard-page',
  styleUrl: './dashboard-page.css',
  templateUrl: './dashboard-page.html',
})
export class DashboardPage implements AfterViewInit {
  // Reference to the canvas element in the template
  @ViewChild('movementsChart') private movementsChart!: ElementRef<HTMLCanvasElement>;

  private chartMovement!:Chart;
  
  // HTTP service injection
  private inventoryService = inject(InventoryService);

  // Signal holding low stock products list
  protected products = signal<GetProductReportResponse[]>([]);

  protected showChartMovement(labels:string[], entries:number[], exits:number[]){
    this.chartMovement = new Chart(this.movementsChart.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Entries',
            data: entries,
            borderColor: '#1c5aaf',
          },
          {
            label: 'Exits',
            data: exits,
            borderColor: '#14643f',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.inventoryService.getMovementReport().subscribe({
      next: resp => {
        if(resp.isSuccess) {
          const labels = resp.data.map(x => x.day)
          const entries = resp.data.map(x => x.entries)
          const exits = resp.data.map(x => x.exits)
          this.showChartMovement(labels, entries, exits)
        }
      }
    })
     this.inventoryService.getProductReport().subscribe({
      next: resp => {
        if(resp.isSuccess) {
          this.products.set(resp.data)
        }
      }
    })
  }
}   
