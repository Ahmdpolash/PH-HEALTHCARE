import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: "event",
//       level: "query",
//     },
//     {
//       emit: "stdout",
//       level: "error",
//     },
//     {
//       emit: "stdout",
//       level: "info",
//     },
//     {
//       emit: "stdout",
//       level: "warn",
//     },
//   ],
// });

// prisma.$on("query", (e) => {
//   console.log("-------------------------------------------");
//   console.log("Query: " + e.query);
//   console.log("-------------------------------------------");
//   console.log("Params: " + e.params);
//   console.log("-------------------------------------------");
//   console.log("Duration: " + e.duration + "ms");
//   console.log("-------------------------------------------");
// });

// i want to save the log data on a another file top of this file called log.txt

// prisma.$on("query", (e) => {
//   fs.appendFile(
//     "prisma.log",
//     `Query: ${e.query} \n Params: ${e.params} \n Duration: ${e.duration}ms \n\n`,
//     (err) => {
//       if (err) {
//         console.error(err);
//       }
//     }
//   );
// });

export default prisma;
