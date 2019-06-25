import { ReactNode } from 'react'

// Reducer 的 Action
export interface Action {
   /**
    * @description Action 的 type
    */
  type: string,
   /**
    * @description 负载数据
    */
  payload?: any
}

/**
 * @description "Option Bag" 一词源自 TypeScript 官方文档，
 * 用于描述无法确定有哪些具体属性的对象，常用作配置项，因而得名。
 * http://www.typescriptlang.org/docs/handbook/interfaces.html
 */
export interface OptionBag {
  [propName: string]: any
}

/**
 * @description 图片预设
 */
export interface ImagePresetProps {
  /**
   * @description 预设名称
   */
  name: string,
  /**
   * @description 预设描述
   */
  desc: string,
  /**
   * @description 图片宽度
   */
  width: number,
  /**
   * @description 图片高度
   */
  height: number,
  /**
   * @description 图片 MIME 类型
   */
  mime: string,
  /**
   * @description 生成的文件名
   */
  filename: string,
  /**
   * @description 是否被选中
   */
  chosen: boolean,
  /**
   * @description 填充色（用于 Windows Tile）
   */
  fillColor?: string
}

/**
 * @description React 常用属性的集合，通常作为基类用于创建新的接口
 */
export interface ReactCommon {
  className?: string,
  children?: ReactNode
}

/**
 * @description 用于描述导出对象
 */
export interface ExportItem {
  /**
   * @description 导出文件名
   */
  filename: string,
  /**
   * @description 导出文件的 MIME 类型
   */
  mime: string,
  /**
   * @description 导出文件的数据
   */
  data: string
}
