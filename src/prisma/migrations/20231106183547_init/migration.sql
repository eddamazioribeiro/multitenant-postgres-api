-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "client_a";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "client_b";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "tenant";

-- CreateTable
CREATE TABLE "tenant"."Tenant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_a"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_b"."Analysis" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_name_key" ON "tenant"."Tenant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "client_a"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_type_key" ON "client_b"."Analysis"("type");
