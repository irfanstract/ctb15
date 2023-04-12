
import * as util from "src/projects/jframes/util" ;









import { ionIcons, } from "src/projects/jframes/util";

import Button from "src/projects/Button";
import { CallbackButton, } from "src/projects/jframes/util";

import { Ionic, } from "src/projects/jframes/util";






import { componentTreeJFrameAssocs, } from "./FileEditViewWindowComponent";

import { JFrameCss, } from "src/projects/jframes/util";


type FoldedMenuCompController = (
  & { setExpanded(v: boolean): void ; }
  & { setExpanded1(...args: Parameters<HTMLIonPopoverElement["present"]>): void ; }
  & { isOpen(): boolean ; }
);
export const FoldedMenuComp = (
  util.React.forwardRef(function GroupingMenuRImpl(...[
    {
      header: label ,
      children: items ,
    } , 
    exportsCb  ,
  ] : [

    props: (
      & { header: null | string | number | util.React.ReactElement ; }
      & Required<util.React.PropsWithChildren>
    ), 
    ref: util.React.ForwardedRef<(
      FoldedMenuCompController
    )>  ,
    
  ]) {
    const eId = (
      util.React.useId()
    ) ;
    const [
      exports ,
      { expndElemRefUpdate, } ,
    ] = useXController1() ;
    util.React.useImperativeHandle(exportsCb, () => exports, [exports,]) ;
    const { 
      expndElemRefed, 
      setExpanded, 
      setExpanded1, 
      isOpen ,
      currentlyJFrameController, 
    } = exports ;
    const headingBtn = (
      <Button
      id={eId + "-OpeningTrigger" }
      className={`${JFrameCss.PopupElMetaCtrlBtn } ` }
      type="button"
      >
        { label } <Ionic.Icon icon={ionIcons.ellipsisVertical } />
      </Button>
    ) ;
    const closingBtn = (
      <CallbackButton 
      className={`${JFrameCss.PopupElMetaCtrlBtn } ` }
      onClick={(
        expndElemRefed ? (() => expndElemRefed.dismiss()) : undefined
      )}
      >
        cancel
      </CallbackButton>
    ) ;
    const popupContents = (
      <div 
      className={` ${JFrameCss.PopupItemsContainer } `}
      onClick={e => {
        const srcEl = (
          (e.target as Element)
        ) ;
        const shallClose = (
          srcEl.matches(`button, a, ion-button, ion-nav-link`) &&
          !srcEl.matches("." + JFrameCss.PopupElMetaCtrlBtn ) &&
          !srcEl.matches(`*:disabled`)
        ) satisfies boolean ;
        if (shallClose === false ) {
          // return ;
        } else {
          expndElemRefed && expndElemRefed.dismiss() ;
        }
      }}
      >
        { (() => {
          const itemsFinal = (
            // used to insert additional divider at the end, but
            // removed it for being unsemantic
            [
              ...util.React.Children.toArray(items) , 
              <Ionic.IonItemDivider />,
              closingBtn ,
            ]
          ) ;
          return (
            itemsFinal
          ) ;
        })() }
      </div>
    ) ;
    return (
      <div 
      className={`${JFrameCss.Popup } ${JFrameCss.PopupBpv } ` }
      onBlur={e => {
        // setExpanded(e.currentTarget) ;
      } }
      >
        { headingBtn }
        <Ionic.IonPopover
        ref={expndElemRefUpdate }
        trigger={eId + "-OpeningTrigger" }
        showBackdrop={false }
        >
          { popupContents }
        </Ionic.IonPopover>
      </div>
    ) ;
  })
) ;
const useXController1 = () => {
  const {
    WithAssociatedJFrame ,
    useCurrentAssociatedJFrame ,
  } = componentTreeJFrameAssocs ;
  ;
  const [expndElemRefed, expndElemRefUpdate] = (
    util.React.useState<null | HTMLIonPopoverElement>(null) 
  ) ;
  const currentlyJFrameController = (
    useCurrentAssociatedJFrame()
  ) ;
  util.React["useLayoutEffect"](() => {
    if (currentlyJFrameController && expndElemRefed) {
      currentlyJFrameController.registeredPopupControllerSet.add(expndElemRefed);
      return (): void => {
        currentlyJFrameController.registeredPopupControllerSet.delete(expndElemRefed);
      } ;
    }
  } , [
    currentlyJFrameController,
    expndElemRefed ,
  ] );
  const exports1 = (
    util.React.useMemo(() => (
      {
        expndElemRefed ,
        currentlyJFrameController ,
        setExpanded(v): void {
          if (!expndElemRefed) return ;
          v ? expndElemRefed.present() : expndElemRefed.dismiss() ;
        },
        setExpanded1(evt): void {
          if (!expndElemRefed) return ;
          expndElemRefed.present(evt) ;
        },
        isOpen: () => (
          (expndElemRefed && expndElemRefed.isOpen) || false
        ) ,
        
      } satisfies (
        FoldedMenuCompController & { [k: string]: unknown ; }
      )
    ), [
      expndElemRefed,
      currentlyJFrameController ,
    ])
  ) ;
  ;
  return (
    [
      exports1 ,
      {
        expndElemRefUpdate ,
      } ,
    ] satisfies [exports: object, init: object, ...etc: unknown[]]
  )
} ;






























export {} ; // TS(1208)
