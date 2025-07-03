// import { SendEventOnClick } from "$store/components/Analytics.tsx";
// import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
// import WishlistButtonWake from "../../islands/WishlistButton/vtex.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
// import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";

import Slider from "$store/components/ui/Slider.tsx";
// import SliderJS from "$store/islands/SliderJS.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    ctaText?: string;
  };
  onMouseOver?: {
    showBrand?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  title: string;
  products: Product[] | null;
  // /** Preload card image */
  // preload?: boolean;

  // /** @description used for analytics event */
  // itemListName?: string;

  // /** @description index of the product card in the list */
  // index?: number;

  /** @format color */
  pixPercentageBGColor: string;
  /** @format color */
  pixPercentageTextColor: string;
  /** @format color */
  buttonColor?: string;

  addWithoutPLP?: boolean;

  showAddButton?: boolean;
  layout?: Layout;
}

export function LoadingFallback() {
  // Renderize spinners, esqueletos e outros espaços reservados
  return (
    <div>
      <h2>CARREGANDO VITRINE</h2>
    </div>
  );
}

const calculate = (item: number, item2: number) => {
  if ((item - item2) > 0) {
    const percentValue = Math.round((item - item2) / item * 100);
    if (percentValue > 0) {
      return `${percentValue}%`;
    }
  }
};

