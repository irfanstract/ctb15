
import * as util from "src/projects/jframes/util" ;










import { ionIcons, } from "src/projects/jframes/util";

import Button from "src/projects/Button";
import { OpButton, } from "src/projects/jframes/util";

import { Ionic, } from "src/projects/jframes/util";

import { FoldedMenuComp, } from "./PopupMenu";
import { PlainFoldedMenuComp, } from "./PopupMenu"; 
import { IonFoldedMenuComp, } from "./PopupMenu";

import JFrameComp from "./JFrameComponent";

const FilevwFrameComp = (
  (function FilevwFrameCompRender({
    style: styleProps ,
    editHandler ,
    undoManager ,
  }) {
    const windowMgmtMenuBar = (
      renderBasicRichMenuBar({
        editHandler ,
        undoManager ,
      })
    ) ;
    const statsBar = (
      <Ionic.ToolBar>
        <button>
          24 lines
        </button>
        <button>
          24 lines
        </button>
      </Ionic.ToolBar>
    ) ;
    const mainDocContentView = (
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
      renderBasicRichFrequentToolsBar({
        undoManager ,
        editHandler ,
      })
    ) ;
    const mainContent = (
      <div
      className="JFrameContentAndToolbar "
      style={{
        display: "flex" ,
        flexDirection: "column-reverse" ,
      }}
      >
        <div style={{ order: 0 , }}>
          <div className="JFrameContent " >
          { mainDocContentView }
          </div>
        </div>
        <div style={{ order: 1000 , }}>
          { frequentToolsBar }
        </div>
      </div>
    ) ;
    return (
      <JFrameComp 
      {...(
        {
          mainContent ,
          opListing: windowMgmtMenuBar ,
          statsBar ,

          style: styleProps ,

        } satisfies /* ensure that THERE BE NO MISSED PROPERTY */ (
          util.MustSpecifyAll<(
            util.React.ComponentProps<typeof JFrameComp>
          )>
        ) 
      )}
      />
    ) ;
  }) satisfies (
    util.React.FC<(
      & util.PickAll<JSX.IntrinsicElements["div"], keyof util.React.ComponentProps<typeof JFrameComp> >
      & EditorOptions
    )>
  )
) ;

;

import { ContentWithOpListingAndStatBarAggregatingComp, } from "./JFrameComponent";

export interface EditorOptions {
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
export type EditorOptionsTp = Required<EditorOptions> ;

export const XMenuBarComp = (
  ({
    children ,
    style ,
  } : Pick<JSX.IntrinsicElements["div"], "children" | "style">) => (
    <Ionic.ToolBar
    className={`  `}
    style={style}
    >
      <div 
      className={`${JFrameCss.Menubar } `}
      >
        { children }
      </div>
    </Ionic.ToolBar>
  )
) ;

export const renderBasicRichMenuBar: {
  (options ?: (
    & EditorOptions
  )) : util.React.ReactElement ;
} = ({
  undoManager ,
  editHandler ,
} = {}) => {
  return (
    <>
    <XMenuBarComp
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
        <Ionic.IonItemDivider 
        />
        <OpButton 
        children={"Save"} 
        onClick={undefined }
        />
        <Ionic.IonItemDivider 
        />
        <OpButton 
        children={"Close"} 
        onClick={undefined }
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
        <Ionic.IonItemDivider 
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
        <Ionic.IonItemDivider 
        />
        <FoldedMenuComp 
        header={"advanced"}
        >
          <OpButton 
          children={"View And Compare The Complete Rev History"} 
          onClick={undefined }
          />
        </FoldedMenuComp>
        <Ionic.IonItemDivider 
        />
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
        <OpButton 
        children={"Copy Screengrab"} 
        onClick={undefined }
        />
        <Ionic.IonItemDivider 
        />
        <FoldedMenuComp 
        header={"Advanced"}
        >
          <OpButton 
          children={"Caret And Cursor Settings"} 
          onClick={undefined }
          />
          <Ionic.IonItemDivider 
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
    </XMenuBarComp>
    </>
  ) ;
} ;
export const renderBasicRichFrequentToolsBar: {
  (options ?: (
    & EditorOptions
  )) : util.React.ReactElement ;
} = ({
  undoManager ,
  editHandler ,
} = {}) => {
  return (
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
} ;

export default FilevwFrameComp ;





import { JFrameController, } from "./JFrameComponent";

import {
  componentTreeJFrameAssocs ,
  WithGivenAssociatedJFrame  ,
  WithAssociatedJFrame ,
  useCurrentAssociatedJFrame ,
} from "./JFrameComponent";

import { JFrameCss, } from "src/projects/jframes/util";













































export {} ; // TS(1208)
