// import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
// import { AppContext } from "apps/website/mod.ts";
// import { invoke } from "$store/runtime.ts";
// import { useOffer } from "deco-sites/palaciovtex/sdk/useOffer.ts";
// import { formatPrice } from "deco-sites/palaciovtex/sdk/format.ts";
// import AddToCartBuyTogether from "deco-sites/palaciovtex/islands/AddToCartBuyTogether.tsx";

// export type SkuListType = {
//   id: string;
//   name: string | undefined;
//   image: string | null;
//   price: number | null;
//   seller: string | undefined;
// };

// interface BuyTogetherProps {
//   page: ProductDetailsPage | null;
//   skuList?: SkuListType[];
// }

// export type Props = BuyTogetherProps;

// // deno-lint-ignore require-await
// export async function loader(props: Props, req: Request, ctx: AppContext) {
//   if (props.page === null) {
//     throw new Error("Missing Product Details Page Info");
//   }

//   const { product } = props.page;
//   const { offers } = product;

//   const { teasers } = useOffer(offers);

//   const getSkuIds = (name: string) => {
//     return teasers?.find((teaser) =>
//       teaser.conditions?.parameters?.some((param) => param.name === name)
//     )?.conditions?.parameters?.find((param) => param.name === name)
//       ?.value;
//   };

//   const skuIdsList1 = getSkuIds("SkuIdsList1");
//   const skuIdsList2 = getSkuIds("SkuIdsList2");

//   const skuIdsList2Array = skuIdsList2 ? skuIdsList2.split(",") : [];

//   const updatedProductIds: string[] = [skuIdsList1, ...skuIdsList2Array].filter(
//     Boolean,
//   ) as string[];

//   console.log("Updated Product IDs:", updatedProductIds);

//   if (!updatedProductIds.length) return null;

//   // const response = await invoke.vtex.loaders.legacy.productList({
//   //   ids: updatedProductIds,
//   // })

//   const validProductIds = new Set(updatedProductIds);

//   const productMap: Record<string, SkuListType> = {};

//   // response.forEach((product: Product) => {
//   //   const productId = product.productID;

//   //   if (validProductIds.has(productId)) {
//   //     productMap[productId] = {
//   //       id: product.productID,
//   //       name: product.name,
//   //       price: product?.offers?.offers?.[0]?.price ?? null,
//   //       image: product.image?.[0]?.url ?? null,
//   //       seller: product?.offers?.offers?.[0]?.seller,
//   //     };

//   //     if (product.isVariantOf?.hasVariant) {
//   //       product.isVariantOf.hasVariant.forEach((variant) => {
//   //         const variantId = variant.productID;

//   //         if (validProductIds.has(variantId)) {
//   //           productMap[variantId] = {
//   //             id: product.productID,
//   //             name: variant.name,
//   //             price: variant?.offers?.offers?.[0]?.price ?? null,
//   //             image: variant.image?.[0]?.url ?? null,
//   //             seller: variant?.offers?.offers?.[0]?.seller,
//   //           };
//   //         }
//   //       });
//   //     }
//   //   }
//   // });

//   // const skuList = Object.values(productMap);

//   // return {
//   //   // page: response,
//   //   // skuList,
//   // };
// }

// function BuyTogether({ skuList }: Props) {
//   if (skuList === null) {
//     throw new Error("Missing Product Details Page Info");
//   }

//   return (
//     <div
//       class="container mx-4 lg:mx-auto w-auto my-16"
//       id="buy-together"
//     >
//       <h2 class="text-xl lg:text-[28px] text-black font-bold mb-8">
//         Compre junto
//       </h2>
//       <div class="flex flex-row">
//         {skuList?.map((sku: SkuListType) => (
//           <div
//             class="h-[152px] w-96 bg-white py-7 px-6 mr-9 rounded-lg border-2 border-[#E4E4E4]"
//             key={sku.id}
//           >
//             <div class="flex flex-row">
//               <img
//                 src={sku.image ?? ""}
//                 alt={sku.name}
//                 class="w-24 h-24 mr-6"
//               />
//               <div class="flex flex-col justify-center">
//                 <p class="text-sm font-bold text-[#56565A] max-w-[300px] mb-4">
//                   {sku.name}
//                 </p>
//                 <p class="text-base font-bold text-[#101820]">
//                   {formatPrice(sku.price ?? 0)}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//         <AddToCartBuyTogether skuList={skuList} />
//       </div>
//     </div>
//   );
// }

// export default BuyTogether;

import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { formatPrice } from "$store/sdk/format.ts";
import AddToCartBuyTogether from "deco-sites/palaciovtex/islands/AddToCartBuyTogether.tsx";
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

  const skuList = Object.values(productMap);

  skuList.unshift({
    id: principal ? principal?.productID : "",
    name: principal?.isVariantOf?.name,
    price: principal?.offers?.offers?.[0].price ?? null,
    image: principal ? principal.image?.[0]?.url : undefined,
    seller: principal?.offers?.offers?.[0]?.seller,
  });

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
          {skuList?.map((sku: SkuListType, index) => (
            <>
              <div
                class="min-h-[152px] md:h-full w-full md:w-96 bg-white py-7 px-6 rounded-lg border-2 border-[#E4E4E4]"
                key={sku.id}
              >
                <div class="flex flex-col">
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
              <span class="text-4xl mx-5">
                {index == 2 ? "=" : "+"}
              </span>
            </>
          ))}
          <AddToCartBuyTogether skuList={skuList} />
        </div>
      </div>
    </div>
  );
}

export default BuyTogether;
