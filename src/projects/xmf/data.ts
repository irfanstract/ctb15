

import * as util from "./util" ;












import { 
  StringKeyedDictTo, 
} from "./util";
export { 
  StringKeyedDictTo, 
} ;



export type Class = (
  | string
  // | String
) ;
export interface CommentOrElementOps extends CommentOrElementOpsRe {}
export interface CommentOrElementOps {

  type: symbol | string | Class ; 
  attributes ?: null | StringKeyedDictTo<any> ;
  
  children ?: null | unknown[] ;

} 
export interface CommentNode extends CommentOrElementOps {

  type: typeof CNT ; 
  attributes ?: never ;
  
  /** 
   * describe the CommentNode's contents
   * 
   */
  children: [Node & string] ;

} 
export const CNT = Symbol("!--") ;
export interface Element extends ElementRe {}
export interface Element extends CommentOrElementOps {

  /** 
   * the element's "tag name" - I'd call it "class name" instead
   * 
   */
  type: Class ; 

  /**
   * attributes
   *  
   * due to the storage model of `attributes` being a JSON-like,
   * we can assume the {@link util._.camelCase camel-casedness} of {@link key} and therefore
   * we should {@link util._.kebabCase convert it into the `custom-op-1` style}
   * 
   */
  attributes: (
    | StringKeyedDictTo<null | boolean | number | string>
    // | { [key: string] : undefined ; }
  ) ;
  
  /**
   * optional children
   *  
   * setting to `undefined` will result in the collapsed repr `<Bar ... />`.
   * setting to `[]` (empty array) will result in the repr `<Bar></Bar>`.
   * 
   */
  children?: Node[] ;

} 
export type TextContentNode = (
  | string
) ;
export type Node = (
  | CommentNode
  | Element
  | TextContentNode
) ;



export interface CommentOrElementOps {
  srcCodeInfo ?: null | {} ;
} 



export interface CommentOrElementOpsRe {
  type: CommentOrElementOps["type"] ; 
  attributes ?: CommentOrElementOps["attributes"] ;
  children ?: null | Iterable<unknown> ;
} 
export interface ElementRe extends CommentOrElementOpsRe {
  type: Element["type"] ; 
  attributes: Element["attributes"] ;
  children?: Iterable<Node>
} 














export {} ; //  due to TS(1208)
