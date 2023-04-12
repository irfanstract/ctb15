

import * as util from "src/utility-functions/all" ;

import FFM from "@ffmpeg.wasm/main" ; 
import ffmCoreUrl from "@ffmpeg.wasm/core-st/dist/ffmpeg-core?url" ;  
import { ffmpg,   } from "src/projects/ffp/core";
import {  ensureFfmpgLoaded, } from "src/projects/ffp/core";

/** 
 * ONLY INTENDED TO BE IMPORTED AS WORKER-SCRIPT ;
 * DO NOT ADD `export`S!!!
 * 
 */
;

declare const global : WindowOrWorkerGlobalScope ;

// {
//   const g1 = globalThis as object as { importScripts: any ; } ;
//   const { importScripts: gImportOriginal, } = g1 ;
//   g1.importScripts = (
//     (...args: unknown[]) => (
//       gImportOriginal(...args)
//     )
//   ) ;
// }
// {
//   // const g1 = globalThis as object as { importScripts: any ; } ;
//   // g1.importScripts(ffmCoreUrl) ;
// }
;







(async () => {
  // await (
  //   ((ffmpg satisfies Partial<FFM.FFmpeg>) as FFM.FFmpeg )
  //   .load()
  // ) ;
  await (
    ffmpg.run()
  ) ;
} )() ;





































export {} ; // TS(1208)

