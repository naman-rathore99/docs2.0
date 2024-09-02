import { Liveblocks } from "@liveblocks/node";

export const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
  // secret:"sk_dev_Umy9MA36ZV8ueKj4zcmxW0VdUgAn6bCb3uJXHIyBUjmMB6w33KgYsK11M3TtPgpn"
});