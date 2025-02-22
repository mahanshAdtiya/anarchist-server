-- CreateTable
CREATE TABLE "sizes" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variants" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "sizeId" UUID NOT NULL,
    "colorId" UUID NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sizes_name_key" ON "sizes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sizes_value_key" ON "sizes"("value");

-- CreateIndex
CREATE UNIQUE INDEX "colors_name_key" ON "colors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "colors_value_key" ON "colors"("value");

-- CreateIndex
CREATE INDEX "images_productId_idx" ON "images"("productId");

-- CreateIndex
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");

-- CreateIndex
CREATE INDEX "product_variants_sizeId_idx" ON "product_variants"("sizeId");

-- CreateIndex
CREATE INDEX "product_variants_colorId_idx" ON "product_variants"("colorId");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_productId_sizeId_colorId_key" ON "product_variants"("productId", "sizeId", "colorId");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
