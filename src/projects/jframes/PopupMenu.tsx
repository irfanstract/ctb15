
import * as util from "src/projects/jframes/util" ;

import {
  XJSX ,
  isXReactElement ,
} from "./IonicElementJsx" ;









import { ionIcons, } from "src/projects/jframes/util";

import Button from "src/projects/Button";
import { OpButton, } from "src/projects/jframes/util";

import { Ionic, } from "src/projects/jframes/util";

function isControllerForButtonlike(main: Element): boolean ;
function isControllerForButtonlike(srcElemController: Element) {
  return (
    srcElemController.matches(`button, a, ion-button, ion-nav-link, ion-item[button]`)
  ) ;
}

import { renderIonicItemFromElement, } from "./IonicElementJsx";





import { componentTreeJFrameAssocs, } from "./JFrameComponent";

import { JFrameCss, } from "src/projects/jframes/util";
/** 
 * when a menu-item is a directory rather than a leaf,
 * we can call that "a menu-anchour" element
 * 
 * clicking any enabled item shall close the pop-up but there's some exception.
 * when the item is another nested menu the behv shall *not* reproduce.
 * when it's a meta button the behaviour shall *not* reproduce.
 * 
 */
function isControllerForPopupMenuMetaElement(...args: [Element]): boolean ;
function isControllerForPopupMenuMetaElement(...[srcEl]: [Element]): boolean {
  /** 
   * note that selecting the element itself will not be enough ;
   * a ClickEvent could have been on a descendant rather than merely on itself
   * 
   */
  {
    const sel1 = (
      "." + JFrameCss.PopupElMetaCtrlBtn
    ) ;
    return (
      srcEl.matches((
        ([sel1, `${sel1} * ` ] satisfies string[])
        .join(", ")
      ) )
    ) ;
  }
}


