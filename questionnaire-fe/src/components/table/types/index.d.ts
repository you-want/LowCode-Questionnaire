import { ValidationRule } from 'ant-design-vue/lib/form/Form'
import { Component } from 'vue'
import { SUPORTED_FORM_TYPE } from '../constans'
export interface ITableAction {
  title: string;
  event?: Function | string;
  icon?: Component
}
export interface ITableQuerys {
  type: typeof SUPORTED_FORM_TYPE[number];
  name: string;
  label?: string;
  rules?: ValidationRule | ValidationRule[]
  placeholder?: string;
  value?: any;
  options?: {
    key: any,
    label: string
  }[]
}
