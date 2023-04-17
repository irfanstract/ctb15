

import * as util from "src/projects/svp/util" ;

const Kk = util.React.Fragment ;

import * as main from "./interop-svg" ;











export default (
  (): util.React.ReactElement => {
    const pTestsPane = (
      <div>
        <p>P Tests</p>
        <ul>
          { (
            [
              { subject: `M 3 3 L 5 5 l 7 7 z`, } ,
              { subject: `M 3 3 5 5 7 7 z`, } ,
              { subject: `m 3 3 5 5 7 7 z`, } ,
              { subject: `M 3 , 3 L 5 5 z`, } ,
              { subject: `M 3 , 3 5 5 7 7 9 9 L 11 11 z`, } ,
              { subject: `m 3 , 3 5 5 7 7 V 11 T 11 11 z`, } ,
              { subject: `m 3 , 3 S 5 5 7 7 V 11 z`, } ,
              { subject: "m 3 , 3 5 5 7 7", } ,
              { subject: "M 3 , 3 5 5 7 7", } ,
              { subject: "m 3 , 3 Q 5 5 7 7 11 11 8 8 z", } ,
              { subject: "m 3 , 3 q 5 5 7 7 11 11 8 8 h 2 3 z", } ,
              { subject: "m 3 , 3 C 5 5 7 7 11 11 z", } ,
              { subject: "m 3 , 3 A 5 5 90 0 0 11 11 A 12 12 45 0 1 5 5 z", } ,
            ]
            .map((c, i) => {
              return (
                <Kk key={i}>
                  <li>
                    <table>
                    <tbody>
                      <tr>
                        <td>Raw</td>
                        <td><code>{ c.subject }</code></td>
                      </tr>
                      <tr>
                        <td>Raw Tokenised</td>
                        <td><code>{ JSON.stringify(main.tokenisePathDString(c.subject ) ) }</code></td>
                      </tr>
                      <tr>
                        <td>Raw Coords</td>
                        <td><code>{ JSON.stringify(main.parsePathDStringPre(c.subject ) ) }</code></td>
                      </tr>
                      <tr>
                        <td>Descs</td>
                        <td><pre>{ JSON.stringify(main.parsePathDString(c.subject ), null, 2 ) }</pre></td>
                      </tr>
                      <tr>
                        <td>Graphique</td>
                        <td>
                          <svg
                          viewBox={`0 0 32 32`}
                          style={{
                            background: `rgb(255,255,192)` ,
                            height: `calc(5 * 4em)`,
                          }}
                          >
                            <PathDSvEditComp 
                            value={c.subject } 
                            mainStyle={{
                              strokeWidth: 0.25 ,
                            }}
                            />
                          </svg>
                        </td>
                      </tr>
                    </tbody>
                    </table>
                  </li>
                </Kk>
              ) ;
            })
          ) }
        </ul>
      </div>
    ) ;
    return (
      pTestsPane
    ) ;
  }
) ;

/** 
 * the editor, as SVG markup
 */
