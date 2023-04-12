

import * as util from "./util" ;












import { 
  StringKeyedDictTo, 
} from "./util";
export { 
  StringKeyedDictTo, 
} ;



import { 
  Class ,
  CNT , 
} from "./data";



import {

  Node, 
  CommentNode ,
  Element ,
  CommentOrElementOps ,
  TextContentNode ,
  
} from "./data";



import { 
  CommentOrElementOpsRe, 
  ElementRe ,
} from "./data";



export function stringifyElement(value: CommentNode | Element): Tokenised ;
export function stringifyElement(e: CommentNode | Element) {
  return {
    *[Symbol.iterator]() {
      switch (e.type) {

      case CNT :
        yield "<!--" ;
        for (const child of (e.children ?? []) ) {
          yield* stringifyNode(child) ;
        }
        yield "-->" ;
        return ;
        
      default :
        const cls = (
          (e.type satisfies string)
        ) ;
        yield "<" ;
        yield cls ;
        yield " " ;
        for (const [key, value] of Object.entries(e.attributes) ) {
          /** 
           * due to the storage model of `attributes` being a JSON-like,
           * we can assume the {@link util._.camelCase camel-casedness} of {@link key} and therefore
           * we should {@link util._.kebabCase convert it into the `custom-op-1` style}
           */
          yield util._.kebabCase(key) ;
          Switch1:
          switch(typeof value) {

            case "boolean" :
              switch (value) {
                case true :
                  break Switch1 ;
                case false :
                  yield "=none" ;
                  break Switch1 ;
              }
              
            default:
              yield "=" ;
              yield JSON.stringify(value) ;
              break Switch1 ;

          }
          yield " " ;
        }
        if (e.children) {
          yield ">"
          yield "\r\n" ;
          for (const child of e.children ) {
            yield* stringifyNode(child) ;
            yield "\r\n" ;
          }
          yield "</"
          yield cls ;
          yield ">" ;
        } else {
          yield "/>" ;
        }

      }
    }
  } satisfies {
    [Symbol.iterator](): Generator<string> ;
  } ;
}

export function stringifyNode(value: Node): Tokenised ;
export function stringifyNode(value: Node): Tokenised {
  if (typeof value === "string") {
    return [value] ;
  }
  // TODO
  return stringifyElement(value) ;
}

import { Tokenised, } from "./util";

export const example1 = (
  {
    type: "ol" ,
    attributes: { oneByOne: true, } ,
    children: [
      {
        type: "li" ,
        attributes: {} ,
        children: ["user 1",] ,
      } ,
      {
        type: "li" ,
        attributes: {} ,
        children: ["user 2",] ,
      } ,
      {
        type: "li" ,
        attributes: { keysEnabled: false, } ,
        children: ["user 4",] ,
      } ,
      {
        type: "li" ,
        attributes: { key: 5, } ,
        children: ["user 3",] ,
      } ,
    ] ,
  } satisfies Element as Element
) ;
const example1AsString = (
  util.stringConcatFromIterable((
    stringifyElement(example1)
  ))
) ;
console["log"]({ example1AsString, }) ;









export {} ; // due to TS(1208)
