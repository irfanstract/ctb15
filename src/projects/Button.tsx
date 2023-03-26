
import * as util from "src/utility-functions/all" ;











const Button: (
  | "button"
  | (typeof import("@ionic/react").IonButton)
) = "button" ;

export default Button ;

// assert will compile
(( ) => (
  <Button type="button">
    Do Some Action
  </Button>
)) ;












































export {} ; // TS(1208)
