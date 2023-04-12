
import * as util from "src/projects/jframes/util" ;










import { ionIcons, } from "src/projects/jframes/util";

import Button from "src/projects/Button";
import { OpButton, } from "src/projects/jframes/util";

import { Ionic, } from "src/projects/jframes/util";

import { FoldedMenuComp, } from "./PopupMenu";

const JFrameComp = (
  (({
    style: styleProps ,
    editHandler ,
    undoManager ,
  }) => {
    const windowMgmtMenuBar = (
      renderDemoMenuBar({
        editHandler ,
        undoManager ,
      })
    ) ;
    const debugSideBar = (
      <Ionic.ToolBar>
        <button>
          24 lines
        </button>
        <button>
          24 lines
        </button>
      </Ionic.ToolBar>
    ) ;
    const mainContent = (
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
    ) ;
    const frequentToolsBar = (
      <Ionic.ToolBar>
        <OpButton 
        children={<Ionic.Icon icon={ionIcons.arrowUndo } /> }
        onClick={undoManager?.undo }
        />
        <OpButton
        children={<Ionic.Icon icon={ionIcons.arrowRedo } /> }
        onClick={undoManager?.redo }
        />
        <OpButton 
        children={<Ionic.Icon icon={ionIcons.cut } /> }
        onClick={editHandler?.invokeCut }
        />
        <OpButton 
        children={<Ionic.Icon icon={ionIcons.copy } /> }
        onClick={editHandler?.invokeCopy }
        />
        <OpButton 
        children={<Ionic.Icon icon={ionIcons.clipboard } /> }
        onClick={editHandler?.invokePaste }
        />
      </Ionic.ToolBar>
    ) ;
    const nonSidebarContent = (
      <div>
        { frequentToolsBar }
        <div className="JFrameContent" >
        { mainContent }
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
      >
        <div
        style={{
          display: "flex" ,
          flexDirection: "column-reverse" ,
        }}
        >
          <div style={{ order: -5000, }} >
            { nonSidebarContent }
          </div>
          <div style={{ order: -1000, }} >
            { windowMgmtMenuBar }
          </div>
          <div style={{ order: -9000, }} >
            { debugSideBar }
          </div>
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
        <OpButton 
        children={"Save"} 
        />
        <Ionic.IonItemDivider />
        <OpButton 
        children={"Close"} 
        />
      </FoldedMenuComp>
      <FoldedMenuComp 
      header={"Edit"}
      >
        <OpButton 
        children={"undo" }
        onClick={undoManager?.undo }
        />
        <OpButton
        children={"redo" }
        onClick={undoManager?.redo }
        />
        <OpButton 
        children={"Cut" }
        onClick={editHandler?.invokeCut }
        />
        <OpButton 
        children={"Copy" }
        onClick={editHandler?.invokeCopy }
        />
        <OpButton 
        children={"Paste" }
        onClick={editHandler?.invokePaste }
        />
        <FoldedMenuComp 
        header={"advanced"}
        >
          <OpButton 
          children={"View And Compare The Complete Rev History"} 
          />
        </FoldedMenuComp>
        <WithAssociatedJFrame>
        { c => (
          <OpButton 
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
