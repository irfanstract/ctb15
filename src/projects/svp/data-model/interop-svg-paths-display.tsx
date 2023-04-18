

import * as util from "src/projects/svp/util" ;

const Kk = util.React.Fragment ;

import * as main from "./interop-svg" ;

import psvcCss from "./psvc.module.css" ;











/** 
 * the editor, as SVG markup
 */
export const PathDSvEditComp = (
  util.React.forwardRef<unknown, (
    & {
      value: string ;
      mainStyle?: util.React.CSSProperties ;
    }
    & {
      onModelEdit ?: (
        // false | 
        Required<Parameters<typeof analysePathSegmentListCtrlPointsCoords>[1] & {}>["onModelEdit"]
      ) ;
    }
  )>((...[
    { 
      value: code,
      mainStyle = {} ,
      onModelEdit: propagateModelEditEvt ,
    } ,
  ]) => {
    const {
      codeParsed ,
      codeParsedNormalised ,
    } = usePsvCodeParse(code) ;
    const mainPresentation = (
      <g
      style={{
      } }
      >
        <path 
        className={`${psvcCss.PFILL } ` }
        d={code }
        style={{
        } }
        />
        <g>
        { (() => {
        ;
        const cpnCtrlPointsInfo = (
          analysePathSegmentListCtrlPointsCoords(codeParsedNormalised, {
            onModelEdit: propagateModelEditEvt ,
          } )
        ) ;
        return (
          <XWithLocalCoordSpaceUsageComp>
          { ({ translateClientPos, }) => {
          ;
          return (
          <g>
          { (
            cpnCtrlPointsInfo
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
                  const renderPointByDesc = (
                    ((props) => {
                      return (
                        <PsvCpnCtrlPointComp 
                        {...props} 
                        />
                      ) ;
                    }) satisfies {
                      (desc: (typeof pointsList)[number]): util.React.ReactElement ;
                    }
                  ) ;
                  const pointsListPlot = (
                    pointsList
                    .map((pointDesc, i) => (
                      <Kk key={i}>
                        { renderPointByDesc(pointDesc) }
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
          ) ;
          } }
          </XWithLocalCoordSpaceUsageComp>
        ) ;
        })() }
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

/** 
 * ad-hoc component implementing dragging within usage-site coord-space
 * 
 */
const WsdComp = (
  (...[{
    children ,
    implStartDrag: startDrag ,
  }] : [(

    & Required<util.React.PropsWithChildren>

    & {

      implStartDrag?: () => {
        moveTo: (
          util.React.Dispatch<(
            | { newAbsolutePos: DOMPointReadOnly ; }
          )>
        ) ;
        close(): void ;
      } ;

    }

  )]): util.React.ReactElement => {
    ;
    
    /** 
     * basically the non-fallacious, React-based version of
     * `let currentDragging: null | ReturnType<(typeof startDrag) & {}> = null ;`
     * 
     */
    const [currentDragging, setCurrentDragEvt, ] = (
      util.React.useState<null | ReturnType<(typeof startDrag) & {}> >(null)
    ) ;

    ;

    return (
      <XWithLocalCoordSpaceUsageComp>
      { ({ 
        translateClientPos, 
        
      }) => {
        ;

        return (
          <g
          // TODO

          /** 
           * remarks :
           * - Mouse Events only deals with "mouse"s ;
           *   Pointer Events is what deals with arbitrary "pointing device"
           * 
           */
          
          onPointerUp={() => {
            currentDragging?.close() ;
            setCurrentDragEvt(null) ;
          }}
          {...(
            startDrag ?
            
            /** 
             * OnPress and OnMove here, OnRelease above -
             * the OnRelease callback shall always run no matter what
             */
            {
              onPointerDown: (evt) => {
                /** 
                 * logging
                 */
                console["log"](`PLPL evt coord`, evt.nativeEvent, (
                  translateClientPos(evt.nativeEvent )
                )) ;
                /** 
                 * dispatch {@link startDrag },
                 * preferably in a race-condition-free fashion
                 * 
                 */
                setCurrentDragEvt(() => (
                  startDrag()
                ) ) ;
              } ,
              
              onPointerMove: (evt) => {
                const evtLocalP = (
                  translateClientPos(evt.nativeEvent )
                ) ;
                if (currentDragging) {
                  currentDragging.moveTo({
                    newAbsolutePos: evtLocalP ,
                  }) ;
                }
              } ,

              style: {
                cursor: "move" ,
              } ,
              
            }

            : {
              style: {} ,
            }

          )}

          children={(
            children
          )}

          />
        ) ;
      } }
      </XWithLocalCoordSpaceUsageComp>
    ) ;
  }
) ;

/** 
 * the renderer for each main-or-ctrl point in {@link PathDSvEditComp }.
 * 
 */
const PsvCpnCtrlPointComp = (
  (({ 
    pos: p, 
    type: ctrlType, 
    startDrag ,
  }) => {
    ;
    const toolTipText = (
      [
        `${ctrlType } point` ,
        `{ x: ${p.x }, y: ${p.y }, }` ,
      ].join("; ")
    ) ;
    ;
    return (
      <g
      className={`${psvcCss.PCTRLPOINT } ${ctrlType === "ctrl" && psvcCss.PCTRLPOINT_IS_CTRL } ${startDrag && psvcCss.PCTRLPOINT_IS_MUTABLE } ` }
      tabIndex={0}
      >
        <title 
        children={toolTipText }
        />
        <rect 
        className={`${psvcCss.PCTRLPOINT_PART_DOT } ` }
        x={p.x }
        y={p.y }
        width={0.3}
        height={0.3}
        />
      </g>
    ) ;
  }) satisfies {
    (...args: [
      props: ReturnType<typeof analysePathSegmentListCtrlPointsCoords>[number]["pointsList"][number] ,
    ]) : util.React.ReactElement ;
  }
) ;





























export {} ; // TS(1208)
