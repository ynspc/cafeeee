-- CreateTable
CREATE TABLE "ActionLogs" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userInput" TEXT NOT NULL,
    "predictedAction" TEXT NOT NULL,
    "actualAction" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "ActionLogs_pkey" PRIMARY KEY ("id")
);
