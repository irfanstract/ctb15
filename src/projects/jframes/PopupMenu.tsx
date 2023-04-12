
import * as util from "src/projects/jframes/util" ;









import { ionIcons, } from "src/projects/jframes/util";

import Button from "src/projects/Button";
import { OpButton, } from "src/projects/jframes/util";

import { Ionic, } from "src/projects/jframes/util";






import { componentTreeJFrameAssocs, } from "./FileEditViewWindowComponent";

import { JFrameCss, } from "src/projects/jframes/util";
/** 
 * when a menu-item is a directory rather than a leaf,
 * we can call that "a menu-anchour" element
 * 
 */
function isControllerForPopupMenuMetaBtn(...args: [Element]): boolean ;
function isControllerForPopupMenuMetaBtn(...[srcEl]: [Element]): boolean {
  return (
    srcEl.matches("." + JFrameCss.PopupElMetaCtrlBtn )
  ) ;
}


type FoldedMenuCompController = (
  & { setExpanded(v: boolean): void ; }
  & { setExpandedDueToEvent(...args: Parameters<HTMLIonPopoverElement["present"]>): void ; }
  & { isExpanded(): boolean ; }
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
    const intendedControllerId = (
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
      setExpandedDueToEvent, 
      isExpanded ,
      currentlyJFrameController, 
    } = exports ;
    const headingBtn = (
      <Button
      id={intendedControllerId + "-OpeningTrigger" }
      className={`${JFrameCss.PopupElMetaCtrlBtn } ` }
      type="button"
      >
        { label } <Ionic.Icon icon={ionIcons.ellipsisVertical } />
      </Button>
    ) ;
    const closingBtn = (
      <OpButton 
      className={`${JFrameCss.PopupElMetaCtrlBtn } ` }
      onClick={(
        expndElemRefed ? (() => expndElemRefed.dismiss()) : undefined
      )}
      >
        cancel
      </OpButton>
    ) ;
    const itemsFinal = (
      // has additional divider at the end
      [
        ...util.React.Children.toArray(items) , 
        <Ionic.IonItemDivider />,
        closingBtn ,
      ]
    ) ;
    const popupContents = (
      <div 
      className={` ${JFrameCss.PopupItemsContainer } `}
      onClick={e => {
        const {
          srcElemController: srcEl ,
          isClickOnEnabledAppItem ,
          shallCauseCollapse ,
        } = analysePopoverClickEvt(e) ;
        if (shallCauseCollapse === false ) {
          // return ;
        } else {
          expndElemRefed && expndElemRefed.dismiss() ;
        }
      }}
      >
        { itemsFinal }
      </div>
    ) ;
    const analysePopoverClickEvt = ((...[e]) => {
      ;
      const srcElemController = (
        (e.target as Element)
      ) ;
      const isClickOnEnabledAppItem = (
        srcElemController.matches(`button, a, ion-button, ion-nav-link`) &&
        !isControllerForPopupMenuMetaBtn(srcElemController) &&
        !util.isControlledElementDisabled(srcElemController)
      ) satisfies boolean ;
      const shallCauseCollapse = (
        isClickOnEnabledAppItem
      ) satisfies boolean ;
      return {
        srcElemController ,
        isClickOnEnabledAppItem ,
        shallCauseCollapse ,
      } ;
    }) satisfies { 
      (...a: Parameters<JSX.IntrinsicElements["div"]["onClick"] & Function>): object ; 
    } ;
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
        trigger={intendedControllerId + "-OpeningTrigger" }
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
        setExpandedDueToEvent(evt): void {
          if (!expndElemRefed) return ;
          expndElemRefed.present(evt) ;
        },
        isExpanded: () => (
          (expndElemRefed && expndElemRefed.isOpen) || false
        ) ,
        
      } satisfies (
        FoldedMenuCompController & {
          expndElemRefed: unknown ,
          currentlyJFrameController: unknown ,
        }
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
