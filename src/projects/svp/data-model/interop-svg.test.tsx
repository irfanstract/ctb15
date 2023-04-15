

import * as util from "src/projects/svp/util" ;
import * as main from "./interop-svg" ;

// import * as React from 'react';
// import { render } from '@testing-library/react';

(
  [
    "M 0 0 L 32 32" ,
    "M 0 0 32 32 48 48" ,
    "M 0 0 32 0.32 0.48 48" ,
    // "M 0 0 32 0.32.48 48" , // won't work
  ]
  .forEach(code => {
    test(`tokenisePathDString(${JSON.stringify(code) }) behaves as expected`, () => {
      (
        expect((
          main.tokenisePathDString(code)
          .join(" ")
        ) )
        .toStrictEqual(code)
      ) ;
    });
  })
) ;



