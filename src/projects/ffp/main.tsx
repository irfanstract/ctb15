

import * as util from "src/utility-functions/all" ;

import FFM from "@ffmpeg.wasm/main" ;
import ffmCoreUrl from "@ffmpeg.wasm/core-st/dist/ffmpeg-core?url" ;
import { ffmpg, } from "src/projects/ffp/core";
import { ensureFfmpgLoaded, } from "src/projects/ffp/core";

// import FfCdcWorker from "./mw?worker" ; // see below
// const FfCdcWorker = (
//   class extends Worker {
//     constructor() {
//       super(new URL("./mw.ts", import.meta.url), {
//         type: "module" ,
//       } ) ;
//     }
//   }
// ) ;
// import FfCdcWorker from "./mw?worker" ; 
// const FfCdcWorker = (
//   class extends Worker {
//     constructor() {
//       super(new URL("./mw.ts", import.meta.url), {
//         type: "module" ,
//         format: "iife",
//       } ) ;
//     }
//   }
// ) ;
import FfCdcWorker from "./mw?worker" ; 

;







/** 
 * 
 * @deprecated
 */
export const newFfWorker = (
  ((...args: ConstructorParameters<typeof FfCdcWorker>) => (
    new FfCdcWorker(...args)
  )) satisfies {
    (): Worker ;
  }
) ;

export const devPrintFfHelp = (): void => {
  (async () => {
    // const mode: 1 | 2 = ((): [1 | 2] => [2])()[0] ;
    // switch (mode) {
    //   case 1 : 
    //   {
    //     const thread = newFfWorker() ;
    //     await new Promise<void>(continue1 => (
    //       setTimeout(continue1, 3 * 1000 )
    //     ) );
    //     console["log"]("[devPrintFfHelp]", "done") ;
    //     thread.terminate() ;
    //   }
    //   break ;
    //   case 2 :
    //   {
    //     try {
    //       console["log"]({ ffmpg, }) ; ;
    //       await ensureFfmpgLoaded() ;
    //       await ffmpg.run() ;
    //     } finally {
    //       (ffmpg as FFM.FFmpeg ).exit() ;
    //     }
    //   }
    // }
    {
      const thread = newFfWorker() ;
      await new Promise<void>(continue1 => (
        setTimeout(continue1, 3 * 1000 )
      ) );
      console["log"]("[devPrintFfHelp]", "done") ;
      thread.terminate() ;
    }
  })() ;
} ;

export const DpfhButton = (
  () => {
    return (
      <button
      onClick={() => devPrintFfHelp() }
      >
        DPFH
      </button>
    ) ;
  }
) ;





































export {} ; // TS(1208)

