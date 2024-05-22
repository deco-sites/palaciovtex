// // import { SendEventOnView } from "$store/components/Analytics.tsx";
// import {
//   Layout as cardLayout,
// } from "$store/components/product/ProductCard.tsx";
// // import Icon from "$store/components/ui/Icon.tsx";
// // import Header from "$store/components/ui/SectionHeader.tsx";
// // import Slider from "$store/components/ui/Slider.tsx";
// // import SliderJS from "$store/islands/SliderJS.tsx";
// // import { useId } from "$store/sdk/useId.ts";
// // import { useOffer } from "$store/sdk/useOffer.ts";
// // import { usePlatform } from "$store/sdk/usePlatform.tsx";
// import type { Product } from "apps/commerce/types.ts";
// // import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
// import { formatPrice } from "$store/sdk/format.ts";
// import AddToCartBuyTogether from "site/islands/AddToCartBuyTogether.tsx";

// export interface Props {
//   products: Product[] | null;
//   title?: string;
//   description?: string;
//   layout?: {
//     numberOfSliders?: {
//       mobile?: 1 | 2 | 3 | 4 | 5;
//       desktop?: 1 | 2 | 3 | 4 | 5;
//     };
//     headerAlignment?: "center" | "left";
//     headerfontSize?: "Normal" | "Large" | "Small";
//     showArrows?: boolean;
//   };
//   cardLayout?: cardLayout;
// }

// export type SkuListType = {
//   id: string;
//   name: string | undefined;
//   image: string | null;
//   price: number | null;
//   seller: string | undefined;
// };

// function BuyTogetherA({
//   products,
//   // title,
//   // description,
//   // layout,
//   // cardLayout,
// }: Props) {
//   // const id = useId();
//   // const platform = usePlatform();

//   if (!products || products.length === 0) {
//     return null;
//   }
//   // const slideDesktop = {
//   //   1: "md:w-full",
//   //   2: "md:w-1/2",
//   //   3: "md:w-1/3",
//   //   4: "md:w-1/4",
//   //   5: "md:w-1/5",
//   // };

//   // const slideMobile = {
//   //   1: "w-full",
//   //   2: "w-1/2",
//   //   3: "w-1/3",
//   //   4: "w-1/4",
//   //   5: "w-1/5",
//   // };

//   const productMap: Record<string, SkuListType> = {};

//   products.forEach((product: Product) => {
//     const productId = product.productID;

//     if (productId) {
//       productMap[productId] = {
//         id: product.productID,
//         name: product.name,
//         price: product?.offers?.offers?.[0]?.price ?? null,
//         image: product.image?.[0]?.url ?? null,
//         seller: product?.offers?.offers?.[0]?.seller,
//       };
//     }
//     if (product.isVariantOf?.hasVariant) {
//       product.isVariantOf.hasVariant.forEach((variant) => {
//         const variantId = variant.productID;

//         if (variantId) {
//           productMap[variantId] = {
//             id: product.productID,
//             name: variant.name,
//             price: variant?.offers?.offers?.[0]?.price ?? null,
//             image: variant.image?.[0]?.url ?? null,
//             seller: variant?.offers?.offers?.[0]?.seller,
//           };
//         }
//       });
//     }
//   });

//   const skuList = Object.values(productMap);

//   skuList.push({
//     id: "102",
//     name: "Rosa 12v",
//     price: 819,
//     image:
//       "https://palaciodasferramentas.vteximg.com.br/arquivos/ids/162925/13875---ParafusadeiraFuradeira-de-I",
//     seller: "1",
//   });

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

// export default BuyTogetherA;
