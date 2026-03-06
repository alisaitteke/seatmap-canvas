import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatmapCanvasService } from '@alisaitteke/seatmap-canvas/angular';
import { VENUE_DATA, SEATMAP_OPTIONS } from '../../data/venue-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-service-example',
  standalone: true,
  imports: [CommonModule],
  providers: [SeatmapCanvasService],
  template: `
    <div class="example-section">
      <h2>Service Approach</h2>
      <p>Programmatic control using Injectable Service with RxJS observables.</p>

      <div #container class="seatmap-container"></div>

      <div class="controls">
        <button (click)="zoomToVenue()">Reset Zoom</button>
        <button (click)="zoomToBlock('block-a')">Zoom to Block A</button>
        <button (click)="zoomToBlock('block-b')">Zoom to Block B</button>
        <button (click)="zoomToBlock('block-c')">Zoom to VIP</button>
        <button (click)="loadNewData()">Reload Data</button>
      </div>

      <div class="info-panel">
        <h3>RxJS Reactive State</h3>
        <p><strong>Ready:</strong> {{ (isReady$ | async) ? 'Yes' : 'No' }}</p>
        <p><strong>Selected Seats (Observable):</strong> {{ (selectedSeats$ | async)?.length || 0 }}</p>
        <p *ngIf="lastEvent"><strong>Last Event:</strong> {{ lastEvent }}</p>
        
        <div *ngIf="(selectedSeats$ | async) as seats">
          <p *ngIf="seats.length > 0"><strong>Seat IDs:</strong></p>
          <ul>
            <li *ngFor="let seat of seats">{{ seat.id }}</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    ul {
      margin-left: 20px;
      margin-top: 10px;
    }
    li {
      margin: 5px 0;
    }
  `]
})
export class ServiceExampleComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef;

  selectedSeats$ = this.seatmapService.selectedSeats$;
  isReady$ = this.seatmapService.isReady$;
  lastEvent = '';
  
  private subscriptions: Subscription[] = [];

  constructor(private seatmapService: SeatmapCanvasService) {}

  ngOnInit() {
    // Initialize seatmap
    const instance = this.seatmapService.initialize(
      this.container.nativeElement,
      SEATMAP_OPTIONS
    );

    if (instance) {
      // Load data
      this.seatmapService.loadData(VENUE_DATA, true);
      this.lastEvent = 'Service initialized and data loaded';

      // Subscribe to events
      this.seatmapService.addEventListener('SEAT.CLICK', (seat: any) => {
        console.log('Seat clicked:', seat);
        this.lastEvent = `Seat clicked: ${seat.id}`;
      });

      this.seatmapService.addEventListener('SEAT.SELECT', (seat: any) => {
        console.log('Seat selected:', seat);
        this.lastEvent = `Seat selected: ${seat.id}`;
      });

      this.seatmapService.addEventListener('SEAT.UNSELECT', (seat: any) => {
        console.log('Seat unselected:', seat);
        this.lastEvent = `Seat unselected: ${seat.id}`;
      });

      this.seatmapService.addEventListener('BLOCK.CLICK', (block: any) => {
        console.log('Block clicked:', block);
        this.lastEvent = `Block clicked: ${block.id}`;
      });

      // Subscribe to observables
      const selectedSub = this.selectedSeats$.subscribe(seats => {
        console.log('Selected seats changed:', seats);
      });
      this.subscriptions.push(selectedSub);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.seatmapService.destroy();
  }

  zoomToVenue() {
    this.seatmapService.zoomToVenue();
    this.lastEvent = 'Zoomed to venue';
  }

  zoomToBlock(blockId: string) {
    this.seatmapService.zoomToBlock(blockId);
    this.lastEvent = `Zoomed to ${blockId}`;
  }

  loadNewData() {
    this.seatmapService.loadData(VENUE_DATA, true);
    this.lastEvent = 'Data reloaded';
  }
}
