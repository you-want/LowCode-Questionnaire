import { Emitter } from './Emitter'
import { Topics } from './Topics'

export class DragData extends Emitter<number> {
  private startX: number = 0
  private startY: number = 0
  private diffX: number = 0
  private diffY: number = 0

  start (e: DragEvent) {
    this.startX = e.clientX
    this.startY = e.clientY
    this.diffX = 0
    this.diffY = 0
  }

  update (e: DragEvent) {
    this.diffX = e.clientX - this.startX
    this.diffY = e.clientY - this.startY
    this.emit(Topics.DragDataUpdated)
  }

  getDiffX () {
    return this.diffX
  }

  getDiffY () {
    return this.diffY
  }
}
