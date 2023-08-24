// To parse this data:
//
//   import { Convert, Tree } from "./file";
//
//   const tree = Convert.toTree(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Tree {
  id: number;
  type: string;
  orientation: string;
  percent: null;
  urgent: boolean;
  marks: any[];
  focused: boolean;
  layout: string;
  border: string;
  current_border_width: number;
  rect: DecoRect;
  deco_rect: DecoRect;
  window_rect: DecoRect;
  geometry: DecoRect;
  name: string;
  window: null;
  nodes: TreeNode[];
  floating_nodes: any[];
  focus: number[];
  fullscreen_mode: number;
  sticky: boolean;
}

export interface DecoRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TreeNode {
  id: number;
  type: string;
  orientation: string;
  percent: number | null;
  urgent: boolean;
  marks: any[];
  focused: boolean;
  layout: string;
  border: string;
  current_border_width: number;
  rect: DecoRect;
  deco_rect: DecoRect;
  window_rect: DecoRect;
  geometry: DecoRect;
  name: string;
  window: null;
  nodes: TreeNode[];
  floating_nodes: any[];
  focus: number[];
  fullscreen_mode: number;
  sticky: boolean;
  primary?: boolean;
  make?: string;
  model?: string;
  serial?: string;
  modes?: Mode[];
  non_desktop?: boolean;
  active?: boolean;
  dpms?: boolean;
  power?: boolean;
  scale?: number;
  scale_filter?: string;
  transform?: string;
  adaptive_sync_status?: string;
  current_workspace?: string;
  current_mode?: Mode;
  max_render_time?: number;
  app_id?: null | string;
  window_properties?: WindowProperties;
}

export interface Mode {
  width: number;
  height: number;
  refresh: number;
  picture_aspect_ratio: string;
}

export interface IdleInhibitors {
  user: string;
  application: string;
}

export interface WindowProperties {
  class: string;
  instance: string;
  title: string;
  transient_for: null;
  window_type: string;
  window_role?: string;
}
