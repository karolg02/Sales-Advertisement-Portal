/*
  Warnings:

  - Added the required column `category` to the `ysa` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ysa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ysa" ("amount", "createdAt", "description", "id", "image", "price", "title") SELECT "amount", "createdAt", "description", "id", "image", "price", "title" FROM "ysa";
DROP TABLE "ysa";
ALTER TABLE "new_ysa" RENAME TO "ysa";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