export default function ProductCardCustom(
  {
    title,
    layout,
    products,
    addWithoutPLP,
    showAddButton,
    pixPercentageBGColor,
    pixPercentageTextColor,
    buttonColor,
  }: Props,
) {
  const id = useId();

  const align = !layout?.basics?.contentAlignment ||
      layout?.basics?.contentAlignment == "Left"
    ? "left"
    : "center";
  return (
    <div >
      {products && products?.length > 0 && (
      <>
      <h2
        class="text-[30px] leading-[36px] font-bold text-center pb-[30px]"
        dangerouslySetInnerHTML={{ __html: title }}
      >
      </h2>
      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 md:px-5 relative mb-20"
      >
        <div className="col-span-full row-span-full">
          <Slider class="sm:gap-1 w-full">
          {products && products.map((product, index) => {
            let currentProduct = product;

            let offerData = useOffer(product.offers);

            if (
              offerData.availability === "https://schema.org/OutOfStock" && product.isVariantOf && product.isVariantOf?.hasVariant?.length > 0
            ) {
              currentProduct = product?.isVariantOf?.hasVariant.at(-1)!;
              offerData = useOffer(currentProduct.offers);
            }

            const {
              listPrice,
              price,
              installments,
              // deno-lint-ignore no-unused-vars
              availability,
            } = offerData;

            const {
              url,
              productID,
              // deno-lint-ignore no-unused-vars
              name,
              image: images,
              offers,
              isVariantOf,
              brand,
            } = currentProduct;


            const [front, back] = images ?? [];

            const eventItem = mapProductToAnalyticsItem({
              product,
              price,
              listPrice,
            });

            return (
              <Slider.Item
                index={index}
                class={`md:w-1/4 w-full !flex-none`}
              >
                
                  <div
                    class={`h-full group flex flex-col justify-between group/content relative ${
                      align == "left" ? "text-left" : "text-center"
                    }  p-[10px] rounded-md transition-all`}
                  >
                    <a
                      class="block outline-0"
                      href={url}
                    >
                      <figure
                        class="relative overflow-hidden"
                        style={{ aspectRatio: `${300} / ${300}` }}
                      >
                        <a
                          href={url}
                          aria-label="view product"
                          class="grid grid-cols-1 grid-rows-1 w-full min-h-72"
                        >
                          <Image
                            src={front.url!}
                            alt={front.alternateName}
                            width={300}
                            height={300}
                            class={`overflow-hidden bg-base-100 col-span-full row-span-full transition-opacity lg:group-hover:opacity-0 rounded w-full`}
                            sizes="(max-width: 640px) 50vw, 20vw"
                            preload={false}
                            loading={"lazy"}
                            decoding="async"
                            fit="contain"
                          />
                          <Image
                            src={back?.url ?? front.url!}
                            alt={back?.alternateName ?? front.alternateName}
                            width={300}
                            height={300}
                            preload={false}
                            class="overflow-hidden bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
                            sizes="(max-width: 640px) 50vw, 20vw"
                            loading="lazy"
                            decoding="async"
                            fit="contain"
                          />
                        </a>

                        <div class="absolute top-0 left-0">
                          {listPrice != price && (
                            <span class={`opacity-100 inline`}>
                              <span
                                class={`flex flex-col justify-around relative w-10 h-10 text-white text-[15px] ${
                                  align == "left" ? "text-left" : "text-center"
                                } uppercase rounded-[5px] bg-black`}
                              >
                                <strong class="text-[#F0D02C] font-bold">
                                  {listPrice && price && calculate(listPrice, price)}
                                </strong>{" "}
                                off
                              </span>
                            </span>
                          )}
                        </div>
                      </figure>

                      <span
                        class={`block h-10 text-black text-[15px] md:text-[17px] leading-5 ${
                          align == "left" ? "text-left" : "text-center"
                        } no-underline overflow-hidden mt-0 mb-2.5 mx-0"`}
                      >
                        {product.isVariantOf?.name}
                      </span>
                      {brand && (
                        <span class="block mb-[10px] overflow-hidden">
                          {brand.logo && (
                            <Image
                              class="w-[80px] h-[35px] m-auto"
                              src={brand.logo}
                              alt={brand.name}
                              id={brand["@id"]}
                              loading={"lazy"}
                              width={80}
                              height={35}
                              decoding="async"
                            />
                          )}
                        </span>
                      )}

                      <div
                        class={`text-left`}
                      >
                        {listPrice && price && listPrice > price && (
                          <div class="inline-block text-[#A6A5A1] text-base leading-[19px] line-through">
                            <span class="mr-[10px]">
                              {formatPrice(
                                listPrice,
                                offers?.priceCurrency,
                              )}
                            </span>
                          </div>
                        )}
                        {price && (
                          <div class="inline-block text-black text-2xl leading-[19px]">
                            <span>
                              <strong>
                                {formatPrice(
                                  (price - (price*0.05)),
                                  offers?.priceCurrency,
                                )}
                              </strong>
                            </span>
                          </div>
                        )}
                        <div
                          style={{
                            backgroundColor: `${pixPercentageBGColor}`,
                            color: `${pixPercentageTextColor}`,
                          }}
                          class={`text-black px-3 py-1 font-bold bg-[#F0D02C] flex items-center gap-1 text-center relative text-sm md:text-base uppercase rounded-md `}
                        >
                          <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.917 11.71a2.05 2.05 0 0 1-1.454-.602l-2.1-2.1a.4.4 0 0 0-.551 0l-2.108 2.108a2.04 2.04 0 0 1-1.454.602h-.414l2.66 2.66c.83.83 2.177.83 3.007 0l2.667-2.668zM4.25 4.282c.55 0 1.066.214 1.454.602l2.108 2.108a.39.39 0 0 0 .552 0l2.1-2.1a2.04 2.04 0 0 1 1.453-.602h.253L9.503 1.623a2.127 2.127 0 0 0-3.007 0l-2.66 2.66h.414z"/><path d="m14.377 6.496-1.612-1.612a.3.3 0 0 1-.114.023h-.733c-.379 0-.75.154-1.017.422l-2.1 2.1a1.005 1.005 0 0 1-1.425 0L5.268 5.32a1.45 1.45 0 0 0-1.018-.422h-.9a.3.3 0 0 1-.109-.021L1.623 6.496c-.83.83-.83 2.177 0 3.008l1.618 1.618a.3.3 0 0 1 .108-.022h.901c.38 0 .75-.153 1.018-.421L7.375 8.57a1.034 1.034 0 0 1 1.426 0l2.1 2.1c.267.268.638.421 1.017.421h.733q.06.001.114.024l1.612-1.612c.83-.83.83-2.178 0-3.008z"/></svg>
                          à vista no PIX / Boleto
                        </div>
                        {installments && (
                          <div class="block rounded-md text-white px-3 py-1 bg-black text-base leading-[19px] mt-2.5">
                            ou {formatPrice(
                              price,
                              offers?.priceCurrency,
                            )} <span dangerouslySetInnerHTML={{__html: installments}} />
                          </div>
                        )}
                      </div>
                    </a>

                    <div
                      class={`${
                        showAddButton
                          ? "visible opacity-100"
                          : "group-hover/content:visible group-hover/content:opacity-100 invisible opacity-0"
                      }  inline-block  w-full pb-[5px] transition-all mt-[15px]`}
                    >
                      <div class="shelf__default--buy-wrapper">
                        {addWithoutPLP == true && (
                          <AddToCartButtonVTEX
                            buttonColor={buttonColor}
                            eventParams={{ items: [eventItem] }}
                            productID={productID}
                            seller={"1"}
                          />
                        )}
                        {addWithoutPLP == false && (
                          <a
                            href={url}
                            class="rounded-[5px] font-medium text-xs flex justify-center items-center h-[40px] text-center uppercase outline-none transition-all hover:bg-black hover:text-white hover:border-black bg-[#F0D02C] border text-black border-solid border-[#F0D02C]"
                          >
                            {layout?.basics?.ctaText
                              ? layout.basics.ctaText
                              : "adicionar ao carrinho"}
                          </a>
                        )}
                      </div>
                    </div>
                    <WishlistButtonVtex
                      classCustom="absolute top-0 right-0"
                      productGroupID={product?.isVariantOf?.productGroupID}
                      productID={product.productID}
                    />
                  </div>
                
              </Slider.Item>
            );
          })}
        </Slider>
        </div>
        
          <div class="relative z-10 col-start-1 row-start-1 flex items-center justify-center">
            <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
              <Icon
                size={48}
                id="ChevronLeftCustom"
                strokeWidth={3}
                class="w-5 rotate-180"
              />
            </Slider.PrevButton>
          </div>
          <div class="relative flex items-center justify-center z-10 col-start-3 row-start-1">
            <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
              <Icon size={48} class="w-5" id="ChevronRightCustom" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        
        <Slider.JS align="center" rootId={id} />
      </div>
      </>
      )}
    </div>
  );
}
