

import * as util from "src/projects/svp/util" ;












export function toAbsoluteCoordedPathData(src: ParsedPathCmdInfo[]): (
  (
    | (
      & (
        Extract<ParsedPathCmdInfo, { type: string ; } > extends (infer Ppci extends { type: infer Type extends string ; }) ?
        (
          // Desc extends infer Desc1 ?
          // ((Desc1 & { type: "m" | "l" | "h" | "v" | "t" | "q" | "c" | "s" | "a" ; }))
          // : never
          (
            (Ppci & { type: Exclude<Ppci["type"], "m" | "l" | "h" | "v" | "t" | "q" | "c" | "s" | "a" > ; } ) extends infer AbsolutePpci extends {} ?
            (
              // DISTRIBUTIVITY
              AbsolutePpci extends infer CurrentResultingPpci extends {} ?
              (
                CurrentResultingPpci
                & {
                  startPos: DOMPointReadOnly ; 
                }
                & {
                  originalDesc: (
                    /** 
                     * for usability,
                     * will need to be narrowed down to the corresponding source type,
                     * unless it's "M" or "L" which would arise as fallback for unsupported source types
                     * .
                     */
                    { type: "L" ; } extends Partial<CurrentResultingPpci> ?
                    Ppci :
                    (
                      // TODO - choose alts from `Desc` each which `CurrentPpci` extends
                      /* DISTRIBUTIVITY */
                      Ppci extends infer CurrentSrcPpci extends {} ?
                      ([CurrentResultingPpci] extends [CurrentSrcPpci] ? CurrentSrcPpci : never)
                      : never
                    )
                  ) ; 
                }
              ) 
              : never
            ) 
            : never 
          )
        )
        : never
      )
    )
    | "z"
    // ParsedPathCmdInfo
  )[]
) ;
export function toAbsoluteCoordedPathData(...[segs0]: Parameters<typeof toAbsoluteCoordedPathData> ): ReturnType<typeof toAbsoluteCoordedPathData> {
  type SpclPathCmd = ReturnType<typeof toAbsoluteCoordedPathData>[number] ;
  return (
    Array.from({

      *[Symbol.iterator](): Generator<SpclPathCmd > {
        let lastCtxPos : DOMPointReadOnly = (
          DOMPointReadOnly.fromPoint({ x: 0, y: 0, })
        ) ;
        loop1 :
        for (const e of segs0 ) {
          switch (typeof e) {
            
          case "string" :
            if (e === "z") return ;
            throw TypeError(`cmd = ${JSON.stringify(e) }`) ;
            
          case "object" :
            yield ((): SpclPathCmd => {
              ;
              const targetPosSpecified1 = (
                ((): DOMPointReadOnly => {
                  // TODO
                  switch (e.type) {

                    case "H" :
                    case "h" :
                    case "V" :
                    case "v" :
                      {
                        const { target: targetPosSpecified0, } = e ;
                        return (
                          DOMPointReadOnly.fromPoint({ 
                            [(
                              {
                                H: "x" ,
                                h: "x" ,
                                V: "y" ,
                                v: "y" ,
                              }[e.type]
                            )]: targetPosSpecified0, 
                          })
                        ) ;
                      }

                    default:
                      return e.target ;

                  }
                } )()
              ) ;
              /** 
               * {@link targetPosSpecified1 } resolved asolutely
               * 
               */
              const targetPosActual = (
                (
                  isRelativeCoordCmd(e) ?
                  getTranslatedPoint1(lastCtxPos, targetPosSpecified1)
                  : targetPosSpecified1
                ) satisfies DOMPointReadOnly
              ) ;
              try {
                switch (e.type) {
  
                  case "A" :
                  case "a" :
                    return {
                      startPos: lastCtxPos ,
                      originalDesc: e ,
                      type: "A" ,
                      larger: e.larger ,
                      sweep: e.sweep ,
                      radius: e.radius ,
                      xAxisRotation: e.xAxisRotation ,
                      target: targetPosActual ,
                    }
  
                  case "M" :
                  case "m" :
                  case "L" :
                  case "l" :
                    return {
                      startPos: lastCtxPos ,
                      originalDesc: e ,
                      type: ({
                        M: "M",
                        m: "M" ,
                        L: "L" ,
                        l: "L" ,
                      } as const)[e.type] ,
                      target: targetPosActual ,  
                    } satisfies (
                      SpclPathCmd
                      & { type: "M" | "L" ; }
                    ) ;

                  case "H" :
                  case "h" :
                  case "V" :
                  case "v" :
                    {
                      const resultingType = (
                        ({
                          H: "H",
                          h: "H" ,
                          V: "V" ,
                          v: "V" ,
                        } satisfies { [k in typeof e.type]: "H" | "V" ; })[e.type]
                      ) ;
                      return {
                        startPos: lastCtxPos ,
                        originalDesc: e ,
                        type: resultingType ,
                        target: ( 
                          targetPosActual[(
                            ({ H: "x", V: "y", } as const)[resultingType]
                          )] 
                        ) ,
                      }
                    }
  
                  case "C" :
                  case "c" :
                  case "S" :
                  case "s" :
                  case "Q" :
                  case "q" :
                  case "T" :
                  case "t" :
                    {
                      const refPt = (
                        (
                          isRelativeCoordCmd(e) ? 
                          lastCtxPos : new DOMPointReadOnly()
                        ) satisfies DOMPointReadOnly
                      ) ;
                      switch (e.type) {
                        case "C" :
                        case "c" :
                          return {
                            startPos: lastCtxPos ,
                            originalDesc: e ,
                            type: "C" ,
                            target: targetPosActual ,  
                            ctrlPoints: [
                              getTranslatedPoint1(refPt, e.ctrlPoints[0] ) ,
                              getTranslatedPoint1(refPt, e.ctrlPoints[1] ) ,
                            ] ,
                          } ;
                        case "S" :
                        case "s" :
                          return {
                            startPos: lastCtxPos ,
                            originalDesc: e ,
                            type: "S" ,
                            target: targetPosActual ,  
                            ctrlPoints: [
                              POSITION_INFERRED ,
                              getTranslatedPoint1(refPt, e.ctrlPoints[1] ) ,
                            ] ,
                          } ;
                        case "Q" :
                        case "q" :
                          return {
                            startPos: lastCtxPos ,
                            originalDesc: e ,
                            type: "Q" ,
                            target: targetPosActual ,  
                            ctrlPoints: [
                              getTranslatedPoint1(refPt, e.ctrlPoints[0] ) ,
                            ] ,
                          } ;
                        case "T" :
                        case "t" :
                          return {
                            startPos: lastCtxPos ,
                            originalDesc: e ,
                            type: "T" ,
                            target: targetPosActual ,  
                            ctrlPoints: [
                            ] ,
                          } ;
                        default :
                          throw TypeError(`e: ${JSON.stringify(e) }`) ;
                      }
                    }

                  // TODO
                  default :
                    return {
                      startPos: lastCtxPos ,
                      originalDesc: e ,
                      type: "L" ,
                      target: targetPosActual ,
                    } ;
  
                }
              } finally {
                lastCtxPos = targetPosActual ;
              }
            } )() ;

          }
        }
      } ,
      
    })
  ) ;
}
type IaccSrc = Pick<Extract<ParsedPathCmdInfo, { type: string ; } >, "type"> ;
export const isRelativeCoordCmd = (
  (e: IaccSrc) => {
    return !!(e.type satisfies string).match(/^[a-y]$/g) ;
  }
) ;
export const isAbsoluteCoordCmd = (
  (e: IaccSrc) => {
    return !!(e.type satisfies string).match(/^[A-Y]$/g) ;
  }
) ;

