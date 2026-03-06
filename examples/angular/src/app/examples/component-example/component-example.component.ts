import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatmapCanvasComponent } from '@alisaitteke/seatmap-canvas/angular';
import { VENUE_DATA, SEATMAP_OPTIONS } from '../../data/venue-data';

@Component({
  selector: 'app-component-example',
  standalone: true,
  imports: [CommonModule, SeatmapCanvasComponent],
  template: `
    <div class="example-section">
      <h2>Component Approach</h2>
      <p>Template-driven, declarative approach using Angular component.</p>

      <div class="seatmap-container">
        <seatmap-canvas
          [data]="venueData"
          [options]="seatmapOptions"
          [autoZoomToVenue]="true"
          className="my-seatmap"
          (ready)="onSeatmapReady($event)"
          (seatClick)="onSeatClick($event)"
          (seatSelect)="onSeatSelect($event)"
          (seatUnselect)="onSeatUnselect($event)"
          (blockClick)="onBlockClick($event)"
        />
      </div>

      <div class="controls">
        <button (click)="resetZoom()">Reset Zoom</button>
        <button (click)="zoomToBlock('block-a')">Zoom to Block A</button>
        <button (click)="zoomToBlock('block-b')">Zoom to Block B</button>
        <button (click)="zoomToBlock('block-c')">Zoom to VIP</button>
      </div>

      <div class="info-panel">
        <h3>Event Log</h3>
        <p><strong>Selected Seats:</strong> {{ selectedSeats.length }}</p>
        <p *ngIf="lastEvent"><strong>Last Event:</strong> {{ lastEvent }}</p>
        <p *ngIf="lastClickedSeat"><strong>Last Clicked:</strong> {{ lastClickedSeat }}</p>
      </div>
    </div>
  `
})
export class ComponentExampleComponent {
  venueData = VENUE_DATA;
  seatmapOptions = SEATMAP_OPTIONS;
  selectedSeats: any[] = [];
  lastEvent = '';
  lastClickedSeat = '';
  private seatmapInstance: any = null;

  onSeatmapReady(instance: any) {
    console.log('Seatmap ready:', instance);
    this.seatmapInstance = instance;
    this.lastEvent = 'Seatmap initialized';
  }

  onSeatClick(seat: any) {
    console.log('Seat clicked:', seat);
    this.lastClickedSeat = seat.id;
    this.lastEvent = `Seat clicked: ${seat.id}`;
  }

  onSeatSelect(seat: any) {
    console.log('Seat selected:', seat);
    this.updateSelectedSeats();
    this.lastEvent = `Seat selected: ${seat.id}`;
  }

  onSeatUnselect(seat: any) {
    console.log('Seat unselected:', seat);
    this.updateSelectedSeats();
    this.lastEvent = `Seat unselected: ${seat.id}`;
  }

  onBlockClick(block: any) {
    console.log('Block clicked:', block);
    this.lastEvent = `Block clicked: ${block.id}`;
  }

  resetZoom() {
    if (this.seatmapInstance) {
      this.seatmapInstance.zoomManager.zoomToVenue();
      this.lastEvent = 'Zoom reset to venue';
    }
  }

  zoomToBlock(blockId: string) {
    if (this.seatmapInstance) {
      const block = this.seatmapInstance.data.getBlock(blockId);
      if (block) {
        this.seatmapInstance.zoomManager.zoomToBlock(block);
        this.lastEvent = `Zoomed to ${blockId}`;
      }
    }
  }

  private updateSelectedSeats() {
    if (this.seatmapInstance) {
      this.selectedSeats = this.seatmapInstance.data.getSelectedSeats();
    }
  }
}
