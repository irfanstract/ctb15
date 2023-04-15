











import * as assert from "./assert";
export { assert, } ;

import * as Immutable from "immutable";
export { Immutable, };

import * as _ from "lodash";
export { _, } ;

export const isNumericString: { (code: string): code is `${number}` ; } = (
  (cm: string): cm is `${number}` => (
    /** 
     * note that
     * - `+""` will yield `0` rather than `NaN`
     * - `!!"0"` will yield `true`
     */
    !!cm && 
    (isNaN(+cm) === false )
  )
) ;

import * as React from 'react';
export { React, } ;












































export {} ; // TS(1208)
