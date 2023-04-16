

import * as util from "src/projects/svp/util" ;












/** 
 * the position is inferred, rather than explicitly specified.
 * 
 * [the W3's spec for `<path>` `d`](https://www.w3.org/TR/SVG2/paths.html#PathData)
 * allows nodes each to have "symmetric handle".
 * for that, use this constant in place of regular `{ x, y, }`.
 * 
 */
export const POSITION_INFERRED = "auto" ;

/** 
 * [https://www.w3.org/TR/SVG2/paths.html#PathData].
 * 
 * @see we intentionally avoid making this API depend on DOM since DOM doesn't exist in SSR.
 */
export const parsePathDString: {
  (code: string): (
    (
      | (
        | { type: "M" | "m" | "L" | "l", target: DOMPointReadOnly, }
        | { type: "H" | "h" | "V" | "v", target: number, }
        | (
          | { type: "T" | "t", target: DOMPointReadOnly, ctrlPoints: [], }
          | { type: "Q" | "q", target: DOMPointReadOnly, ctrlPoints: [DOMPointReadOnly,], }
          | { type: "C" | "c", target: DOMPointReadOnly, ctrlPoints: [DOMPointReadOnly, DOMPointReadOnly], }
          | { type: "S" | "s", target: DOMPointReadOnly, ctrlPoints: [typeof POSITION_INFERRED, DOMPointReadOnly], }
        )
        | { type: "A" | "a", target: DOMPointReadOnly, radius: DOMPointReadOnly, xAxisRotation: SVGAngle, larger: boolean, sweep: boolean, }
      )
      | "z"
    )[]
  ) ;
} = (
  (code) => {
    const ct1 = (
      parsePathDStringPre(code)
    ) ;
    return (
      ct1
      .map((desc): ParsedPathCmdInfo => {
        const type = desc[0] ;
        switch (type) {
          case "z" :
            return "z" ;
          case "H" :
          case "h" :
          case "V" :
          case "v" :
            return { type: type, target: +(desc[1] ?? "") , } ;
          case "M" :
          case "m" :
          case "L" :
          case "l" :
            return { type: type, target: new DOMPoint(...desc.slice(1).map(v => +v ) ) , } ;
          case "T" :
          case "t" :
            return { type: type, target: new DOMPoint(...desc.slice(1).map(v => +v ) ) , ctrlPoints: [] , } ;
          case "S" :
          case "s" :
          case "Q" :
          case "q" :
            const [
              ctrlX = Number.NaN, 
              ctrlY = Number.NaN, 
              destX = Number.NaN, 
              destY = Number.NaN, 
            ] = (
              desc.slice(1)
              .map(v => +v )
            ) ;
            switch (type) {
              case "S" :
              case "s" :
                return { 
                  type: type, 
                  target: new DOMPoint(destX, destY) , 
                  ctrlPoints: [POSITION_INFERRED, new DOMPoint(ctrlX, ctrlY) , ] ,
                } ;
              case "Q" :
              case "q" :
                return { 
                  type: type, 
                  target: new DOMPoint(destX, destY) , 
                  ctrlPoints: [new DOMPoint(ctrlX, ctrlY) , ] ,
                } ;
            }
        }
        throw TypeError((
          JSON.stringify((
            (desc satisfies string[] ).join(" ")
          ))
        )) ;
      } )
    ) ;
  }
) ;

type ParsedPathCmdInfo = (
  ReturnType<typeof parsePathDString>[number]
) ;
type Cm = (
  ((Extract<ParsedPathCmdInfo, { type: string ; }>)["type"] | Extract<ParsedPathCmdInfo, string> )
) ;
type PathElementRaw = (
  ReturnType<typeof parsePathDStringPre>[number]
) ;
/** 
 * like {@link parsePathDString }, but
 * instead, for each command, only give the raw token array.
 * [https://www.w3.org/TR/SVG2/paths.html#PathData].
 * [implicit *line-to* cmds (ie coords without explicit prefix "L" or "l")](https://www.w3.org/TR/SVG2/paths.html#PathDataMovetoCommands) 
 * will here be given explicit prefix (as specified in the spec),
 * for high-level usage simplicity.
 * 
 * @see we intentionally avoid making this API depend on DOM since DOM doesn't exist in SSR.
 */
export const parsePathDStringPre = (() => {
  const forCm = (
    (cm: Cm) => {
      ;
      /** 
       * the number
       */
      const coordN = (
        ((): number => {
          switch (cm satisfies string as Cm) {
            case "z" :
            // @ts-ignore
            case "Z" :
              return 0 ;
            case "H" :
            case "h" :
            case "V" :
            case "v" :
              return 1 ;
            case "M" :
            case "m" :
            case "L" :
            case "l" :
            case "T" :
            case "t" :
              return 2 ;
            case "Q" :
            case "q" :
            case "S" :
            case "s" :
              return 4 ;
            case "C" :
            case "c" :
              return 6 ;
          }
          throw TypeError(`cm: ${cm }`) ;
        } )()
      ) ;
      const tokensN = (
        1 + coordN
      ) satisfies number ;
      return {
        coordN ,
        tokensN ,
      } ;
    }
  ) ;
  return (
    ((code: string): (
      (
        | [Cm, ...string[]] 
        // | [`${number}`, string] // the parser above can't trivially be made smart enough
      )[]
    ) => {
      const codeTokenised = (
        tokenisePathDString(code)
      ) ;
      return (
        Array.from<PathElementRaw>({
          *[Symbol.iterator]() {
            // TODO
            /** 
             * the loop to process `remainingTokens`.
             * needs to maintain `lastCmd`,
             * since implicit-prefix *line-to* cmd(s) shall derive *relativity*.
             */
            loop1 :
            for (let remainingTokens: string[] = codeTokenised, lastCmd: Cm = "z" ;; ) {
              const cm = remainingTokens[0] ;

              if (cm) { 
                /** 
                 * there're more to do
                 */
              } else {
                /** 
                 * there's nothing left.
                 */
                return ;
              }

              /** 
               * if no explicit Cm,
               * let `impliedCm` be 
               * same Cm 
               * or instead, for "M" or "m",
               * corresponding "L" or "l"
               * and
               * insert `impliedCm` and retry
               * .
               */
              if (util.isNumericString(cm) ) {
                const impliedCm = (
                  ((): Cm => {
                    if (lastCmd === "z") return "L" ; // TODO
                    if (lastCmd.match(/^[Mm]$/g) ) {
                      return (
                        (
                          lastCmd.match(/^[a-y]$/g ) ? "l" : "L"
                        ) satisfies Cm
                      ) ;
                    }
                    return lastCmd ;
                  } )()
                ) ;
                
                remainingTokens = [impliedCm satisfies Cm, ...remainingTokens ] ;
                continue loop1 ;

              } else {
                const cmAs = (
                  cm satisfies string as Cm
                ) ;
                const {
                  coordN: pickworthyCoordN ,
                  tokensN: pickworthyTokensN ,
                } = forCm(cmAs) ;
                
                const pickworthyTokens = (
                  remainingTokens.slice(0, pickworthyTokensN )
                ) ;

                yield [cmAs, ...pickworthyTokens.slice(1) ] ;
                
                ({ remainingTokens, lastCmd } = {
                  remainingTokens: (
                    remainingTokens.slice(pickworthyTokensN)
                  ) ,
                  lastCmd: (
                    cmAs
                  ) ,
                } ) ;
                continue loop1 ;
                
              }
              
              throw ReferenceError(`assertion error - missing explicit continue`) ;
            }
          }
        })
      ) ;
    })
  ) ;
})() ;

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
