
import * as util from "src/utility-functions/all" ;




import {
  CommiteeDesc ,
  TaskDesc ,
} from "src/projects/ToDoListing" ;

import Button from "./Button";

import TdlCss from "./TDL.module.css" ;

const ToDoList = () => {
  const tasks: TaskDesc[] = [
    {
      title: `simple task 1A` ,
      done: true ,
    } ,
    { 
      assignees: [ 
        { title: "Ve Rn" , } ,
      ] ,
    } ,
    {
      title: `Task 3` ,
    } ,
    {
      title: `simple task 1C` ,
      assignees: [
        { title: "Ve Rb" , } ,
        { title: "Ve Rn" , } ,
        { } ,
      ] ,
    } ,
    { 
      title: `simple task 1D` ,
      assignees: [ 
        { title: "Ve Rn" , } ,
      ] ,
    } ,
    {
      title: `Task 6` ,
    } ,
  ] satisfies TaskDesc[] ;
  return (
    <div className={`${TdlCss.ToDoList } ` }> 
      <p>
        To-Do List
      </p>
      <ol>
      {(
        tasks
        .map(entry => ({ ...entry, key: JSON.stringify(entry), }) ) 
        .map((entry): util.React.ReactElement => {
          const {
            key: tKey ,
            title: desc0 = "",
            assignees = [] ,
            done = false ,
          } = entry ;
          return (
            <li key={tKey} >
              <p>
                title: {}
                <span>
                { titleUtfAsQuotedOrSayNoDesc(desc0) }
                </span>
              </p>
              <p>
                assignees:
              </p>
              <ul>
              { (
                assignees
                .map(entry => ({ ...entry, key: JSON.stringify(entry), }) ) 
                .map((entry) => {
                  const aKey = entry.key ;
                  return (
                    <li key={aKey } >
                      { titleUtfAsQuotedOrSayNoDesc(entry.title ?? "") }
                    </li>
                  ) ;
                })
              ) }
              </ul>
              <PercentualCompletionalStatComp 
              value={(done === true) ? 1 : 0.5 }
              onMarkAsCompleted={(
                (1 < assignees.length) ? false : (() => {})
              )} // TODO
              />
            </li>
          ) ;
        } )
      )}
      </ol>
    </div>
  ) ;
} ;

const PercentualCompletionalStatComp: (
  util.React.FC<(
    & { value: 0 | 0.5 | 1 ; }
    & Partial<{ onMarkAsCompleted: false | util.React.DispatchWithoutAction ; }>
  )>
) = ({
  value ,
  onMarkAsCompleted: markAsCompleted = false ,
}) => {
  return (
    <div>
      <p>
        Status: {( { 0: "0", 0.5: "in progress", 1: "completed" }[value] )}
      </p>
      <p>
        {(
          (value < 1) && (
            markAsCompleted && (
              <Button
              onClick={() => markAsCompleted()}
              >
                Mark As Completed
              </Button>
            )
          )
        )}
      </p>
    </div>
  ) ;
} ;

const titleUtfAsQuotedOrSayNoDesc: {
  (v: string): util.React.ReactElement ;
} = (
  (desc0) => (
    desc0 ?
    <q>{ desc0 }</q>
    : <span>(<em>no title</em>)</span>
  )
) ;




export default ToDoList ;

// assert they will all compile
{
  (
    <Button type="button">
        Do Some Action
    </Button>
  ) ;
  <ToDoList /> ;
}












































export {} ; // TS(1208)
