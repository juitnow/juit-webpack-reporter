# Simple Reporter for WebPack

Dissatisfied with other reporters, we wrote our own, reporting nicely any and
all errors from WebPack to the console, without clearing the screen and also
playing nicely with GitHub's Actions

On errors, it'll emit something like this (but with colors!):

```
╔═════════════════════════════════════════════════════════════════════════════╗
║ Found 2 errors                                                              ║
╟─────────────────────────────────────────────────────────────────────────────╢
║                                                                             ║
║ src/components/test.vue                                                     ║
║   32:1  error  More than 2 blank lines not allowed  no-multiple-empty-lines ║
║                                                                             ║
║ ✖ 1 problem (1 error, 0 warnings)                                           ║
║   1 error and 0 warnings potentially fixable with the `--fix` option.       ║
║                                                                             ║
╟─────────────────────────────────────────────────────────────────────────────╢
║ [TS2349] ERROR                                                              ║
║     This expression is not callable.                                        ║
║       Type 'Console' has no call signatures.                                ║
║  |                                                                          ║
║  |         console('This will fail')                                        ║
║  |         ^^^^^^^                                                          ║
║ at src/components/test.vue (line=40,col=8 → line=40,col=15)                 ║
╟─────────────────────────────────────────────────────────────────────────────╢
║ Compilation failed!                                                         ║
╚═════════════════════════════════════════════════════════════════════════════╝
```

### License

Licensed under the [Apache License, Version 2.0](LICENSE.md).