type FoldedMenuCompController = (
  & { setExpanded(v: boolean): void ; }
  & { setExpandedDueToEvent(...args: Parameters<HTMLIonPopoverElement["present"]>): void ; }
  & { isExpanded(): boolean ; }
);
export const {
  PlainFoldedMenuComp ,
  IonFoldedMenuComp ,
} = (() => {
  const getRenderer = (({

    renderHbn: Hbn ,

    asProperlyDecoratedItem ,
    renderItemBeingButtonlike ,
    
    deservesManualAutoDismiss ,

  } ) => (
    util.React.forwardRef(function GroupingMenuRImpl(...[
      {
        header: label ,
        children: items ,
      } , 
      exportsCb  ,
    ] : [
  
      props: (
        & { 
          
          /** 
           * 
           */
          header: null | string | number | util.React.ReactElement ; 
          
        }
        & Required<util.React.PropsWithChildren>
      ), 
      ref: util.React.ForwardedRef<(
        FoldedMenuCompController
      )>  ,
      
    ]) {
      const designatedId = (
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
      const closeBtnCallback = (
        expndElemRefed ? (() => expndElemRefed.dismiss()) : undefined
      ) ;
      /** 
       * the "heading", also the "anchour"
       * 
       */
      const headingBtn = (
        renderItemBeingButtonlike({
          id: designatedId + "-OpeningTrigger" ,
          className: `${JFrameCss.PopupElMetaCtrlBtn } ` ,
          onClick: ONCLICK_IONIC_POP ,
          children: label ,
        })
      ) ;
      /** 
       * the "close" btn
       */
      const closingBtn = (
        renderItemBeingButtonlike({
          className: `${JFrameCss.PopupElMetaCtrlBtn } ` ,
          onClick: closeBtnCallback ,
          children: <>cancel</> ,
        })
      ) ;
      const itemsFinal = (
        // has additional divider at the end
        [
          ...(
            util.React.Children.toArray(items)
            .map(e => (
              asProperlyDecoratedItem(<>{e }</> ) 
            ) )
          ) , 
          <Ionic.IonItemDivider />,
          asProperlyDecoratedItem(closingBtn) ,
        ]
      ) ;
      /** 
       * the contents of the popup
       */
      const popupContents = (
        <div 
        className={` ${JFrameCss.PopupItemsContainer } `}
        onClick={e => {
          if (deservesManualAutoDismiss) {
            ;
            const {
              srcElemController: srcEl ,
              isClickOnEnabledAppItem ,
              shallCauseCollapse ,
            } = analysePopoverClickEvt(e) ;
            if (shallCauseCollapse === false ) {
              // return ;
            } else {
              closeBtnCallback && closeBtnCallback() ;
            }
          }
        }}
        >
          { itemsFinal }
        </div>
      ) ;
      /** 
       * the `IonPopover`
       */
      const popupible = (
        <Ionic.IonPopover
        ref={expndElemRefUpdate }
        trigger={designatedId + "-OpeningTrigger" }
        showBackdrop={false }
        dismissOnSelect={deservesManualAutoDismiss === false}
        >
          { popupContents }
        </Ionic.IonPopover>
      ) ;
      const analysePopoverClickEvt = ((...[e]) => {
        ;
        const srcElemController = (
          (e.target as Element)
        ) ;
        /** 
         * when a menu-item is a directory rather than a leaf,
         * we can call that "a menu-anchour" element
         * 
         * clicking any enabled item shall close the pop-up but there's some exception.
         * when the item is another nested menu the behv shall *not* reproduce.
         * when it's a meta button the behaviour shall *not* reproduce.
         * 
         */
        const isClickOnEnabledAppItem = (
          (isControllerForButtonlike(srcElemController) === true) &&
          !isControllerForPopupMenuMetaElement(srcElemController) &&
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
      const onBlur: Required<JSX.IntrinsicElements["div"]>["onBlur"] = (
        e => {
          // setExpanded(e.currentTarget) ;
        } 
      ) ;
      return (
        // <div 
        // className={`${JFrameCss.Popup } ${JFrameCss.PopupBpv } ` }
        // onBlur={onBlur }
        // >
        //   { headingBtn }
        //   { popupible }
        // </div>
        Hbn({
          headingBtn ,
          expansion: popupible ,
          onBlur ,
        })
      ) ;
    })
  )) satisfies {
    
    (options: (
      {}
      & {

        renderHbn: {
          (props: (
            // & (
            //   & util.React.ComponentProps<"div">
            //   & util.React.ComponentProps<typeof util.React.Fragment>
            // )
            & {
              headingBtn: util.React.ReactElement ;
              expansion : util.React.ReactElement ;
            }
            & {
              onBlur: Required<JSX.IntrinsicElements["div"]>["onBlur"] ;
            }
          )): util.React.ReactElement ;
        } ;
    
        /** 
         * when used as child of plain `div` with `display: flex` no wrapping would be necessary ;
         * when used as child of `ion-list` it'd be necessary to wrap it with `ion-item` ;
         * 
         */
        asProperlyDecoratedItem: {
          (...args: [
            util.React.ReactElement, // can't use ReactNode, see the sgn for ReactChildrenToArray
          ]): util.React.ReactElement ;
        } ;
  
        /** 
         * when used as child of plain `div` with `display: flex` that'd be regular `<button>` or `<ion-button>` ;
         * when used as child of `ion-list` it'd need to be `<ion-item is-button>` ;
         * 
         * see also `asProperlyDecoratedItem`
         * 
         */
        renderItemBeingButtonlike: {
          (props: (
            & Omit<(
              & util.React.ComponentPropsWithoutRef<"button" >
              & util.React.ComponentPropsWithoutRef<typeof OpButton >
              & util.React.ComponentPropsWithoutRef<typeof Ionic.Button >
              & util.React.ComponentPropsWithoutRef<typeof Ionic.IonItem >
            ), "children" | "onClick" >
            & util.React.PropsWithChildren
            & {
              onClick ?: undefined | (typeof ONCLICK_IONIC_POP) | (() => void) ;
            }
          )): util.React.ReactElement ;
        } ;

        /** 
         * 
         * @see `<ion-popover>`
         */
        deservesManualAutoDismiss: boolean ;
  
      }
    )) : util.React.FC<any> ;

  } ;
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
  return {

    PlainFoldedMenuComp: getRenderer({

      renderHbn: ({
        headingBtn ,
        expansion: popupible ,
        onBlur ,
      }) => {
        ;
        return (
          <div 
          className={`${JFrameCss.Popup } ${JFrameCss.PopupBpv } ` }
          onBlur={onBlur }
          >
            { headingBtn }
            { popupible }
          </div>
        ) ;
      },

      asProperlyDecoratedItem: (e) => e ,      
      renderItemBeingButtonlike: ({
        children: usrLabel ,
        onClick ,
        ...props
      }) => {
        const label = (
          <>
          { usrLabel } <Ionic.Icon icon={ionIcons.ellipsisVertical } />
          </>
        ) ;
        if (onClick === ONCLICK_IONIC_POP) {
          return (
            <button type="button" {...props} children={label} /> 
          ) ;
        }
        return (
          <OpButton onClick={onClick } {...props} children={label} /> 
        ) ;
      } ,

      deservesManualAutoDismiss: true ,

    }) ,

    IonFoldedMenuComp: getRenderer({
      
      renderHbn: ({
        headingBtn ,
        expansion: popupible ,
        onBlur ,
      }) => {
        ;
        return (
          <>
            { headingBtn }
            { popupible }
          </>
        ) ;
      },

      asProperlyDecoratedItem: (
        e => {
          if (e.type === IonFoldedMenuComp) {
            return e ;
          }
          return (
            renderIonicItemFromElement(e)
          ) ;
        }
      ) ,
      renderItemBeingButtonlike: ({
        children: usrLabel ,
        onClick ,
        ...props
      }) => {
        const label = (
          <>
          { usrLabel } <Ionic.Icon icon={ionIcons.ellipsisVertical } />
          </>
        ) ;
        if (onClick === ONCLICK_IONIC_POP) {
          return (
            <Ionic.Item button type="button" {...props} children={label} /> 
          ) ;
        }  
        return (
          <Ionic.Item button type="button" onClick={onClick } {...props} children={label} /> 
        ) ;
      } ,

      deservesManualAutoDismiss: true ,
      
    }) ,
    
  } ;
})() ;

export const FoldedMenuComp = (
  IonFoldedMenuComp
) ;

/** 
 * rather than passing a `function`,
 * pass this special-value, causing the resulting button to be "ionic"
 * 
 * ```
 * <div>
 *  <button id="popup-trigger" />
 *  <ion-popover trigger="popup-trigger" ... />
 * </div>
 * ```
 * 
 */
const ONCLICK_IONIC_POP = Symbol() ;






























export {} ; // TS(1208)
