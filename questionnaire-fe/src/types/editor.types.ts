/* eslint-disable no-unused-vars */
import { Node } from '@/control/Node'

export type ComponentDesc = {
  type: string,
  x: number,
  y: number
}

export type DragPageState = {
  list: Array<ComponentDesc>
}

export enum States {
  Start,
  DragStart,
  Moving,
  Stopped,
  Selected,
  PlacingComponent,
  AddingComponent
}

export enum Actions {
  AUTO = '<auto>',
  EvtDragStart = 0,
  EvtDrag,
  EvtDrop,
  EvtDragEnd,
  StartAddComponent,
}

export type DragData = {
  dragging: boolean,
  startX: number,
  startY: number,
  x: number,
  y: number,
  diffX: number,
  diffY: number
}
export type RawDragEvents = {
  onDragstart?: (e: DragEvent) => void,
  onDragend?: (e: DragEvent) => void,
  onDrag?: (e: DragEvent) => void,
}

export type DragEvents = {
  onDragStart?: (e: Node) => void,
  onDragEnd?: (e: Node) => void,
  onDrag?: (e: Node) => void,
}
export type DraggableProps = {
  initialPosition: [number, number]
} & DragEvents

export type Meta = {
  type: string,
  w: number,
  h: number
}
