import { App } from 'vue'
import {
  Form,
  Input,
  Radio,
  Select,
  Table,
  Layout,
  Card,
  Button,
  Breadcrumb,
  Tooltip,
  DatePicker,
  Avatar,
  Dropdown,
  Menu,
  ConfigProvider,
  Checkbox,
  Switch,
  Collapse,
  Rate,
  Empty,
  Tabs,
  Space,
  InputNumber,
  Modal,
  Tag,
  Result,
  Divider,
  Alert,
  Popconfirm
} from 'ant-design-vue'
const install = (app: App) => {
  app
    .use(Form)
    .use(Table)
    .use(Layout)
    .use(Card)
    .use(Input)
    .use(Radio)
    .use(Select)
    .use(Button)
    .use(Breadcrumb)
    .use(Tooltip)
    .use(DatePicker)
    .use(Avatar)
    .use(Dropdown)
    .use(Menu)
    .use(ConfigProvider)
    .use(Checkbox)
    .use(Switch)
    .use(Collapse)
    .use(Rate)
    .use(Empty)
    .use(Tabs)
    .use(Space)
    .use(InputNumber)
    .use(Modal)
    .use(Tag)
    .use(Result)
    .use(Divider)
    .use(Alert)
    .use(Popconfirm)
}

export default install
