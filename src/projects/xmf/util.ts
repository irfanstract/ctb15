

import * as util from "src/utility-functions/all" ;
export * from "src/utility-functions/all" ;











export abstract class StringKeyedDictTo<Value extends null | {}> {
  [key: string]: Value ;
} ;

export function stringConcatFromIterable(src: Iterable<string>): string ;
export function stringConcatFromIterable(src: Iterable<string>) {
  return [...src].join("") ;
}

export interface Tokenised {}
export interface Tokenised extends Iterable<string> {}








export {} ; // due to TS(1208)
