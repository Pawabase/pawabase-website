# Storage and files

Buckets hold objects addressed by bucket and key. Each bucket sets visibility, allowed types and maximum size, and has a
separate rule per action (read, list, upload, update, delete). Public read never implies public upload, list or delete.

For per-person or per-organization files, start the key with the owner (`<user_id>/avatar.png`, `<org_id>/invoices/…`) and
write the rule against `$object.segments`. Keep display names, ownership and metadata in a table that stores the **key**, not a
URL, so domain or environment changes never break references.

```ts
const docs = pawabase.storage.from("documents");
await docs.upload(`${userId}/report.pdf`, file);                     // replaces an object at the same key
const { files, prefixes, cursor } = await docs.list({ prefix: `${userId}/` });
const blob = await docs.download(`${userId}/report.pdf`);
await docs.remove(`${userId}/old.pdf`);
```

## Addresses

| You need | Use | Notes |
| --- | --- | --- |
| A stable address, public bucket or the bucket's read rule | `fileUrl(key, { width, height, fit, format, quality, rotate })` | `…/storage/v1/files/<env>/<bucket>/<key>`, no key in it; needs `environment` in the client options. Transforms make resized images on the fly (`format: "auto"` picks AVIF or WebP) |
| A short-lived download | `createSignedUrl(key, { expiresIn })` | The URL itself is the credential |
| A browser upload without a session | `createSignedUploadUrl` on a server, then `uploadToSignedUrl` in the browser | Do not attach a project key to that upload |
| A link for people without an account | `createShareLink(key, { expiresIn, permissions, label })` | Secret key, so on a server. Revocable (`revokeShareLink`), counts opens; `view`, `download` or `both`; 60 s to a year |
| A public bucket's object in a browser | `getPublicUrl(key)` | Refuses a secret key |

Python has the same set in snake_case (`file_url` is `transform_url`, plus `public_url`, `create_share_link`).

## Lifecycles

- Files and records live separately: deleting a row does not delete its file. Clean up deliberately, from a flow on
  `<table>.deleted` or a sweep.
- Writing to an existing key overwrites it, and cached images can stay stale; use versioned keys when it matters.
- Environment backups do not contain file bytes. A restore can bring back rows pointing at files that are not there: back up the
  object store separately.
- Each user's avatar is handled for you: `auth.setAvatar(file)` / `removeAvatar()` store it in an automatic public bucket.

Docs: `storage/buckets.mdx`, `storage/upload.mdx`, `storage/urls-and-links.mdx`, `storage/access.mdx`,
`storage/files-and-records.mdx`.
