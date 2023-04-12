

import * as util from "src/utility-functions/all" ;









export default (
  util.React.forwardRef<{}, {}>(function SvpRender() {
    const {
      hoverPos ,
      setHoverPos ,
    } = useXHoverState() ;
    return (
      <div
      style={{
        display: "flex" ,
        flexDirection: "column" ,
      }}
      >
      <svg 
      className={`SvpMain ` }
      viewBox={`0 0 500 250 `}
      style={{
      }}
      children={(
        <HoverMnComp 
        onPointerLeave={() => {
          setHoverPos(false) ;
        } }
        onPointerMoveRelative={(evt) => {
          const pos = (
            evt.newPos
          ) ;
          setHoverPos(pos );
        }}
        />
      )}
      />
      <div>
        <table>
          <tbody>
          <tr>
            <td>Pos:</td>
            <td>
            <pre>
              { JSON.stringify(hoverPos, null, 2) }
            </pre> 
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      </div>
    ) ;
  })
) ;
const HoverMnComp = (
  util.React.forwardRef<(
    & {}
  ), (
    & {
      onPointerMoveRelative?: (
        util.React.Dispatch<{ 
          newPos: DOMPoint ; 
        }> 
      ) ;
      onPointerLeave?: (
        util.React.Dispatch<{ 
        }> 
      ) ;
    }
  )>(function SvpRender(...[
    {
      onPointerMoveRelative: propagatePointerMoveEvt = util._.identity ,
      onPointerLeave: propagatePointerLeaveEvt = util._.identity ,
    } ,
  ]) {
    const onMouseExitImpl = (
      () => {
        propagatePointerLeaveEvt({}) ;
        ;
      }
    ) ;
    const handlePointerMovement = (
      (evt => {
        evt.currentTarget.childNodes ;
        const {
          relativePos: evtRelativePos ,
        } = (
          getPointEvtCoordsInfo(evt)
        ) ;
        propagatePointerMoveEvt({ 
          newPos: Object.freeze(evtRelativePos), 
        }) ;
        ;
      }) satisfies util.React.Dispatch<util.React.PointerEvent<SVGGraphicsElement> >
    ) ;
    return (
      <g 
      onPointerDown={(evt) => {
        console["info"](TypeError(`mousedown detected`) ) ;
        if (1) {
          ;
          1 && console["log"](`client-pos: `, { x: evt.clientX, y: evt.clientY, }, ) ;
          ;
        }
      } }
      onPointerLeave={e => onMouseExitImpl() }
      onPointerMove={evt => (
        handlePointerMovement(evt)
      ) }
      style={{
      }}
      children={(
        <circle
        cx={0} cy={0} 
        r={1920}
        fill={(
          // `rgba(64, 64, 64, ${0})`
          "transparent"
        )}
        />
      )}
      />
    ) ;
  })
) ;
const useXHoverState = (
  (() => {
    const [hoverPos, setHoverPos] = (
      util.React.useState<{ x: number ; y: number ; } | false>(false)
    ) ;
    return {
      hoverPos ,
      setHoverPos ,
    } ;
  }) satisfies (() => {})
) ;

/** 
 * {@link SVGGraphicsElement.getScreenCTM } or 
 * {@link SVGGraphicsElement.getCTM }
 * 
 */
const getCtmImpl = (
  ((...[target, methodName]): DOMMatrix => (
    ( (target instanceof SVGGraphicsElement) && target[methodName]() )
    || DOMMatrix.fromMatrix({})
  )) satisfies {
    (...args: [
      receiver: Element, 
      mode: keyof Pick<SVGGraphicsElement, "getScreenCTM" | "getCTM">
    ]): DOMMatrix ;
  }
) ;

const getPointEvtCoordsInfo = (
  (evt: util.React.PointerEvent<SVGGraphicsElement>) => {
    ;
    const ctm = (
      getCtmImpl(evt.currentTarget, "getScreenCTM")
    ) ;
    const clientPos = (
      DOMPoint.fromPoint({ x: evt.clientX, y: evt.clientY, })
    ) ;
    const relativePos = (
      clientPos
      .matrixTransform(DOMMatrix.fromMatrix(ctm).inverse() )
    ) ;
    return {
      ctm ,
      clientPos ,
      relativePos ,
    } ;
  }
) ;
const getPointEvtRelativePos = (
  (evt: util.React.PointerEvent<SVGGraphicsElement>) => (
    getPointEvtCoordsInfo(evt)
    .relativePos
  )
) ;





































export {} ; // TS-1208
