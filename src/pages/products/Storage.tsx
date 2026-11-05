import { ProductPage, type ProductInfo } from "@/components/product/ProductPage";

const INFO: ProductInfo = {
  icon: "storage",
  name: "Storage",
  description: "File storage with per-action access rules, share links that expire, image resizing, folders and S3-compatible backends.",
  promise: "Files with the same rules as your data.",
  line: "Buckets for uploads, images and documents, with access rules, share links and image resizing built in.",
  tiles: [
    {
      kind: "chips",
      icon: "storage",
      title: "Hand out files the right way",
      line: "Public, private behind rules, or shared with a link that expires.",
      chips: ["Public files", "Private files", "Share links", "Links that expire", "View or download"],
    },
    { kind: "solid", icon: "policies", title: "Rules for every action", line: "Decide who can upload, read and delete, bucket by bucket." },
    { kind: "word", icon: "image", word: "IMG", title: "Images resized on request", line: "Get the size you need without storing every version." },
    {
      kind: "chips",
      icon: "database",
      title: "Kept where you want",
      line: "On local disk or any S3-compatible service.",
      chips: ["Local disk", "S3-compatible storage", "Folders", "Profile pictures"],
    },
  ],
  capabilities: [
    { icon: "storage", title: "Buckets", line: "Group files by purpose, each with its own rules." },
    { icon: "document", title: "Folders", line: "Organise files the way your app thinks about them." },
    { icon: "webhooks", title: "Share links", line: "Send one file to anyone, for as long as you choose." },
    { icon: "image", title: "Image resizing", line: "Thumbnails and previews, made when they are asked for." },
    { icon: "users", title: "Profile pictures", line: "Avatars for your users, ready to use." },
    { icon: "database", title: "Files beside records", line: "Keep files linked to the records they belong to." },
  ],
};

export default function StoragePage() {
  return <ProductPage {...INFO} />;
}
