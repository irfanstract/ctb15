

import * as util from "src/projects/svp/util" ;











/** 
 * {@link SVGGraphicsElement.getScreenCTM } or 
 * {@link SVGGraphicsElement.getCTM }
 *  
 */
export const getCtmImpl = (
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

export const getPointEvtCoordsInfo = (
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
export const getPointEvtRelativePos = (
  (evt: util.React.PointerEvent<SVGGraphicsElement>) => (
    getPointEvtCoordsInfo(evt)
    .relativePos
  )
) ;

export const HoverListeningComp = (
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












export {} ; // TS-1208
