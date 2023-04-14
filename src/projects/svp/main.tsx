

import * as util from "src/projects/svp/util" ;









import type contentAdapters from "src/projects/svp/content-adapters/main";

import * as contentHandling from "src/projects/svp/content-adapters/main";

const content0: contentHandling.SupportedCaDesc = {
  type: "g" ,
  transform: (
    JSON.stringify({
      m11: 1.5 ,
    })
  ) ,
  childItems: [
    {
      type: "path" ,
      spec: `M 0 0 L 200 0 L 0 200 Z ` ,
    } ,
    {
      type: "path" ,
      spec: `M 0 0 L 200 0 L 200 200 Z ` ,
    } ,
  ] ,
} ;

export default (
  util.React.forwardRef<{}, {}>(function SvpRender() {
    const [content, setContent] = (
      util.React.useState<contentHandling.SupportedCaDesc>(content0)
    ) ;
    const {
      hoverPos ,
      setHoverPos ,
    } = useXHoverState() ;
    // const ContentComp = (
    //   contentAdapters[content.type].render
    // ) ;
    return (
      <div
      style={{
        display: "flex" ,
        flexDirection: "column" ,
      }}
      >
      <svg 
      className={`SvpMain ` }
      viewBox={`0 0 500 250 `}
      style={{
      }}
      children={( 
        <g>
        { contentHandling.renderEditorForCa({
          ...content ,

          onChange: ({ newValue, }) => {
            // @ts-ignore
            setContent(newValue) ;
          } ,

        } ) }
        { 0 && (
        <HoverMnComp 
        onPointerLeave={() => {
          setHoverPos(false) ;
        } }
        onPointerMoveRelative={(evt) => {
          const pos = (
            evt.newPos
          ) ;
          setHoverPos(pos );
        }}
        />
        ) }
        </g>
      )}
      />
      <div>
        <table>
          <tbody>
          <tr>
            <td>Pos:</td>
            <td>
            <pre>
              { JSON.stringify(hoverPos, null, 2) }
            </pre> 
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      </div>
    ) ;
  })
) ;

import {
  getCtmImpl ,
  getPointEvtCoordsInfo ,
  getPointEvtRelativePos ,
} from "src/projects/svp/pointerEventHandling" ;

import {
  HoverListeningComp as HoverMnComp ,
} from "src/projects/svp/pointerEventHandling" ;
import { useXHoverState, } from "src/projects/svp/content-adapters/for-g-nodes";




































export {} ; // TS-1208
