import type { Platform } from "$store/apps/site.ts";
// import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
// import WishlistButtonWake from "../../islands/WishlistButton/vtex.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
// import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "$store/sdk/url.ts";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
    favoriteIcon?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
}

const calculate = (item: number, item2: number) => {
  if ((item - item2) > 0) {
    const percentValue = Math.round((item - item2) / item * 100);
    if (percentValue > 0) {
      return `${percentValue}%`;
    }
  }
};

// const WIDTH = 300;
// const HEIGHT = 300;

function ProductCard({
  product,
  // preload,
  // itemListName,
  layout,
  // deno-lint-ignore no-unused-vars
  platform,
  // deno-lint-ignore no-unused-vars
  index,
}: Props) {
  // deno-lint-ignore no-unused-vars
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  // const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  // const productGroupID = isVariantOf?.productGroupID;
  // const description = product.description || isVariantOf?.description;
  // const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const relativeUrl = relative(url);
  // deno-lint-ignore no-unused-vars
  const skuSelector = variants.map(([value, link]) => {
    const relativeLink = relative(link);
    return (
      <li>
        <a href={relativeLink}>
          <Avatar
            variant={relativeLink === relativeUrl
              ? "active"
              : relativeLink
              ? "default"
              : "disabled"}
            content={value}
          />
        </a>
      </li>
    );
  });
  // deno-lint-ignore no-unused-vars
  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );

  return (
    //   <div
    //     id={id}
    //     class={`card card-compact group w-full ${
    //       align === "center" ? "text-center" : "text-start"
    //     } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
    //       ${
    //       l?.onMouseOver?.card === "Move up" &&
    //       "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
    //     }
    //     `}
    //     data-deco="view-product"
    //   >
    //     <SendEventOnClick
    //       id={id}
    //       event={{
    //         name: "select_item" as const,
    //         params: {
    //           item_list_name: itemListName,
    //           items: [
    //             mapProductToAnalyticsItem({
    //               product,
    //               price,
    //               listPrice,
    //               index,
    //             }),
    //           ],
    //         },
    //       }}
    //     />
    //     <figure
    //       class="relative overflow-hidden"
    //       style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
    //     >
    //       {/* Wishlist button */}

    //       <div
    //         class={`absolute top-2 z-10 flex items-center
    //           ${
    //           l?.elementsPositions?.favoriteIcon === "Top left"
    //             ? "left-2"
    //             : "right-2"
    //         }

    //         `}
    //       >
    //         <div
    //           class={`${l?.hide?.favoriteIcon ? "hidden" : "block"} ${
    //             l?.onMouseOver?.showFavoriteIcon ? "lg:group-hover:block" : ""
    //           }`}
    //         >
    //           {platform === "vtex" && (
    //             <WishlistButtonVtex
    //               productGroupID={productGroupID}
    //               productID={productID}
    //             />
    //           )}
    //           {platform === "wake" && (
    //             <WishlistButtonWake
    //               productGroupID={productGroupID}
    //               productID={productID}
    //             />
    //           )}
    //         </div>
    //         {/* Discount % */}
    //         {!l?.hide?.discount && (
    //           <div class="text-sm bg-base-100 p-[10px]">
    //             <span class="text-base-content font-bold">
    //               {listPrice && price
    //                 ? `${Math.round(((listPrice - price) / listPrice) * 100)}% `
    //                 : ""}
    //             </span>
    //             OFF
    //           </div>
    //         )}
    //       </div>

    //       {/* Product Images */}
    //       <a
    //         href={url && relative(url)}
    //         aria-label="view product"
    //         class="grid grid-cols-1 grid-rows-1 w-full"
    //       >
    //         <Image
    //           src={front.url!}
    //           alt={front.alternateName}
    //           width={WIDTH}
    //           height={HEIGHT}
    //           class={`bg-base-100 col-span-full row-span-full rounded w-full ${
    //             l?.onMouseOver?.image == "Zoom image"
    //               ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
    //               : ""
    //           }`}
    //           sizes="(max-width: 640px) 50vw, 20vw"
    //           preload={preload}
    //           loading={preload ? "eager" : "lazy"}
    //           decoding="async"
    //         />
    //         {(!l?.onMouseOver?.image ||
    //           l?.onMouseOver?.image == "Change image") && (
    //           <Image
    //             src={back?.url ?? front.url!}
    //             alt={back?.alternateName ?? front.alternateName}
    //             width={WIDTH}
    //             height={HEIGHT}
    //             class="bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
    //             sizes="(max-width: 640px) 50vw, 20vw"
    //             loading="lazy"
    //             decoding="async"
    //           />
    //         )}
    //       </a>
    //       <figcaption
    //         class={`
    //         absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
    //           l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
    //             ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
    //             : "lg:hidden"
    //         }`}
    //       >
    //         {/* SKU Selector */}
    //         {l?.onMouseOver?.showSkuSelector && (
    //           <ul class="flex justify-center items-center gap-2 w-full">
    //             {skuSelector}
    //           </ul>
    //         )}
    //         {l?.onMouseOver?.showCta && cta}
    //       </figcaption>
    //     </figure>
    //     {/* Prices & Name */}
    //     <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-2">
    //       {/* SKU Selector */}
    //       {(!l?.elementsPositions?.skuSelector ||
    //         l?.elementsPositions?.skuSelector === "Top") && (
    //         <>
    //           {l?.hide?.skuSelector
    //             ? (
    //               ""
    //             )
    //             : (
    //               <ul
    //                 class={`flex items-center gap-2 w-full overflow-auto p-3 ${
    //                   align === "center" ? "justify-center" : "justify-start"
    //                 } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
    //               >
    //                 {skuSelector}
    //               </ul>
    //             )}
    //         </>
    //       )}

    //       {l?.hide?.productName && l?.hide?.productDescription
    //         ? (
    //           ""
    //         )
    //         : (
    //           <div class="flex flex-col gap-0">
    //             {l?.hide?.productName
    //               ? (
    //                 ""
    //               )
    //               : (
    //                 <h2
    //                   class="truncate text-base lg:text-lg text-base-content uppercase font-normal"
    //                   dangerouslySetInnerHTML={{
    //                     __html: isVariantOf?.name ?? "",
    //                   }}
    //                 />
    //               )}
    //             {l?.hide?.productDescription
    //               ? (
    //                 ""
    //               )
    //               : (
    //                 <div
    //                   class="truncate text-sm lg:text-sm text-neutral"
    //                   dangerouslySetInnerHTML={{ __html: description ?? "" }}
    //                 />
    //               )}
    //           </div>
    //         )}
    //       {l?.hide?.allPrices
    //         ? (
    //           ""
    //         )
    //         : (
    //           <div class="flex flex-col gap-2">
    //             <div
    //               class={`flex flex-col gap-0 ${
    //                 l?.basics?.oldPriceSize === "Normal"
    //                   ? "lg:flex-row-reverse lg:gap-2"
    //                   : ""
    //               } ${align === "center" ? "justify-center" : "justify-end"}`}
    //             >
    //               <div
    //                 class={`line-through text-base-300 text-xs font-light ${
    //                   l?.basics?.oldPriceSize === "Normal" ? "lg:text-sm" : ""
    //                 }`}
    //               >
    //                 {formatPrice(listPrice, offers?.priceCurrency)}
    //               </div>
    //               <div class="text-base-content lg:text-sm font-light">
    //                 {formatPrice(price, offers?.priceCurrency)}
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //       {/* SKU Selector */}
    //       {l?.elementsPositions?.skuSelector === "Bottom" && (
    //         <>
    //           <ul
    //             class={`flex items-center gap-2 w-full ${
    //               align === "center" ? "justify-center" : "justify-between"
    //             } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
    //           >
    //             {l?.hide?.installments
    //               ? (
    //                 ""
    //               )
    //               : (
    //                 <div class="text-base-300 font-light text-sm truncate">
    //                   ou {installments}
    //                 </div>
    //               )}
    //             {l?.hide?.skuSelector
    //               ? (
    //                 ""
    //               )
    //               : <div class="flex items-center gap-2">{skuSelector}</div>}
    //           </ul>
    //         </>
    //       )}
    //       {!l?.hide?.cta
    //         ? (
    //           <div
    //             class={`flex-auto flex items-end ${
    //               l?.onMouseOver?.showCta ? "lg:hidden" : ""
    //             }`}
    //           >
    //             {cta}
    //           </div>
    //         )
    //         : (
    //           ""
    //         )}
    //     </div>
    //   </div>

    <div>
      <div
        class={`group/content relative ${
          align == "left" ? "text-left" : "text-center"
        }  p-0 md:p-[10px] rounded-md transition-all`}
      >
        <a
          class="block outline-0"
          href={product.url}
        >
          <div class="relative">
            {product.image && (
              <>
                <WishlistButtonVtex
                  classCustom="absolute top-0 right-0"
                  productGroupID={product?.isVariantOf?.productGroupID}
                  productID={product.productID}
                />
                <figure class="p-[15px] m-0">
                  <Image
                    class="block max-w-full h-auto mx-auto my-0 outline-none"
                    src={`https://${product.image[0].url?.split("/")[2]}/${
                      product.image[0].url?.split("/")[3]
                    }/${product.image[0].url?.split("/")[4]}/${
                      product.image[0].url?.split("/")[5]
                    }-800-800/${product.image[0].url?.split("/")[6]}`}
                    alt={product.name}
                    width={300}
                    height={300}
                    loading={"lazy"}
                    decoding="async"
                  />
                </figure>
                {product.image[1] &&
                  (
                    <figure class="group-hover/content:opacity-100 p-[15px] m-0 opacity-0 w-full transition-all absolute left-0 top-0">
                      <Image
                        class="block max-w-full h-auto mx-auto my-0 outline-none"
                        src={`https://${product.image[1].url?.split("/")[2]}/${
                          product.image[1].url?.split("/")[3]
                        }/${product.image[1].url?.split("/")[4]}/${
                          product.image[1].url?.split("/")[5]
                        }-800-800/${product.image[1].url?.split("/")[6]}`}
                        alt={product.name}
                        width={300}
                        height={300}
                        loading={"lazy"}
                        decoding="async"
                      />
                    </figure>
                  )}
              </>
            )}

            <div class="absolute top-0 left-0">
              {
                /* {product.additionalProperty &&
                            product.additionalProperty.map((property) => {
                              return (
                                <>
                                  {property.description == "highlight" && (
                                    <span class={`w-full text-center`}>
                                      <p class="relative flex items-center h-[23px] bg-[#F0D02C] text-white text-[13px] font-bold leading-[15px] uppercase px-[5px] py-1 rounded-[3px]">
                                        {property.value}
                                      </p>
                                    </span>
                                  )}
                                </>
                              );
                            })} */
              }
              {listPrice != price && (
                <span class={`opacity-100 inline`}>
                  <span
                    class={`flex flex-col justify-around relative w-10 h-10 text-white text-[15px] ${
                      align == "left" ? "text-left" : "text-center"
                    } uppercase rounded-[5px] bg-black`}
                  >
                    <strong class="text-[#F0D02C] font-bold">
                      {listPrice && price &&
                        calculate(listPrice, price)}
                    </strong>{" "}
                    off
                  </span>
                </span>
              )}
            </div>
          </div>

          <span
            class={`block h-14 md:h-10 text-black text-[15px] md:text-[17px] leading-[14px] md:leading-5 ${
              align == "left" ? "text-left" : "text-center"
            } no-underline overflow-hidden mt-0 mb-2.5 mx-0"`}
          >
            {product.isVariantOf?.name}
          </span>
          {product.brand && (
            <span class="block mb-[10px] overflow-hidden">
              {product.brand.logo && (
                <Image
                  class="w-[80px] h-[35px] m-auto"
                  src={product.brand.logo}
                  alt={product.brand.name}
                  id={product.brand["@id"]}
                  loading={"lazy"}
                  width={80}
                  height={35}
                  decoding="async"
                />
              )}
            </span>
          )}

          <div
            class={`h-[50px] ${align == "left" ? "text-left" : "text-center"}`}
          >
            {listPrice && price && listPrice > price && (
              <div class="inline-block text-[#A6A5A1] text-xs md:text-base leading-[19px] line-through">
                <span class="mr-[10px]">
                  {formatPrice(
                    listPrice,
                    product.offers?.priceCurrency,
                  )}
                </span>
              </div>
            )}
            {price && (
              <div class="inline-block text-black text-sm md:text-base leading-[19px]">
                <span>
                  <strong>
                    {formatPrice(
                      price,
                      product.offers?.priceCurrency,
                    )}
                  </strong>
                </span>
              </div>
            )}
            {installments && (
              <div class="block text-[#595956] text-xs md:text-base leading-[19px] mt-2.5">
                ou {installments}
              </div>
            )}
          </div>
        </a>

        <div class="group-hover/content:visible group-hover/content:opacity-100 inline-block invisible opacity-0 w-full pb-[5px] transition-all mt-[15px]">
          <div class="shelf__default--buy-wrapper">
            <a
              href={product.url}
              class="rounded-[5px] font-medium text-xs flex justify-center items-center h-[40px] text-center uppercase outline-none transition-all hover:bg-black hover:text-white hover:border-black bg-[#F0D02C] border text-black border-solid border-[#F0D02C]"
            >
              {layout?.basics?.ctaText
                ? layout.basics.ctaText
                : "adicionar ao carrinho"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
