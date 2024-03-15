export interface ForceDirectedGraph {
  nodes: ForceDirectedGraphNode[];
  links: ForceDirectedGraphLink[];
}

export interface ForceDirectedGraphLink {
  source: string;
  target: string;
}

export interface ForceDirectedGraphNode {
  value: string;
}
