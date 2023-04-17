

import * as util from "src/projects/svp/util" ;

const Kk = util.React.Fragment ;

import * as main from "./interop-svg" ;











export default (
  (): util.React.ReactElement => {
    const pTestsPane = (
      <div>
        <p>P Tests</p>
        <ul>
          { (
            [
              { subject: `M 3 3 L 5 5 l 7 7 z`, } ,
              { subject: `M 3 3 5 5 7 7 z`, } ,
              { subject: `m 3 3 5 5 7 7 z`, } ,
              { subject: `M 3 , 3 L 5 5 z`, } ,
              { subject: `M 3 , 3 5 5 7 7 9 9 L 11 11 z`, } ,
              { subject: `m 3 , 3 5 5 7 7 V 11 T 11 11 z`, } ,
              { subject: `m 3 , 3 S 5 5 7 7 V 11 z`, } ,
              { subject: "m 3 , 3 5 5 7 7", } ,
              { subject: "M 3 , 3 5 5 7 7", } ,
              { subject: "m 3 , 3 Q 5 5 7 7 11 11 8 8 z", } ,
              { subject: "m 3 , 3 q 5 5 7 7 11 11 8 8 h 2 3 z", } ,
              { subject: "m 3 , 3 C 5 5 7 7 11 11 z", } ,
              { subject: "m 3 , 3 A 5 5 90 0 0 11 11 A 12 12 45 0 1 5 5 z", } ,
            ]
            .map((c, i) => {
              return (
                <Kk key={i}>
                  <li>
                    <table>
                    <tbody>
                      <tr>
                        <td>Raw</td>
                        <td><code>{ c.subject }</code></td>
                      </tr>
                      <tr>
                        <td>Raw Tokenised</td>
                        <td><code>{ JSON.stringify(main.tokenisePathDString(c.subject ) ) }</code></td>
                      </tr>
                      <tr>
                        <td>Raw Coords</td>
                        <td><code>{ JSON.stringify(main.parsePathDStringPre(c.subject ) ) }</code></td>
                      </tr>
                      <tr>
                        <td>Descs</td>
                        <td><pre>{ JSON.stringify(main.parsePathDString(c.subject ), null, 2 ) }</pre></td>
                      </tr>
                    </tbody>
                    </table>
                  </li>
                </Kk>
              ) ;
            })
          ) }
        </ul>
      </div>
    ) ;
    return (
      pTestsPane
    ) ;
  }
) ;

/** 
 * the editor, as SVG markup
 */
const PathDSvEditComp = (
  util.React.forwardRef<unknown, (
    & {
      value: string ;
      mainStyle?: util.React.CSSProperties ;
    }
  )>((...[
    { 
      value: code,
      mainStyle = {} ,
    } ,
  ]) => {
    const {
      codeParsed ,
      codeParsedNormalised ,
    } = usePsvCodeParse(code) ;
    const lineStylingCssProps = {
      
      stroke: "black" ,
      strokeWidth: 5 ,

      ...mainStyle ,
      
    } satisfies util.React.CSSProperties ;
    const mainPresentation = (
      <g
      style={{
        ...lineStylingCssProps ,
        ...mainStyle ,
      } }
      >
        <path 
        d={code }
        style={{
          fill: "gray" ,
        } }
        />
      </g>
    ) ;
    ;
    return (
      <g>
        { mainPresentation }
      </g>
    ) ;
  })
) ;
const usePsvCodeParse = (
  (code: string) => {
    ;
    const codeParsed = (
      util.React.useMemo(() => (
        main.parsePathDString(code)
      ), [main, code, ] )
    ) ;
    const codeParsedNormalised = (
      util.React.useMemo(() => (
        main.toAbsoluteCoordedPathData(codeParsed)
      ), [main, codeParsed, ] )
    ) ;
    ;
    return {
      code ,
      codeParsed ,
      codeParsedNormalised ,
    } ;
  }
) ;





























export {} ; // TS(1208)
