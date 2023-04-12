
import * as util from "src/utility-functions/all" ;










import * as ionIcons from "ionicons/icons" ;

import Button from "./Button";

import * as Ionic from "src/projects/Ionic" ;

const JFrameR = (
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
          { (
            undoManager ? (
              <>
              <Button 
              children={<Ionic.Icon icon={ionIcons.arrowUndo } /> }
              />
              <Button 
              children={<Ionic.Icon icon={ionIcons.arrowRedo } /> }
              />
              </>
            ) : (
              <Button 
              disabled
              children={<Ionic.Icon icon={ionIcons.arrowUndo } /> }
              />
            )
          ) }
          { (
            editHandler ? (
              <>
              <Button 
              children={<Ionic.Icon icon={ionIcons.cut } /> }
              />
              <Button 
              children={<Ionic.Icon icon={ionIcons.copy } /> }
              />
              <Button 
              children={<Ionic.Icon icon={ionIcons.clipboard } /> }
              />
              </>
            ) : (
              <Button 
              disabled
              children={<Ionic.Icon icon={ionIcons.cut } /> }
              />
            )
          ) }
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
        </div>
      </div>
    ) ;
    const cssId = (
      util.React.useId()
    ) ;
    return (
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
    ) ;
  }) satisfies (
    util.React.FC<(
      & { style ?: util.React.CSSProperties ; }
      & EditorOptions
    )>
  )
) ;

import JFrameCss from "./JFrame.module.css" ;

interface EditorOptions {
  undoManager ?: {
    undo(): void ;
    redo(): void ;
  } ;
  editHandler ?: {} ;
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
      <GroupingMenuR
      label={"File"}
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
      </GroupingMenuR>
      <GroupingMenuR 
      label={"Edit"}
      >
        { (
          undoManager ? (
            <>
            <Button 
            children={"Undo"} 
            onClick={() => undoManager.undo() }
            />
            <Button 
            children={"Redo"} 
            onClick={() => undoManager.redo() }
            />
            </>
          ) : (
            <>
            <Button 
            disabled
            children={"Can't Undo"} 
            /> 
            </>
          )
        ) }
        { (
          editHandler ? (
            <>
            <Button 
            children={"Cut"} 
            />
            <Button 
            children={"Copy"} 
            />
            <Button 
            children={"Paste"} 
            />
            </>
          ) : (
            <>
            <Button 
            disabled
            children={"Can't Edit"} 
            /> 
            </>
          )
        ) }
        <GroupingMenuR 
        label={"Advanced"}
        >
          <Button 
          children={"View And Compare The Complete Rev History"} 
          />
        </GroupingMenuR>
      </GroupingMenuR>
      <GroupingMenuR 
      label={"View"}
      >
        <Button 
        children={"Copy Screengrab"} 
        />
        <GroupingMenuR 
        label={"Advanced"}
        >
          <Button 
          children={"Caret And Cursor Settings"} 
          />
        </GroupingMenuR>
      </GroupingMenuR>
      <GroupingMenuR 
      label={"Scaffolding"}
      children={[]}
      />
      <GroupingMenuR 
      label={"Refactor"}
      children={[]}
      />
      <GroupingMenuR 
      label={"Deploy"}
      children={[]}
      />
      <GroupingMenuR 
      label={"Tools"}
      children={[]}
      />
      <GroupingMenuR 
      label={"Help"}
      children={[]}
      />
    </div>
    </Ionic.ToolBar>
  ) ;
} ;

const GroupingMenuR : (
  util.React.FC<(
    & { label: null | string | number | util.React.ReactElement ; }
    & Required<util.React.PropsWithChildren>
  )>
) = ({
  label ,
  children: items ,
}) => {
  const eId = (
    util.React.useId()
  ) ;
  const expndElemRef = (
    util.React.useState<null | HTMLIonPopoverElement>(null) 
  ) ;
  return (
    <div 
    className={`${JFrameCss.Popup } ${JFrameCss.PopupBpv } ` }
    onBlur={e => {
      // setExpanded(e.currentTarget) ;
    } }
    >
      <Button
      onClick={(e) => {
        const c = expndElemRef[0] ;
        if (!c) return ;
        c.present(e.nativeEvent) ;
      }}
      >
        { label } {">>>"}
      </Button>
      <Ionic.IonPopover
      ref={expndElemRef[1] }
      >
      <div className={` ${JFrameCss.PopupItemsContainer } `}>
        { items }
      </div>
      </Ionic.IonPopover>
    </div>
  ) ;
} ;

export default JFrameR ;












































export {} ; // TS(1208)
