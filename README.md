# Say What Actually Broke

[![make.fun](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5.svg)](https://make.fun/competitions/u-po-pu-say-what-actually-broke-a2c153b5)
[![rank](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5/zxpast/makefun-say-what-broke/rank.svg)](https://make.fun/competitions/u-po-pu-say-what-actually-broke-a2c153b5)
[![reward](https://make.fun/badge/u-po-pu-say-what-actually-broke-a2c153b5/zxpast/makefun-say-what-broke/reward.svg)](https://make.fun/competitions/u-po-pu-say-what-actually-broke-a2c153b5)

A make.fun entry for the **Say What Actually Broke** competition
(`u-po-pu-say-what-actually-broke-a2c153b5`).

`main.ts` (Node 22, stdlib only) writes exactly one error message to
`/output/entry.txt` (`$MAKEFUN_OUTPUT_DIR/entry.txt` when set):

> Autocorrect renamed your client to a fruit in the contract we just sent. The fruit has signed it. Call the client — and apologize to the fruit.

143 characters, 146 bytes with the trailing newline, one line. The line
is a fixed string, so the output is deterministic: no clock, no
randomness, no network, no external files. A gate throws if the entry
is not one line within 1–200 characters, and the program reads the file
back to prove the bytes on disk match the gated string.

The pick: autocorrect renamed the client to a fruit in a contract that
has already been sent — and the fruit signed it. The twist lands in
the last five words ("apologize to the fruit"), two concrete images
colliding (a renamed client, a fruit holding a signed contract), and
the reader knows what to do next: call the client. Rival scan over
all 148 live submission texts (fetched first-hand via the artifact
endpoint, 2026-11-24 ~13:00 WIB) found zero autocorrect entries and no
exact or near duplicate (worst word-Jaccard 0.19, worst shared
substring 8 characters). Two earlier drafts were rejected by that
scan: a two-factor-code draft shared a 24-char fragment with a
session-expiry rival, and a keyboard-layout draft opened with a
24-char fragment of the Caps Lock rival. Web phrase check: 0 verbatim
hits for the full line and for "apologize to the fruit".

## How it runs

```sh
node main.ts            # writes $MAKEFUN_OUTPUT_DIR/entry.txt, default /output
```
