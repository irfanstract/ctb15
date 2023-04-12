






import * as util from "src/utility-functions/all" ;
import {
  ConjunctionFromAlternation ,
  AsEachAsAcceptor ,
  AsEachFromAcceptor ,
  Parameters ,
  PropsWithoutConflicts ,
} from "src/projects/jframes/pwt" ;
export * from "src/utility-functions/all" ;
export * from "src/projects/jframes/pwt" ;






import * as ionIcons from "ionicons/icons" ;
export { ionIcons, } ;

import Button from "src/projects/Button";
export { Button, } ;

/**
 * a wrapper for {@link Button } which will automatically be `disabled` if `onClick` were null
 * 
 */
export const OpButton = (function <XB extends typeof Button>(...[{ 
  // Button, 
}] : [{
  Button : XB ;
}] ) {
  type PccTest0 = (
    AsEachFromAcceptor<(
      AsEachAsAcceptor<{ s: string | number ; } | { s: string | boolean ; }>
    )>
  );
  type Props = (
    & (
     /**
      * note: 
      * due to the resulting type-mismatch issues,
      * the `onYyy` handlers will need to be narrowed to the type conjunctions
      * 
      */
     & PropsWithoutConflicts<util.React.ComponentPropsWithoutRef<typeof Button>>
   )
  );
  type PccTest1 = Props["onClick"] ;
  return (
    util.React.forwardRef((
      function CallbackButtonImpl({ 
        onClick, 
        onDoubleClick ,
        disabled: disable, 
        ...otherProps
      } : Props, ref: (
        // & util.React.ForwardedRef<HTMLButtonElement >
        // & util.React.ForwardedRef< HTMLIonButtonElement>
        & util.React.ForwardedRef< HTMLIonButtonElement | HTMLButtonElement>
      ) ) {
        return (
          <Button 
          ref={(
            (ref satisfies util.React.ForwardedRef< HTMLIonButtonElement | HTMLButtonElement>) as 
            any
          )}  
          type="button"
          { ...otherProps }
          {...( (onClick || onDoubleClick) ? {
            onClick: onClick ,
            onDoubleClick: onDoubleClick,
            disabled: disable ,
          } : { disabled: true, } )}
          />
        ) ;
       }
    ))
  ) ;
})({
  Button ,
}) ;

import * as Ionic from "src/projects/Ionic" ;
export { Ionic, } ;




import JFrameCss from "src/projects/jframes/ejmp.module.css" ;
export { JFrameCss as JFrameCss, } ;

export function isControlledElementDisabled(controller: Element): boolean ;
export function isControlledElementDisabled(srcEl: Element) {
  return (
    srcEl.matches(`*:disabled`)
  ) ;
}








