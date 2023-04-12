






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

export * from "./coreElements" ;

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








