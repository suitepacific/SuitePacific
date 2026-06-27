-- CreateTable
CREATE TABLE "VisitorSession" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "city" TEXT,
    "region" TEXT,
    "country" TEXT,
    "durationMs" INTEGER NOT NULL,
    "sectionsViewed" TEXT NOT NULL,
    "exitSection" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VisitorSession_createdAt_idx" ON "VisitorSession"("createdAt");

-- CreateIndex
CREATE INDEX "VisitorSession_path_idx" ON "VisitorSession"("path");
