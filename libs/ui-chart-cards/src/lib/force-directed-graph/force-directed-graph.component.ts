import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import * as D3 from 'd3';
import { D3GraphDataGenerator } from './d3-graph-data-generator';
import { D3Graph } from './d3-graph-data.model';
import { CommonMaterialModule } from '@wyn/material';
import { CommonModule } from '@angular/common';
import { ForceDirectedGraph } from '../../models/force-directed-graph.model';
import { chartColorScheme } from '../chart-color-scheme';

@Component({
  selector: 'wyn-force-directed-graph-card',
  standalone: true,
  imports: [CommonModule, CommonMaterialModule],
  templateUrl: './force-directed-graph.component.html',
  styleUrl: './force-directed-graph.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForceDirectedGraphComponent implements OnChanges {
  friendsGraph = input.required<ForceDirectedGraph>();
  title = input<string>(); // TODO: use this value

  isAtSimulationEnd = false;

  private svg!: any;
  private simulation!: any;
  private width = 900;
  private height = 350;
  private readonly cd = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['friendsGraph']) {
      // Ideally we would not re-draw the whole graph when the friend graph changes
      this.createSvg();

      const d3Graph: D3Graph = this.getD3GraphFromForceDirectedGraph(
        this.friendsGraph()
      );
      this.drawGraph(d3Graph);
    }
  }

  private getD3GraphFromForceDirectedGraph(
    friendsGraph: ForceDirectedGraph
  ): D3Graph {
    const generator: D3GraphDataGenerator = new D3GraphDataGenerator(
      friendsGraph
    );
    return generator.generate();
  }

  private createSvg() {
    this.isAtSimulationEnd = false;
    D3.select('figure.dag-container').html('');

    this.svg = D3.select('figure.dag-container')
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('display', 'inline-block')
      .attr('position', 'absolute')
      .attr('top', '0')
      .attr('left', '0');
  }

  private drawGraph(graph: D3Graph): void {
    this.simulation = D3.forceSimulation()
      .force(
        'link',
        D3.forceLink()
          .id((d: any) => d['id'])
          .distance(80)
      )
      .force('charge', D3.forceManyBody().strength(-30))
      .force('center', D3.forceCenter(this.width / 2, this.height / 2));

    const link = this.svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter()
      .append('line')
      .attr('stroke-width', 1)
      .attr('stroke', '#999');

    const node = this.svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(graph.nodes)
      .enter()
      .append('g');

    const circles = node
      .append('circle')
      .attr('r', (d: any) => {
        return 8 + d.numFriends;
      })
      .attr('fill', (d: any, i: number) => {
        const numColors = chartColorScheme.domain.length;
        const modIdx = i % numColors;
        return chartColorScheme.domain[modIdx];
      })
      .attr('stroke-width', 1)
      .attr('stroke', '#fff');

    // .call(D3.drag()
    //   .on('start', this.onDragStart)
    //   .on('drag', this.onDrag)
    //   .on('end', this.onDragEnd));
    // TODO: Fix drag functionality if I have time

    const labels = node
      .append('text')
      .text(function (d: any) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', (d: any) => d.numFriends + 15)
      .attr('font-size', '12px');

    node.append('title').text(function (d: any) {
      return d.id;
    });

    this.simulation
      .nodes(graph.nodes)
      .on('tick', ticked)
      .on('end', () => this.onSimulationEnd());

    this.simulation.force('link').links(graph.links);

    function ticked() {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', function (d: any) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
    }
  }

  // private onDragStart(d: any) {
  //   if (!D3.event.active) this.simulation.alphaTarget(0.3).restart();
  //   d.fx = d.x;
  //   d.fy = d.y;
  // }

  // private onDrag(d: any) {
  //   d.fx = D3.event.x;
  //   d.fy = D3.event.y;
  // }

  // private onDragEnd(d: any) {
  //   if (!D3.event.active) this.simulation.alphaTarget(0);
  //   d.fx = null;
  //   d.fy = null;
  // }

  private onSimulationEnd(): void {
    this.isAtSimulationEnd = true;
    this.cd.markForCheck();
  }
}
