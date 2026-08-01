-- CreateTable
CREATE TABLE "Mood" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mood_value_key" ON "Mood"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Mood_token_key" ON "Mood"("token");
