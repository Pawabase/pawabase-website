import { ProductArticle, type ArticleSection } from "@/components/product/Article";

const SECTIONS: ArticleSection[] = [
  {
    title: "Files, kept next to your data",
    blocks: [
      { p: "Storage keeps the files your app handles: avatars, documents, exports and attachments. Files live in **buckets**, which are folders with their own rules. Each file has a **key**, its path in the bucket, such as `7/avatar.png`." },
      { p: "You set buckets up in Studio, and your app uses them through `pawabase.storage`. Because every request is made as the signed-in person, the same access rules that protect your tables protect your files." },
    ],
  },
  {
    title: "Creating a bucket",
    blocks: [
      { p: "A bucket is created once per environment and then used from your app by name. The name uses lowercase letters, digits and dashes, is unique within the environment and cannot be changed later. `avatars` in development and in production are separate buckets with separate files." },
      { list: [
        "**Public bucket** means anyone with a file's address may read it, which suits avatars and product images. Leave it off for anything private. Uploads, listing and deletes always follow their own rules, whichever you choose.",
        "**Who may** read, upload new objects, list, replace and delete each use the same rule picker as the rest of Pawabase.",
        "**Accepted types** and **Largest file** limit what can be uploaded.",
      ] },
      { table: { head: ["Bucket", "Public", "Read", "Upload new", "Replace and delete"], rows: [
        ["`avatars`", "Yes", "Public", "Signed in, own folder", "Own folder"],
        ["`product-images`", "Yes", "Public", "Role `staff`", "Role `staff`"],
        ["`documents`", "No", "Own folder", "Own folder", "Own folder"],
        ["`team-files`", "No", "Same organization", "Same organization", "Same organization"],
        ["`exports`", "No", "Signed in", "Secret keys and Studio", "Secret keys and Studio"],
      ] } },
      { p: "Use a separate bucket when the rules or limits differ: public against private, images against documents, user files against server-written exports. Use folders, which are key prefixes, for everything else, such as per user, per organization or per year." },
    ],
  },
  {
    title: "Who can do what",
    blocks: [
      { p: "A bucket has a rule for each action, and the difference between uploading and replacing matters. Uploading to a key that does not exist uses the upload rule. Uploading to one that does exist uses the replace rule. That lets people add files without overwriting anyone else's." },
      { table: { head: ["Action", "Setting", "If unset"], rows: [
        ["Read a file", "Who may read", "Signed-in users, or everyone for a public bucket"],
        ["Upload a new key", "Who may upload new objects", "Signed-in users"],
        ["List the bucket", "Who may list objects", "Same as read"],
        ["Replace an existing key", "Who may replace objects", "Same as upload"],
        ["Delete a file", "Who may delete objects", "Same as upload"],
      ] } },
      { h3: "Design keys around rules" },
      { p: "Put the owner first in every key, `<user id>/…`. Then one custom rule protects the whole bucket: the first segment of the key equals the signed-in user's id. For organizations, compare the first segment with the organization and use keys like `<org slug>/…`." },
      { p: "A public bucket does not have to be browsable. Set **Who may list objects** to signed-in users and strangers can only see files whose address they already hold. The rule runs before the file is looked up, so a refusal never reveals whether a key exists." },
    ],
  },
  {
    title: "Uploading",
    blocks: [
      { p: "`upload(key, body)` stores a file at a key. If the key already exists the file is replaced, so repeating an upload is safe. The result describes what was stored: the bucket, key, size, content type and, when available, an ETag." },
      { p: "In a browser you can pass a `File`, a `Blob`, an `ArrayBuffer`, a string, a `ReadableStream` or `FormData`. In Python you can pass bytes, an open binary file or a path. If you do not pass a content type, the client uses the file's own, then guesses from the key's extension, then falls back to `application/octet-stream`." },
      { table: { head: ["Bucket setting", "If broken"], rows: [
        ["Who may upload new objects, or replace", "`AuthenticationError` or `PermissionError`"],
        ["Accepted types", "`ValidationError`, judged from the file's real contents"],
        ["Largest file", "`PayloadTooLargeError`"],
      ] } },
      { p: "Accepted types are checked against what the file actually contains, not only the header the client sent, so renaming a file does not get around the limit. Signed uploads can also give a browser a temporary link to upload straight to storage." },
    ],
  },
  {
    title: "Four ways to give someone a file",
    blocks: [
      { p: "Pick by who the reader is and for how long." },
      { table: { head: ["You need", "Use", "Lasts"], rows: [
        ["Show a file to everyone on your site", "Public URL", "Forever, with a public bucket"],
        ["A signed-in person reads a private file in your app", "`download()`", "The request"],
        ["Someone holds a link, no sign-in, for minutes", "Signed link", "Minutes"],
        ["Someone with no account, for days, revocable", "Share link", "Hours to a year"],
      ] } },
      { p: "A **public URL** carries your publishable key, which is designed to be public. A secret key is refused, so you cannot leak one into a page by accident. A private bucket answers \"not found\" to a public address." },
      { p: "A **signed link** lets anyone who holds it read one file for a short time, 300 seconds by default. You must be able to read the file yourself to sign it, and it is best to make a new link each time the page opens rather than storing one. Typical uses are a download button for a private file or a link in an email." },
    ],
  },
  {
    title: "Share links",
    blocks: [
      { p: "A share link lets someone with no account open one file until a time you choose. It works whatever the bucket's read rule says, for that file only. Use it to send a contract to a client or an export to a partner. You create one in Studio by opening the file and choosing the Sharing tab." },
      { list: [
        "**Expires after** can be 15 minutes, 1 hour, 24 hours, 7 days or a custom time from one minute to one year.",
        "**Allows** can be view and download, view only, or download only.",
        "Every link shows its status, when it expires and how often it was opened. A revoked link stops working at once.",
      ] },
      { table: { head: ["What you do", "Effect on its links"], rows: [
        ["Replace the file, uploading to the same key", "Links keep working and show the new file"],
        ["Rename or move it", "Links are revoked"],
        ["Delete it", "Links are revoked. A new file at the same key is never reachable through an old link."],
      ] } },
      { note: "Anyone holding the URL can open the file, so treat it like a password. Prefer short lifetimes, send it over a private channel and revoke links you no longer need." },
    ],
  },
  {
    title: "Resizing images",
    blocks: [
      { p: "Add options to an image's address and Pawabase serves that version. The stored original is never changed, so you do not generate thumbnails yourself. Turn on **Enable transformations** in the bucket's settings, then choose which output formats and fits to allow and the largest sizes." },
      { table: { head: ["Option", "Values", "Meaning"], rows: [
        ["`width`, `height`", "pixels", "Output size. Give one and the other follows the ratio."],
        ["`fit`", "`contain`, `cover`, `fill`", "`contain` fits inside, `cover` fills and crops, `fill` stretches."],
        ["`format`", "`webp`, `avif`, `jpeg`, `png`, `auto`", "`auto` picks AVIF or WebP when the browser allows it."],
        ["`quality`", "1 to 100", "Compression for lossy formats."],
        ["`rotate`", "-360 to 360", "Degrees clockwise."],
        ["`crop`", "`x,y,width,height`", "Crop the original first, in source pixels."],
      ] } },
      { p: "Only PNG, JPEG, WebP, GIF, AVIF and BMP images can be transformed. Photo orientation is applied, animated images use their first frame and SVG is never rasterised. Resizing works for public URLs, signed links and share links, and the read rule is checked on every request, so a variant is never shown to someone who could not read the original." },
    ],
  },
  {
    title: "Files and records",
    blocks: [
      { p: "Storage holds the bytes and your database holds the meaning. Store the file's key on a record, not its URL, and build the URL when you need it. A URL can change, because a signed link expires or a domain moves. A key does not." },
      { list: [
        "**Upload first, then save the key,** so a record never points at a file that does not exist.",
        "**To replace a file,** give the new file a new key, update the record, then delete the old key. A fresh key avoids stale caches.",
        "**For several files per record,** create an `attachments` table with the record id, key, name, size and content type, and give it the owner access rule.",
      ] },
    ],
  },
  {
    title: "Delivery and cleaning up",
    blocks: [
      { p: "The **browser cache** setting says how many seconds a browser may reuse a file before asking again. Zero revalidates every time, which is safest when files are replaced. Files have an ETag that changes when a file is replaced, so browsers always revalidate correctly. A longer cache is faster for files that never change, so put a version in the key, such as `avatar-2.png`." },
      { p: "Deleting a bucket removes its configuration, so delete the files first, then the empty folders, then the bucket. Take a backup if you may need them. Studio administrators can always manage objects, whatever the rules say, so test your rules by trying something that must fail while signed in as an ordinary person." },
    ],
  },
];

export default function StoragePage() {
  return (
    <ProductArticle
      icon="storage"
      name="Storage"
      category="Files"
      description="Buckets with access rules, image resizing and links that expire, on local disk or any S3-compatible service."
      intro="Storage keeps the files your app handles, with the same access rules as the rest of your backend. This page covers buckets, who can do what, uploads, the four ways to hand someone a file, image resizing and how to link files to records."
      sections={SECTIONS}
      next={{ label: "Next: Realtime", href: "/products/realtime" }}
    />
  );
}
