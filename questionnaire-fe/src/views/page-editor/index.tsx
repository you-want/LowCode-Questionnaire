import { defineComponent, provide } from 'vue'
import ItemList from './components/item-list'
import { Panel } from './components/Panel'
import { Editor } from '@/control/Editor'
import './index.less'
import classes from './index.module.less'

export default defineComponent({
  setup () {
    const editor = new Editor()
    provide('editor', editor)

    return () => {
      return (
        <div class={classes.page}>
          <ItemList editor={editor} />
          <Panel editor={editor} />
        </div>
      )
    }
  }
})
