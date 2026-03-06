import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatmapCanvasDirective } from '@alisaitteke/seatmap-canvas/angular';
import { VENUE_DATA, SEATMAP_OPTIONS } from '../../data/venue-data';

@Component({
  selector: 'app-directive-example',
  standalone: true,
  imports: [CommonModule, SeatmapCanvasDirective],
  template: `
    <div class="example-section">
      <h2>Directive Approach</h2>
      <p>DOM-attached approach using Angular directive with template reference.</p>

      <div 
        class="seatmap-container"
        seatmapCanvas
        [seatmapData]="venueData"
        [seatmapAutoZoom]="true"
        (seatmapReady)="onReady($event)"
        (seatmapSeatClick)="onSeatClick($event)"
        (seatmapSeatSelect)="onSeatSelect($event)"
        (seatmapSeatUnselect)="onSeatUnselect($event)"
        (seatmapBlockClick)="onBlockClick($event)"
        #seatmap="seatmapCanvas">
      </div>

      <div class="controls">
        <button (click)="seatmap.zoomToVenue()">Reset Zoom</button>
        <button (click)="seatmap.zoomToBlock('block-a')">Zoom to Block A</button>
        <button (click)="seatmap.zoomToBlock('block-b')">Zoom to Block B</button>
        <button (click)="seatmap.zoomToBlock('block-c')">Zoom to VIP</button>
        <button (click)="logSelectedSeats(seatmap)">Log Selected Seats</button>
        <button (click)="getBlocks(seatmap)">Get All Blocks</button>
      </div>

      <div class="info-panel">
        <h3>Directive Template Reference</h3>
        <p>Using <code>#seatmap="seatmapCanvas"</code> to access directive methods</p>
        <p><strong>Selected Count:</strong> {{ selectedCount }}</p>
        <p *ngIf="lastEvent"><strong>Last Event:</strong> {{ lastEvent }}</p>
        <p *ngIf="blocksInfo"><strong>Blocks:</strong> {{ blocksInfo }}</p>
      </div>
    </div>
  `
})
export class DirectiveExampleComponent {
  venueData = VENUE_DATA;
  selectedCount = 0;
  lastEvent = '';
  blocksInfo = '';

  onReady(instance: any) {
    console.log('Directive ready:', instance);
    this.lastEvent = 'Directive initialized';
  }

  onSeatClick(seat: any) {
    console.log('Seat clicked:', seat);
    this.lastEvent = `Seat clicked: ${seat.id}`;
  }

  onSeatSelect(seat: any) {
    console.log('Seat selected:', seat);
    this.selectedCount++;
    this.lastEvent = `Seat selected: ${seat.id}`;
  }

  onSeatUnselect(seat: any) {
    console.log('Seat unselected:', seat);
    this.selectedCount--;
    this.lastEvent = `Seat unselected: ${seat.id}`;
  }

  onBlockClick(block: any) {
    console.log('Block clicked:', block);
    this.lastEvent = `Block clicked: ${block.id}`;
  }

  logSelectedSeats(directive: any) {
    const selected = directive.getSelectedSeats();
    console.log('Selected seats:', selected);
    this.lastEvent = `${selected.length} seats selected`;
  }

  getBlocks(directive: any) {
    const blocks = directive.getBlocks();
    const blockTitles = blocks.map((b: any) => b.title).join(', ');
    this.blocksInfo = blockTitles;
    console.log('Blocks:', blocks);
  }
}
