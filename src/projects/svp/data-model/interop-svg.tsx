

import * as util from "src/projects/svp/util" ;












/** 
 * [https://www.w3.org/TR/SVG2/paths.html#PathDataGeneralInformation].
 * 
 */
export const tokenisePathDString: {
  (code: string): string[] ;
} = (
  (code) => (
    Array.from<string>({
      *[Symbol.iterator]() {
        loop1:
        for (let c: string = code; ; ) {
          /** 
           * get rid of all comma(s)
           */
          c = c.replace(/,/g, " ") ;

          /** 
           * discard/drop the leading whitespace on the remaining string.
           */
          c = (
            /** 
             * note that linebreaks shall be considered legal here.
             */
            c.replace(/^\s+/g, "")
          ) ;

          if (c === "") {
            /* TODO - apparently can directly `return`, can't this? */
            break loop1 ;
          }
          
          /** 
           * process the leading (necessarily non-whitespace) token.
           * 
           */
          for (const m1 of (
            /** 
             * [https://www.w3.org/TR/SVG2/paths.html#PathDataBNF].
             */
            c.match(/^(?:[A-Za-z]+|[\+\-]?(?:[0-9]*\.[0-9]+|[0-9]+))/g) 
            || []
          ) ) {
            yield (m1 satisfies string) ;
            c = c.slice((m1 satisfies string).length ) ;
            continue loop1 ;
          }
          
          throw ReferenceError(`assertion error - missing explicit continue`) ;
        }
      } ,
    })
  )
) ;




















export {} ; // TS-1208
