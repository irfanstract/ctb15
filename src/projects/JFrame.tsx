
import * as util from "src/utility-functions/all" ;










import * as ionIcons from "ionicons/icons" ;

import Button from "./Button";

import * as Ionic from "src/projects/Ionic" ;

const JFrameR = (
  (({
    style: styleProps ,
  }) => {
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
        <Ionic.ToolBar>
          <Button 
          children={<Ionic.Icon icon={ionIcons.arrowUndo } /> }
          />
          <Button 
          children={<Ionic.Icon icon={ionIcons.arrowRedo } /> }
          />
          <Button 
          children={<Ionic.Icon icon={ionIcons.cut } /> }
          />
          <Button 
          children={<Ionic.Icon icon={ionIcons.copy } /> }
          />
          <Button 
          children={<Ionic.Icon icon={ionIcons.clipboard } /> }
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
        </div>
      </div>
      <div>
        <Ionic.ToolBar className={`${JFrameCss.Menubar } `}
        >
          <XPopupMenu
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
          </XPopupMenu>
          <XPopupMenu 
          label={"Edit"}
          >
            <Button 
            children={"Undo"} 
            />
            <Button 
            children={"Redo"} 
            />
          </XPopupMenu>
          <XPopupMenu 
          label={"View"}
          children={[]}
          />
          <XPopupMenu 
          label={"Scaffolding"}
          children={[]}
          />
          <XPopupMenu 
          label={"Refactor"}
          children={[]}
          />
          <XPopupMenu 
          label={"Deploy"}
          children={[]}
          />
          <XPopupMenu 
          label={"Tools"}
          children={[]}
          />
          <XPopupMenu 
          label={"Help"}
          children={[]}
          />
        </Ionic.ToolBar>
      </div>
      </div>
      </div>
    ) ;
  }) satisfies (
    util.React.FC<(
      & { style ?: util.React.CSSProperties ; }
    )>
  )
) ;

import JFrameCss from "./JFrame.module.css" ;

const XPopupMenu : (
  util.React.FC<(
    & { label: null | string | number | util.React.ReactElement ; }
    & Required<util.React.PropsWithChildren>
  )>
) = ({
  label ,
  children: items ,
}) => {
  return (
    <div className={`${JFrameCss.Popup } ` }>
      <Button>
        { label }
      </Button>
      <div className={`${JFrameCss.PopupCd2 }   `}>
      <div className={` ${JFrameCss.PopupItemsContainer } `}>
        { items }
      </div>
      </div>
    </div>
  ) ;
} ;

export default JFrameR ;












































export {} ; // TS(1208)
