

import * as util from "src/utility-functions/all" ;

import FFM from "@ffmpeg.wasm/main" ;
import ffmCoreUrl from "@ffmpeg.wasm/core-st/dist/ffmpeg-core?url" ;







console["log"](TypeError("ffp/core.ts")) ;
console["log"]({ FFM, }) ;

const ffmp = (
  FFM.createFFmpeg({

    /** 
     * explicitly specify {@link ffmCoreUrl }.
     * would choose the wrong version otherwise (see "COOP And COEP"!).
     */
    corePath: ffmCoreUrl ,

    // logger: (...args) => {} ,
    // progress: (...args) => {} ,
    logger: (...[{ message, }]) => {
      console["log"]("[FFMPG]", message,) ;
    } ,

  })
) ;
// /** 
//  * disabled for now, since `FFMP.load()` calls `importScripts`.
//  * 
//  */
if (1) {
  /** 
   * while this had choice to leave the responsibility of the `load()` call to API users,
   * that'd present usability issues, so
   * need to take care of that here making use of "top-level await".
   * 
   */
  await ensureFfmpgLoaded() ;
}
/** 
 * left here for now, since `FFMP.load()` calls `importScripts`.
 * 
 */
export async function ensureFfmpgLoaded(): Promise<void> ;
export async function ensureFfmpgLoaded() {
  if ((ffmp.isLoaded() satisfies boolean ) === false ) {
    await ffmp.load() ;
  }
  util.assert.ok(ffmp.isLoaded() ) ;
} ;

/** 
 * 
 * 
 * @see no `this.exit` or `this.load` ; they're internal only
 * 
 */
export const ffmpg: (
  Omit<typeof ffmp, "exit" | "load">
) = (
  ffmp
) ;
ffmpg.FS;
/** log it out */
console["log"]({ ffmpg, }) ;





































export {} ; // TS(1208)

