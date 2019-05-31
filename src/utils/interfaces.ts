import { ReactNode } from 'react'

// Reducer 的 Action
export interface Action {
  type: string, // Action 的 type
  payload?: any // 负载数据
}

// "Option Bag" 一词源自 TypeScript 官方文档，
// 用于描述一些无法确定有哪些参数的对象，常用于配置选项，因而得名。
// http://www.typescriptlang.org/docs/handbook/interfaces.html
export interface OptionBag {
  [propName: string]: any
}

export interface ImagePresetProps {
  name: string,
  width: number,
  height: number,
  mime: string,
  filename: string,
  desc: string,
  chosen: boolean,
  fillColor?: string
}

export interface ReactCommon {
  className?: string,
  children?: ReactNode
}

export interface ExportItem {
  filename: string,
  mime: string,
  data: string
}
