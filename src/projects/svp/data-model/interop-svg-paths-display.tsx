

import * as util from "src/projects/svp/util" ;

const Kk = util.React.Fragment ;

import * as main from "./interop-svg" ;











/** 
 * the editor, as SVG markup
 */
export const PathDSvEditComp = (
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
          <XWithLocalCoordSpaceUsageComp>
          { ({ translateClientPos, }) => (
          <g>
          { (
            analysePathSegmentListCtrlPointsCoords(codeParsedNormalised)
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
                    .map(({
                      pos: p, 
                      type: ctrlType, 
                      startDrag ,
                    }, i) => {
                    ;
                    return (
                      <Kk key={i}>
                        <rect 
                        x={p.x }
                        y={p.y }
                        width={lineStylingCssProps.strokeWidth ?? 0.3}
                        height={lineStylingCssProps.strokeWidth ?? 0.3}
                        {...(ctrlType === "ctrl" ? { stroke: `rgb(128,0,128)`, } : {} )}
                        />
                      </Kk>
                    ) ;
                    } )
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
          ) }
          </XWithLocalCoordSpaceUsageComp>
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
const analysePathSegmentListCtrlPointsCoords = (
  (codeParsedNormalised: ReturnType<typeof main.toAbsoluteCoordedPathData>, ...[
    apsOptions = {} ,
  ] : [
    options ?: (  
      & {
        onModelEdit?: (
          util.React.Dispatch<{
            updatedPathSegList: ReturnType<typeof main.toAbsoluteCoordedPathData> ,
          }>
        ) ,
      }
    ) ,
  ]) => {
    const {
      onModelEdit = false ,
    } = apsOptions ;
    const {
      shallSegmentsDuplicateStartPoints = false ,
    } = ((): (
      & {
        shallSegmentsDuplicateStartPoints?: boolean ;
      }
    ) => ({}) )() ;
    return (
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
                  Generator<{ 
                    type: "main" | "ctrl",
                    pos: DOMPointReadOnly,

                    startDrag?: () => {
                      moveTo: (
                        util.React.Dispatch<(
                          | { newAbsolutePos: DOMPointReadOnly ; }
                        )>
                      ) ;
                      close(): void ;
                    } ,
                    
                  }>
                ) {
                  if (shallSegmentsDuplicateStartPoints) {
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
    ) ;
  }
) ;
/** 
 * usage must make its `children` a function rather than regular return-value ;
 * the dispatch of the function 
 * will receive a callback like `translateClientPos` developers expected for
 * 
 */
import { 
  WithLocalCoordSpaceUsageComp as XWithLocalCoordSpaceUsageComp, 
} from "src/projects/jsx-coord-space/in1";





























export {} ; // TS(1208)
