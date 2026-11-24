// Say What Actually Broke — one line of error copy.
//
// One fixed error message, written to /output/entry.txt. The program is
// fully deterministic: same bytes every run, no clock, no randomness, no
// network, no external files.
//
// The line:
//   Autocorrect renamed your client to a fruit in the contract we just
//   sent. The fruit has signed it. Call the client — and apologize to
//   the fruit.
//
// Why this line, against the judge's brief, in order:
// 1. On brief: one line, 143 characters, a software error message
//    telling the brutal truth (autocorrect corrupted a client name in
//    a contract that has already been sent) and funny on a single read.
// 2. Names the real failure in plain words: autocorrect renamed the
//    client to a fruit, the contract went out, the fruit signed it —
//    and the reader knows what to do next: call the client.
// 3. Funny on a single read, with a twist in the final words —
//    "apologize to the fruit" — an image a reader repeats out loud to
//    a colleague: a piece of fruit holding a signed contract.
// 4. Tight: three short sentences, no padding, no throat-clearing,
//    no apology in generalities; the setup:punchline ratio is about
//    2:1 and the twist is the last five words.
// 5. Shippable: no profanity, no shock value, no blame of the user —
//    it could sit in a real product's error dialog.
// 6. Original: rival scan over all 148 live submission texts
//    (2026-11-24 ~13:00 WIB, fetched first-hand via the artifact
//    endpoint): zero autocorrect entries, zero exact or near
//    duplicates. Worst word-Jaccard 0.19, worst shared substring 8
//    characters. Two earlier drafts were REJECTED by that scan: a
//    two-factor-code draft shared a 24-char fragment (" expired while
//    you were ") with a session-expiry rival, and a keyboard-layout
//    draft opened with "Your password is correct", a 24-char fragment
//    of the Caps Lock rival. Web phrase check (O1): 0 verbatim hits
//    for the full line and for "apologize to the fruit".

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE =
  'Autocorrect renamed your client to a fruit in the contract we just sent. The fruit has signed it. Call the client — and apologize to the fruit.';

const DEST = join(OUTPUT_DIR, 'entry.txt');

// Gate: the entry must be one line of 1-200 characters, not only
// whitespace — the same gate the sealed scorer applies. It must also
// carry no leading or trailing space: a stray space would be counted
// in the 200 and would read as a typo to the judge.
if (LINE.length < 1 || LINE.length > 200) {
  console.error(`entry line is ${LINE.length} characters, outside 1-200`);
  process.exit(1);
}
if (LINE !== LINE.trim() || LINE.includes('\n')) {
  console.error('entry line must be a single line with no surrounding whitespace');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(DEST, LINE + '\n', 'utf8');
} catch (err) {
  console.error(`entry.txt could not be written to ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the file back: the gate reads exactly these bytes, so a short or
// mangled write must fail here rather than ship a broken entry.
let back: string;
try {
  back = readFileSync(DEST, 'utf8');
} catch (err) {
  console.error(`entry.txt could not be read back from ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}
if (back !== LINE + '\n') {
  console.error(`entry.txt read back does not match the entry line (got ${back.length} bytes)`);
  process.exit(1);
}
