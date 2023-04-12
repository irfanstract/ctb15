
import * as util from "src/projects/jframes/util" ;










import { ionIcons, } from "src/projects/jframes/util";

import Button from "src/projects/Button";
import { CallbackButton, } from "src/projects/jframes/util";

import { Ionic, } from "src/projects/jframes/util";

import { FoldedMenuComp, } from "./PopupMenu";

const JFrameComp = (
  (({
    style: styleProps ,
    editHandler ,
    undoManager ,
  }) => {
    const menuBar = (
      renderDemoMenuBar({
        editHandler ,
        undoManager ,
      })
    ) ;
    const mainContent = (
      <div>
        <Ionic.ToolBar>
          <CallbackButton 
          children={<Ionic.Icon icon={ionIcons.arrowUndo } /> }
          onClick={undoManager?.undo }
          />
          <CallbackButton
          children={<Ionic.Icon icon={ionIcons.arrowRedo } /> }
          onClick={undoManager?.redo }
          />
          <CallbackButton 
          children={<Ionic.Icon icon={ionIcons.cut } /> }
          onClick={editHandler?.invokeCut }
          />
          <CallbackButton 
          children={<Ionic.Icon icon={ionIcons.copy } /> }
          onClick={editHandler?.invokeCopy }
          />
          <CallbackButton 
          children={<Ionic.Icon icon={ionIcons.clipboard } /> }
          onClick={editHandler?.invokePaste }
          />
        </Ionic.ToolBar>
        <div>
          <p>
            User Content Goes Here
          </p>
          <p>
            User Content Goes Here
          </p>
          <p>
            User Content Goes Here
          </p>
          <p>
            User Content Goes Here
          </p>
          <p>
            User Content Goes Here
          </p>
        </div>
      </div>
    ) ;
    const masterController = (
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
      style={{
        display: "flex" ,
        flexDirection: "column-reverse" ,
      }}
      >
      <div>
        { mainContent }
      </div>
      <div>
        { menuBar }
      </div>
      </div>
      </div>
      </WithGivenAssociatedJFrame>
    ) ;
  }) satisfies (
    util.React.FC<(
      & { style ?: util.React.CSSProperties ; }
      & EditorOptions
    )>
  )
) ;

interface JFrameController {
  registeredPopupControllerSet: Set<HTMLIonPopoverElement> ;
  closeAllPopups: () => void ;
}

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
const {
  WithGivenAssociatedJFrame  ,
  WithAssociatedJFrame ,
  useCurrentAssociatedJFrame ,
} = componentTreeJFrameAssocs ;

import { JFrameCss, } from "src/projects/jframes/util";

interface EditorOptions {
  undoManager ?: {
    undo?: () => void ;
    redo?: () => void ;
    noneUnsavedChanges ?: boolean ; 
    versionNumber ?: number | string ;
  } ;
  editHandler ?: (
    & {
      [k in keyof (
        & { 
          [k: `invoke${string }`]: true ; 
          invokeCut  : true ;
          invokeCopy : true ;
          invokePaste: true ;
        }
      )]?: () => void ;
    }
    & (
      (
        & { clear(): void ; }
        & { reset(): void ; }
        & { restore(): void ; }
      ) extends infer CanBeReset ? 
      ({ [k in keyof CanBeReset] ?: never ; } | CanBeReset) : never
    )
  ) ;
} ;
type EditorOptionsTp = Required<EditorOptions> ;

const renderDemoMenuBar: {
  (options ?: (
    & EditorOptions
  )) : util.React.ReactElement ;
} = ({
  undoManager ,
  editHandler ,
} = {}) => {
  return (
    <Ionic.ToolBar 
    className={`  `}
    >
    <div
    className={`${JFrameCss.Menubar } `}
    >
      <FoldedMenuComp
      header={"File"}
      >
        <Button 
        children={"New"} 
        /> 
        <Button 
        children={"Open"} 
        />
        <Button 
        children={"Save"} 
        />
      </FoldedMenuComp>
      <FoldedMenuComp 
      header={"Edit"}
      >
        <CallbackButton 
        children={"undo" }
        onClick={undoManager?.undo }
        />
        <CallbackButton
        children={"redo" }
        onClick={undoManager?.redo }
        />
        <CallbackButton 
        children={"Cut" }
        onClick={editHandler?.invokeCut }
        />
        <CallbackButton 
        children={"Copy" }
        onClick={editHandler?.invokeCopy }
        />
        <CallbackButton 
        children={"Paste" }
        onClick={editHandler?.invokePaste }
        />
        <FoldedMenuComp 
        header={"advanced"}
        >
          <CallbackButton 
          children={"View And Compare The Complete Rev History"} 
          />
        </FoldedMenuComp>
        <WithAssociatedJFrame>
        { c => (
          <CallbackButton 
          children={<Ionic.Icon icon={ionIcons.bulb } /> }
          onClick={c ? (() => c.closeAllPopups()) : undefined }
          />
        ) }
        </WithAssociatedJFrame>
      </FoldedMenuComp>
      <FoldedMenuComp 
      header={"View"}
      >
        <Button 
        children={"Copy Screengrab"} 
        />
        <FoldedMenuComp 
        header={"Advanced"}
        >
          <Button 
          children={"Caret And Cursor Settings"} 
          />
        </FoldedMenuComp>
      </FoldedMenuComp>
      <FoldedMenuComp 
      header={"Scaffolding"}
      children={[]}
      />
      <FoldedMenuComp 
      header={"Refactor"}
      children={[]}
      />
      <FoldedMenuComp 
      header={"Deploy"}
      children={[]}
      />
      <FoldedMenuComp 
      header={"Tools"}
      children={[]}
      />
      <FoldedMenuComp 
      header={"Help"}
      children={[]}
      />
    </div>
    </Ionic.ToolBar>
  ) ;
} ;

export default JFrameComp ;












































export {} ; // TS(1208)
