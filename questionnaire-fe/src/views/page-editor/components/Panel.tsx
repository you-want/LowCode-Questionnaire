import { Editor } from '@/control/Editor'
import { Actions } from '@/types/editor.types'
import { Render } from './Render'
import classes from '../index.module.less'

export const Panel = ({ editor } : {
  editor : Editor
}) => {
  const onDragover = (e: { preventDefault: () => void; clientX: any; clientY: any }) => {
    e.preventDefault()
    editor.dispatch(Actions.EvtDrag, [
      e.clientX,
      e.clientY
    ])
  }
  const onDrop = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    editor.dispatch(Actions.EvtDrop)
  }
  return (
    <div
      class={classes.panel}
      onDragover={onDragover}
      onDrop={onDrop}
    >
      <Render node={editor.getRoot()} />
    </div>
  )
}
