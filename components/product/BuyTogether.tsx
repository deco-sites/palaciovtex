import { useState } from 'preact/hooks';
import { SendEventOnView as _SendEventOnView } from "$store/components/Analytics.tsx";
import _ProductCard, {
  Layout as _cardLayout,
} from "$store/components/product/ProductCard.tsx";
import _Icon from "$store/components/ui/Icon.tsx";
import _Header from "$store/components/ui/SectionHeader.tsx";
import { useId as _useId } from "$store/sdk/useId.ts";
import { useOffer as _useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
// import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { formatPrice } from "$store/sdk/format.ts";
import AddToCartBuyTogether from "site/islands/AddToCartBuyTogether.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  products?: Product[] | null;
  principal?: Product | null;
}

export type SkuListType = {
  id: string;
  name: string | undefined;
  image: string | undefined;
  price: number | null;
  seller: string | undefined;
};

function BuyTogether({
  products,
  principal,
}: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  const productMap: Record<string, SkuListType> = {};

  products.forEach((product: Product) => {
    const productId = product.productID;

    if (productId) {
      productMap[productId] = {
        id: product.productID,
        name: product.isVariantOf?.name,
        price: product?.offers?.offers?.[0]?.price ?? null,
        image: product.image?.[0]?.url,
        seller: product?.offers?.offers?.[0]?.seller,
      };
    }
    if (product.isVariantOf?.hasVariant) {
      product.isVariantOf.hasVariant.forEach((variant) => {
        const variantId = variant.productID;

        if (variantId) {
          productMap[variantId] = {
            id: product.productID,
            name: product.isVariantOf?.name,
            price: variant?.offers?.offers?.[0]?.price ?? null,
            image: variant.image?.[0]?.url,
            seller: variant?.offers?.offers?.[0]?.seller,
          };
        }
      });
    }
  });

  const initialSkuList = Object.values(productMap);

  initialSkuList.unshift({
    id: principal ? principal?.productID : "",
    name: principal?.isVariantOf?.name,
    price: principal?.offers?.offers?.[0].price ?? null,
    image: principal ? principal.image?.[0]?.url : undefined,
    seller: principal?.offers?.offers?.[0]?.seller,
  });

  const [selectedSkuList, setSelectedSkuList] = useState<SkuListType[]>(initialSkuList);

  function toggleProduct(productId: string) {
    setSelectedSkuList((prevSelected) =>
      prevSelected.some((sku) => sku.id === productId)
        ? prevSelected.filter((sku) => sku.id !== productId)
        : [...prevSelected, initialSkuList.find((sku) => sku.id === productId)!]
    );
  }

  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <div
        class="container mx-4 lg:mx-auto w-auto my-16"
        id="buy-together"
      >
        <h2 class="text-xl lg:text-[28px] text-black font-bold mb-8">
          Compre junto
        </h2>
        <div class="flex flex-col md:flex-row items-center">
          {initialSkuList.map((sku: SkuListType, index) => (
            <div
              class="min-h-[152px] md:h-full w-full md:w-96 bg-white py-7 px-6 rounded-lg border-2 border-[#E4E4E4] flex flex-col items-start"
              key={sku.id}
            >
              <input
                type="checkbox"
                checked={selectedSkuList.some((selectedSku) => selectedSku.id === sku.id)}
                onChange={() => toggleProduct(sku.id)}
                class="mb-4"
              />
              <div class="flex flex-col items-center">
                <Image
                  src={sku.image ?? ""}
                  alt={sku.name}
                  width={300}
                  height={300}
                  class="w-24 h-24 mr-6"
                  loading={"lazy"}
                />
                <div class="flex flex-col justify-center">
                  <p class="text-sm font-bold text-[#56565A] max-w-[300px] mb-4">
                    {sku.name}
                  </p>
                  <p class="text-base font-bold text-[#101820]">
                    {formatPrice(sku.price ?? 0)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <AddToCartBuyTogether skuList={selectedSkuList} />
        </div>
      </div>
    </div>
  );
}

export default BuyTogether;