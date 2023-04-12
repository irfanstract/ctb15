
# label onto

# # Branch PackageLockJsonUpdate1
# reset onto
# pick c9420df init (step 2 of 3)
# pick 1db17fa add dev dependency `@types/node`
# pick 8393a5c add dependency `immutable` and `lodash`
# pick 0d7d9ad add dependency `core-js` (3.30.0)
# pick aae470b update `package-lock.json`
# pick 8656900 `vite.config.ts` - add `import path from "path"`
# break 
# pick 2256e9d fix missing `baseUrl` option in `vite.config.ts` and `tsconfig.json`
# break 
# pick b4bcd63 `vite.config.ts` - add these entries into `resolve.alias` - ```       { find: 'dist', replacement: path.resolve(__dirname, 'dist'), },       { find: ('public'  ), replacement: path.resolve(__dirname, ('public'  ), ), },       { find: ('share'   ), replacement: path.resolve(__dirname, ('share'   ), ), },       { find: 'node_modules', replacement: path.resolve(__dirname, 'node_modules') },       { find: '.node_modules', replacement: path.resolve(__dirname, '.node_modules') }, ```
# break 
# pick ad0f84e update `tsconfig.json` - set `allowJs` (was `false`) to `true`, and set `checkJs` (was unset) to `true`
# break 
# pick 0feb66c update `tsconfig.json` - apply these changes, ```     "strict": true,     "noImplicitAny": true, // was UNSET; '"strict": true ' did not enforce this     // without this     // `tsc` would pretend indexed array items always exists which cannot be proven.     "noUncheckedIndexedAccess": true, // was UNSET     // more likely a bug, than not     "noFallthroughCasesInSwitch": true, // was UNSET ```
# break 
# label branch-point
# pick 39b0b1e update `package-lock.json`
# label PackageLockJsonUpdate1

# # Branch PackageLockJsonUpdate
# reset PackageLockJsonUpdate1 # update `package-lock.json`
# pick de5160e update `package-lock.json`
# pick e014066 update `package-lock.json`
# label PackageLockJsonUpdate

# reset branch-point # update `tsconfig.json` - apply these changes, ```     "strict": true,     "noImplicitAny": true, // was UNSET; '"strict": true ' did not enforce this     // without this     // `tsc` would pretend indexed array items always exists which cannot be proven.     "noUncheckedIndexedAccess": true, // was UNSET     // more likely a bug, than not     "noFallthroughCasesInSwitch": true, // was UNSET ```
# pick 8409371 add `src\utility-functions\all.ts` empty with `export {} ; // TS(1208)` at bottom
# merge -C de13d10 PackageLockJsonUpdate1 # Merge branch 'PackageLockJsonUpdate1'
# pick 2faf9c1 update `src\utility-functions\all.ts` - add this ``` import * as Immutable from "immutable"; export { Immutable, }; ```
# pick b92e11a update `src\utility-functions\all.ts` - add this ``` import * as _ from "lodash"; export { _, } ; ```
# pick 8906587 add these dependency(s) ```     "@ionic/react": "^6.0.0",     "@ionic/react-router": "^6.0.0", ```
# merge -C 3f75b6a PackageLockJsonUpdate # Merge branch 'PackageLockJsonUpdate'
# pick c0e091f update `src\utility-functions\all.ts` to add re-export of `react`
# pick 629db7c add these dependency(s) ```     "ionicons": "^6.0.3", ```
# pick c926c2f update `src\projects\Button.tsx` like this

# # Rebase c63d6d9..b4bcd63 onto c63d6d9 (29 commands)
# #
# # Commands:
# # p, pick <commit> = use commit
# # r, reword <commit> = use commit, but edit the commit message
# # e, edit <commit> = use commit, but stop for amending
# # s, squash <commit> = use commit, but meld into previous commit
# # f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
# #                    commit's log message, unless -C is used, in which case
# #                    keep only this commit's message; -c is same as -C but
# #                    opens the editor
# # x, exec <command> = run command (the rest of the line) using shell
# # b, break = stop here (continue rebase later with 'git rebase --continue')
# # d, drop <commit> = remove commit
# # l, label <label> = label current HEAD with a name
# # t, reset <label> = reset HEAD to a label
# # m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# # .       create a merge commit using the original merge commit's
# # .       message (or the oneline, if no original merge commit was
# # .       specified); use -c <commit> to reword the commit message
# #
# # These lines can be re-ordered; they are executed from top to bottom.
# #
# # If you remove a line here THAT COMMIT WILL BE LOST.
# #
# # However, if you remove everything, the rebase will be aborted.
# #
