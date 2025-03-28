import type Form from 'ant-design-vue/lib/form/Form'
import { ValidationRule } from 'ant-design-vue/lib/form/Form'

export type TForm = InstanceType<typeof Form> | null
export type TValidatorRules = {
  [key:string]: ValidationRule | ValidationRule[],
}
