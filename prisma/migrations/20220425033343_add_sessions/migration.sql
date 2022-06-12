-- CreateTable
CREATE TABLE "sessions" (
    "line_id" TEXT NOT NULL,
    "session" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_line_id_key" ON "sessions"("line_id");