export const getTranslatedPoint1: {
  (p0: DOMPointReadOnly, p1: DOMPointReadOnly, ): DOMPointReadOnly ;
} = (
  (p0, p1,) => (
    DOMPointReadOnly.fromPoint({
      x: p0.x + p1.x ,
      y: p0.y + p1.y ,
    })
  )
) ;

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
        | { type: "A" | "a", target: DOMPointReadOnly, radius: DOMPointReadOnly, xAxisRotation: number, larger: boolean, sweep: boolean, }
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
      .map((desc): ParsedPathCmdInfo => (
        describePathCmdByRawTokens(desc)
      ) )
    ) ;
  }
) ;

export const describePathCmdByRawTokens = (
  ((desc: ParsedPathCmdRawTokens): ParsedPathCmdInfo => {
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
        {
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
      case "C" :
      case "c" :
        {
          const [
            ctrl1X = Number.NaN, 
            ctrl1Y = Number.NaN, 
            ctrl2X = Number.NaN, 
            ctrl2Y = Number.NaN, 
            destX = Number.NaN, 
            destY = Number.NaN, 
          ] = (
            desc.slice(1)
            .map(v => +v )
          ) ;
          switch (type) {
            case "C" :
            case "c" :
              return { 
                type: type, 
                target: new DOMPoint(destX, destY) , 
                ctrlPoints: [
                  new DOMPoint(...[
                    ctrl1X, 
                    ctrl1Y ,
                  ]) , 
                  new DOMPoint(...[
                    ctrl2X, 
                    ctrl2Y ,
                  ]) , 
                ] ,
              } ;
          }
        }
      case "A" :
      case "a" :
        /* `(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+` */
        {
          const [
            radiusX = Number.NaN, 
            radiusY = Number.NaN, 
            xAxisRotation = Number.NaN, 
            largerBranchFlag = Number.NaN, 
            sweepFlag = Number.NaN, 
            destX = Number.NaN, 
            destY = Number.NaN, 
          ] = (
            desc.slice(1)
            .map(v => +v )
          ) ;
          switch (type) {
            case "A" :
            case "a" :
              return { 
                type: type, 
                target: (
                  new DOMPoint(...[
                    destX, 
                    destY,
                  ])
                ) , 
                radius: (
                  new DOMPoint(...[
                    radiusX, 
                    radiusY,
                  ])
                ) ,
                xAxisRotation: (
                  xAxisRotation
                ) ,
                larger: !!largerBranchFlag ,
                sweep: !!sweepFlag ,
              } ;
          }
        }
    }
    throw TypeError((
      JSON.stringify((
        (desc satisfies string[] ).join(" ")
      ))
    )) ;
  })
) ;

type ParsedPathCmdInfo = (
  ReturnType<typeof parsePathDString>[number]
) ;
namespace ParsedPathCmdInfo { ; } // TS(1205)
export {
  ParsedPathCmdInfo ,
} ;
type Cm = (
  ((Extract<ParsedPathCmdInfo, { type: string ; }>)["type"] | Extract<ParsedPathCmdInfo, string> )
) ;
type ParsedPathCmdRawTokens = (
  [Cm, ...string[]]
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
            case "A" :
            case "a" :
              /* `(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+` */
              return 7 ;
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
        | ParsedPathCmdRawTokens
        // | [`${number}`, string] // the parser above can't trivially be made smart enough
      )[]
    ) => {
      const codeTokenised = (
        tokenisePathDString(code)
      ) ;
      return (
        Array.from<ParsedPathCmdRawTokens>({
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
