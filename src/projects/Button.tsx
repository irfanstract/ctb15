
import * as util from "src/utility-functions/all" ;

import { Parameters, } from "src/projects/jframes/pwt" ;
import { 
  PropsWithoutConflicts ,
  MustSpecifyAll, 
} from "src/projects/jframes/pwt";











/** 
 * a click-input element.
 * 
 */
const Button: (
  | "button"
  | (typeof import("@ionic/react").IonButton)
) = "button" ;

export default Button ;

/**
 * a button which either has assigned handler or instead by disabled.
 * 
 * a wrapper for {@link Button } which will automatically be `disabled` if `onClick` were null
 * 
 */
export const OpButton = (function <XB extends typeof Button>(...[{ 
  // Button, 
}] : [{
  Button : XB ;
}] ) {
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
    & MustSpecifyAll<{ onClick ?: null | Function ; }>
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
            // TODO get rid of this unsafe op
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
  Button: Button ,
}) ;


// assert will compile
(( ) => (
  <Button type="button">
    Do Some Action
  </Button>
)) ;












































export {} ; // TS(1208)
