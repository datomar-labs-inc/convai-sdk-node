import {ConvaiAPIClient} from "./src";

const client = new ConvaiAPIClient("doaNl0zJCAt0Rt9ZVjZELqndOGlLg5GV");
client.setBaseURL("http://localhost:4600/api/v1");

// client.broadcast({
//     broadcastType: "BROADO",
//     channel: Channel.DEV,
//     userQuery: UserQueryBuilder
//         .any()
//         .where("sldkfjsldkfj")
//         .notExists()
//         .build(),
// });

// client.updateUserData("b99da4a2-2669-47b0-9066-cedbe2424bad", {
//     set: {
//         "test": "TESTDATA"
//     },
//     delete: []
// });

// client.queryUsers(UserQueryBuilder.any().where("sldkfjskldf").notExists().build()).then(console.log);

// client.deleteChannelUser("dev-console-2ff16c03-f1c4-43ce-838e-96cafaa4f7b2").then(console.log);

// client.deleteSuperUser("b99da4a2-2669-47b0-9066-cedbe2424bad").then(console.log);

// client.trigger({
//     channelId: "newb",
//     contextModifier: undefined,
//     isStart: false,
//     isTrigger: false,
//     source: undefined,
//     text: "Text me baby"
// }).then(console.log);

// client.mergeUsers({
// //     superUserIds: ['90ecf137-5b91-4724-bd3f-d9202f157813', '8bd4d59a-65c5-4113-a487-4d2b3fceeab4']
// // }).then(console.log);

// client.updateSession("dev-console-2ff16c03-f1c4-43ce-838e-96cafaa4f7b2", {
//     set: {
//         "data": "DATATATAT",
//     },
//     delete: []
// }).then(console.log);

// client.deleteSession("newb").then(console.log);