

import * as util from "src/projects/svp/util" ;












export  { PathOps , } ;
class PathOps {
  
  private constructor(_: "by-path-d", protected d: string) {}

  static byPathD(d: string) : PathOps
  static byPathD(d: string) {
    util.assert.ok(d.match(/^\s*[mM]/g), (
      TypeError(`does not begin with MoveTo: '${d }'`)
    ) )
    return new PathOps("by-path-d", d) ;
  }

  andThen(p: PathOps): PathOps ; 
  andThen(that: PathOps) {
    return (
      PathOps.byPathD(`${this.d } ${that.d }`)
    ) ;
  }

  toSvgD(): string ;
  toSvgD() {
    return this.d ;
  }

}
interface PathOps {
}
interface PathOps extends PathOrAreaGetEnclosedArea<PathOps> {}
interface PathOps extends PathOrAreaAsExtruded<PathOps> {}
namespace PathOps {

  export enum WindingRule {
    EvenOdd = "evenodd" ,
    NonZero = "nonzero" ,
  }

  ; // TS(1205)
} 

interface PathOrAreaGetEnclosedArea<This> {
  
  getEnclosedArea(options: (
    & {
      windingRule: PathOps.WindingRule ;
    }
  )): AreaOps ;

}
interface PathOrAreaAsExtruded<This> {
  
  asExtruded(options: (
    | (
      & Pick<(
        Required<JSX.IntrinsicElements["path"]>
      ), "strokeWidth" | "strokeLinejoin" | "strokeLinecap" | "strokeMiterlimit" > 
    )
  )): This ;

}

class AreaOps {
  
  abstract unifiedWith(p: AreaOps): AreaOps ; 
  abstract intersectedWith(p: AreaOps): AreaOps ; 

  // getOutline(options?: {}): PathOps ;
  // getOutline(...[options = {}, ]: Parameters<this["getOutline"]> ) {
  //   return this.implGetOutline(options) ;
  // }
  //
  // protected abstract implGetOutline(...args: Required<Parameters<AreaOps["getOutline"]>> ): PathOps ;

  ex() {
    // new (class extends AreaOps {})() ;
    this.asExtruded({
      strokeWidth: 5 ,
      strokeLinecap: "round" ,
      strokeLinejoin: "round" ,
      strokeMiterlimit: 5 ,
    }) ;
  }
  
}
interface AreaOps {

  getOutline(options?: {}): PathOps ;

}
interface AreaOps extends PathOrAreaAsExtruded<AreaOps> {}
namespace AreaOps { ; } // TS(1205)
export  { AreaOps , } ;

;

// interface ConcatenableWithThat<That> {
//   andThen(that: That): That ; 
// }
;




















export {} ; // TS-1208
