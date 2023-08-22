// import type {
//   AccountCampaign,
//   AccountEmail,
//   AccountEmailTemplate,
//   AccountEngine,
//   AccountEvent,
//   AccountProfile,
//   AccountProfileList,
//   AccountSegment,
//   AccountSender,
//   AccountSettings,
//   Account,
//   AccountEndpoint,
//   AccountImport,
// } from "ws-types/account.mjs";
// import type {
//   AdminDatabase,
//   AdminEmailTemplate,
//   AdminEndpoint,
//   AdminQueue,
//   AdminSegment,
//   AdminSendgrid,
//   AdminSettings,
// } from "ws-types/admin.mjs";
// import type { AppUser } from "ws-types/misc.mjs";
// import { Collection, MongoClient, Document, Db } from "mongodb";
// import config from "../config.mjs";
// import { cached } from "./shared/cached/index.js";

// export type AccountAppDbInitial = {
//   emails: Collection<AccountEmail> | null;
//   emailTemplates: Collection<AccountEmailTemplate> | null;
//   profiles: Collection<AccountProfile> | null;
//   segments: Collection<AccountSegment> | null;
//   campaigns: Collection<AccountCampaign> | null;
//   engines: Collection<AccountEngine> | null;
//   profileLists: Collection<AccountProfileList> | null;
//   senders: Collection<AccountSender> | null;
//   events: Collection<AccountEvent> | null;
// };

// export type NonNullMap<Type> = {
//   [K in keyof Type]: NonNullable<Type[K]>;
// };
// export type AccountAppDb = NonNullMap<AccountAppDbInitial>;

// export type EngineAppDb = {
//   accounts: Collection<Account>;
//   accountSettings: Collection<AccountSettings>;
//   users: Collection<AppUser>;
//   platformEmailTemplates: Collection<AdminEmailTemplate>;
//   platformSegments: Collection<AdminSegment>;
//   platformPageTemplates: Collection<Document>;
//   platformEndpoints: Collection<AdminEndpoint>;
//   settings: Collection<AdminSettings>;
//   timings: Collection<Document>;
//   sendgrids: Collection<AdminSendgrid>;
//   databases: Collection<AdminDatabase>;
//   queue: Collection<AdminQueue>;
//   endpoints: Collection<AccountEndpoint>;
//   imports: Collection<AccountImport>;
// };
// export type AppDb = {
//   engine: EngineAppDb;
//   engineDbInstance: Db;
//   //   accountDb: Db;
//   currentAccountId: string;
//   client: MongoClient;
// };

// let db: AppDb;
// const appDb: AccountAppDbInitial = {
//   campaigns: null,
//   emails: null,
//   emailTemplates: null,
//   engines: null,
//   events: null,
//   profileLists: null,
//   profiles: null,
//   segments: null,
//   senders: null,
// };

// export async function getDb() {
//   if (db) return db;

//   const url = config().mongo_url;
//   const client = new MongoClient(url);
//   await client.connect();
//   const engineDbInstance = client.db("engine");
//   db = {
//     engineDbInstance,
//     currentAccountId: "",
//     // accountDb: null,
//     engine: {
//       accounts: engineDbInstance.collection("accounts"),
//       accountSettings: engineDbInstance.collection("accountSettings"),
//       users: engineDbInstance.collection("users"),
//       platformEmailTemplates: engineDbInstance.collection(
//         "platformEmailTemplates"
//       ),
//       platformSegments: engineDbInstance.collection("platformSegments"),
//       settings: engineDbInstance.collection("settings"),
//       timings: engineDbInstance.collection("timings"),
//       platformEndpoints: engineDbInstance.collection("platformEndpoints"),
//       platformPageTemplates: engineDbInstance.collection(
//         "platformPageTemplates"
//       ),
//       sendgrids: engineDbInstance.collection("sendgrids"),
//       databases: engineDbInstance.collection("databases"),
//       queue: engineDbInstance.collection("queue"),
//       endpoints: engineDbInstance.collection("endpoints"),
//       imports: engineDbInstance.collection("imports"),
//     },
//     client,
//   };
//   return db;
// }

// export const getAccountDb = async (accountId: string) => {
//   await getDb();
//   const accDb = await cached<AccountAppDb>(`${accountId}_accountDb`, () =>
//     setupAccountDb(accountId)
//   );
//   return accDb;
// };

// export const checkAccountDbExists = async (accountId: string) => {
//   const db = await getDb();
//   const exists = await cached(
//     `${accountId}_database`,
//     async () => {
//       const { databases } = await db.engineDbInstance.admin().listDatabases();
//       return !!databases.find((value) => value.name === `account_${accountId}`);
//     },
//     { timeoutSeconds: 86400 }
//   );

//   return exists;
// };

// export const setupAccountDb = (accountId: string, create?: boolean) => {
//   const returnDb = {} as AccountAppDb;
//   const accountDb = db.client.db(`account_${accountId}`);
//   const dbKeys = Object.keys(appDb) as Array<keyof AccountAppDb>;
//   dbKeys.map((collection) => {
//     if (create) {
//       const res =
//         accountDb.createCollection<AccountAppDb[typeof collection]>(collection);
//       //@ts-ignore
//       returnDb[collection] = res;
//     } else {
//       const res =
//         accountDb.collection<AccountAppDb[typeof collection]>(collection);
//       //@ts-ignore
//       returnDb[collection] = res;
//     }
//   });
//   return returnDb;
// };
