









export const {
  ok ,
} = {
  
  ok: (v, m?) => {
    if (v) {
      //
    } else {
      if (m instanceof Error) throw m ;
      throw new Error(m) ;
    }
  } ,

} satisfies Partial<typeof import("assert")> ;

export default ok;











export {} ; // TS(1208)
