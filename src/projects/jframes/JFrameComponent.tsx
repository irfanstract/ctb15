
import * as util from "src/projects/jframes/util" ;










import { ionIcons, } from "src/projects/jframes/util";

import Button from "src/projects/Button";
import { OpButton, } from "src/projects/jframes/util";

import { Ionic, } from "src/projects/jframes/util";

import { FoldedMenuComp, } from "./PopupMenu";
import { PlainFoldedMenuComp, } from "./PopupMenu";
import { IonFoldedMenuComp, } from "./PopupMenu";





export const ContentWithOpListingAndStatBarAggregatingComp = (
  (function ({
    mainContent ,
    opListing: windowMgmtMenuBar ,
    statsBar ,
  } ) {
    return (
      <div
      style={{
        display: "flex" ,
        flexDirection: "column" ,
      }}
      >
        <div style={{ order: 0, }} >
          { mainContent }
        </div>
        <div className={`${JFrameCss.JfrAside } ` } style={{ order: -1000, zoom: `80%`, }} >
          { windowMgmtMenuBar }
        </div>
        <div className={`${JFrameCss.JfrAside } ` } style={{ order: 1000, zoom: `80%`, }} >
          { statsBar }
        </div>
      </div>
    ) ;
  }) satisfies {
    (props: {
      mainContent: util.React.ReactElement ;
      opListing: util.React.ReactElement ;
      statsBar?: util.React.ReactElement ;
    }): util.React.ReactElement ;
  }
) ;

/* being 2-step, as a work-around to the issues caused by the circularity in the dependencies */
export function JFrameComp(...args: Parameters<typeof JFrameCompImpl> ) {
  return JFrameCompImpl(...args) ;
}
const JFrameCompImpl = (() => {
  return (
    (function JFrameCompRender({
      style: styleProps ,
      mainContent ,
      opListing: windowMgmtMenuBar ,
      statsBar ,
    }) {
      const masterController = (
        useJFrameImplMasterControllerImplement()
      ) ;
      const cssId = (
        util.React.useId()
      ) ;
      return (
        <WithGivenAssociatedJFrame value={masterController } >
        <div
        className="JFrame "
        style={{
          ...styleProps ,
        }}
        >
        <div
        id={cssId + "-c"}
        >
          <ContentWithOpListingAndStatBarAggregatingComp 
          {...(
            {
              mainContent ,
              opListing: windowMgmtMenuBar ,
              statsBar ,
            } satisfies /* ensure that THERE'S NO MISSED PROPERTY */ (
              util.MustSpecifyAll<(
                util.React.ComponentProps<typeof ContentWithOpListingAndStatBarAggregatingComp>
              )>
            )
          )}
          />
        </div>
        </div>
        </WithGivenAssociatedJFrame>
      ) ;
    }) satisfies (
      util.React.FC<(
        & Pick<JSX.IntrinsicElements["div"], "style">
        & util.React.ComponentPropsWithoutRef<typeof ContentWithOpListingAndStatBarAggregatingComp>
      )>
    )
  ) ;
})() ;  

export default JFrameComp ;





;





interface JFrameController {
  registeredPopupControllerSet: Set<HTMLIonPopoverElement> ;
  closeAllPopups: () => void ;
}
namespace JFrameController { ; } // TS(1208)
export { JFrameController, } ;

interface JFrameAssocUtil {
  WithGivenAssociatedJFrame  : util.React.Provider<null | JFrameController> ;
  WithAssociatedJFrame       : util.React.Consumer<null | JFrameController> ;
  useCurrentAssociatedJFrame : () => (null | JFrameController) ;
}
export const componentTreeJFrameAssocs = ((): JFrameAssocUtil => {
  const ctx = (
    util.React.createContext<null | JFrameController>(null)
  ) ;
  return {
    WithGivenAssociatedJFrame  : ctx.Provider ,
    WithAssociatedJFrame       : ctx.Consumer ,
    useCurrentAssociatedJFrame : () => util.React.useContext(ctx) ,
  } ;
})() ;
export const {
  WithGivenAssociatedJFrame  ,
  WithAssociatedJFrame ,
  useCurrentAssociatedJFrame ,
} = componentTreeJFrameAssocs ;

/** 
 * 
 */
const useJFrameImplMasterControllerImplement = (
  ((...[{} = {}]) => (
    util.React.useMemo<JFrameController>(() => (
      new (class implements JFrameController {
        closeAllPopups = () => (
          this.registeredPopupControllerSet
          .forEach(c => c.dismiss() )
        ) ;
        registeredPopupControllerSet = (
          new Set<HTMLIonPopoverElement>()
        ) ;
      })
    ), [])
  )) satisfies {
    (options ?: {}): unknown ;
  }
) ;










import { JFrameCss, } from "src/projects/jframes/util";

























































export {} ; // TS(1208)