const PathDSvEditComp = (
  util.React.forwardRef<unknown, (
    & {
      value: string ;
      mainStyle?: util.React.CSSProperties ;
    }
  )>((...[
    { 
      value: code,
      mainStyle = {} ,
    } ,
  ]) => {
    const {
      codeParsed ,
      codeParsedNormalised ,
    } = usePsvCodeParse(code) ;
    const lineStylingCssProps = {
      
      stroke: "black" ,
      strokeWidth: 5 ,

      ...mainStyle ,
      
    } satisfies util.React.CSSProperties ;
    const mainPresentation = (
      <g
      style={{
        ...lineStylingCssProps ,
        ...mainStyle ,
      } }
      >
        <path 
        d={code }
        style={{
          fill: "gray" ,
        } }
        />
        <g>
          { (
            util.Immutable.List(codeParsedNormalised) 
            .toArray()
            .flatMap((descAbsolute, i) => (
              (
                (typeof descAbsolute === "object") ? 
                [(
                  { id: i, descAbsolute, }
                )] 
                : [] 
              ) satisfies [unknown?]
            ) )
            .map(({
              id: arcId, 
              descAbsolute  : arcDescAbsol, 
              // descAsIs      : arcDescAsIs,
            }) => {
                  const { startPos , } = arcDescAbsol ;
                  const wasRelativeCoordCmd = (
                    main.isRelativeCoordCmd(arcDescAbsol.originalDesc)
                  ) ;
                  const { 
                    type, 
                    target: endPos , 
                    ctrlPointsList = [] ,
                  } = (
                    ((): (
                      & Pick<typeof arcDescAbsol, "type">
                      & { [k in keyof Pick<typeof arcDescAbsol, "target">]: DOMPointReadOnly ; }
                      & {
                        ctrlPointsList?: DOMPointReadOnly[] ;
                      }
                    ) => {
                      switch (arcDescAbsol.type) {
                        case "H" :
                        case "V" :
                          return {
                            type: arcDescAbsol.type ,
                            target: (
                              DOMPointReadOnly.fromPoint({
                                [(
                                  ({ H: "x", V: "y", } as const)[arcDescAbsol.type]
                                )]: arcDescAbsol.target satisfies number ,
                              })
                            ) ,
                          } ;

                        case "A" :
                          return {
                            type: arcDescAbsol.type ,
                            target: arcDescAbsol.target ,
                            ctrlPointsList: (
                              [
                                ((): DOMPointReadOnly => {
                                  const endPos0 = arcDescAbsol.target ;
                                  const halfChordLen = (
                                    0.5 * 
                                    Math.hypot(
                                      endPos0.x - startPos.x ,
                                      endPos0.y - startPos.y , 
                                    )
                                  ) ;
                                  // const originDisplcmt = (
                                  //   Math.sqrt(Math.hypot() )
                                  // ) ;
                                  // TODO
                                  return (
                                    main.getTranslatedPoint1(startPos, arcDescAbsol.radius)
                                  ) ;
                                } )() ,
                              ]
                            ) ,
                          } ;
                          
                        case "C" :
                        case "S" :
                        case "Q" :
                        case "T" :
                          return {
                            type: arcDescAbsol.type ,
                            target: (
                              arcDescAbsol.target
                            ) ,
                            ctrlPointsList: (
                              [...arcDescAbsol.ctrlPoints]
                              .filter((v): v is DOMPointReadOnly => (
                                v !== "auto"
                              ) )
                            ) ,
                          } ;
                          
                        case "M" :
                          return {
                            type: arcDescAbsol.type ,
                            target: (
                              arcDescAbsol.target
                            ) ,
                          } ;
                          
                        default :
                          return arcDescAbsol ;
                          
                      }
                    } )()
                  ) ;
                  const pointsList = (
                    // [
                    //   ...(type === "M" ? [] : [startPos] ) ,
                    //   ...ctrlPointsList ,
                    //   endPos ,
                    // ] satisfies DOMPointReadOnly[]
                    Array.from({
                      *[Symbol.iterator](): (
                        Generator<{ type: "main" | "ctrl", pos: DOMPointReadOnly, }>
                      ) {
                        if (0) {
                          if (type === "M") {
                            yield { type: "main", pos: startPos, } ;
                          }
                        }
                        for (const p of ctrlPointsList) {
                          yield { type: "ctrl", pos: p, } ;
                        }
                        yield { type: "main", pos: endPos, } ;
                      } ,
                    })
                  ) ;
                  ;
                  return {
                    id: arcId ,

                    descAbsol: arcDescAbsol ,

                    startPos ,
                    wasRelativeCoordCmd ,
                    type ,
                    endPos ,
                    ctrlPointsList ,
                    pointsList ,
                    
                  } ;
            })
            .map(({
              id: arcId, 

              descAbsol: arcDescAbsol ,

              startPos ,
              wasRelativeCoordCmd ,
              type ,
              endPos ,
              ctrlPointsList ,
              pointsList ,
              
            }) => {
              const g = (
                (() => {
                  const pointsListPlot = (
                    pointsList
                    .map(({ pos: p, type: ctrlType, }, i) => (
                      <Kk key={i}>
                        <rect 
                        x={p.x }
                        y={p.y }
                        width={lineStylingCssProps.strokeWidth ?? 0.3}
                        height={lineStylingCssProps.strokeWidth ?? 0.3}
                        {...(ctrlType === "ctrl" ? { stroke: `rgb(128,0,128)`, } : {} )}
                        />
                      </Kk>
                    ) )
                  ) ;
                  return (
                    <g>
                      { pointsListPlot }
                    </g>
                  ) ;
                })()
              ) ;
              return (
                <Kk key={arcId } >
                { g }
                </Kk>
              ) ;
            } )
          ) }
        </g>
      </g>
    ) ;
    ;
    return (
      <g>
        { mainPresentation }
      </g>
    ) ;
  })
) ;
const usePsvCodeParse = (
  (code: string) => {
    ;
    const codeParsed = (
      util.React.useMemo(() => (
        main.parsePathDString(code)
      ), [main, code, ] )
    ) ;
    const codeParsedNormalised = (
      util.React.useMemo(() => (
        main.toAbsoluteCoordedPathData(codeParsed)
      ), [main, codeParsed, ] )
    ) ;
    ;
    return {
      code ,
      codeParsed ,
      codeParsedNormalised ,
    } ;
  }
) ;





























export {} ; // TS(1208)
