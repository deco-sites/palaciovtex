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
import SliderJS from "$store/islands/SliderJS.tsx";
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

  addWithoutPLP?: boolean;

  showAddButton?: boolean;
  layout?: Layout;
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
  }: Props,
) {
  const id = useId();

  const align = !layout?.basics?.contentAlignment ||
    layout?.basics?.contentAlignment == "Left"
    ? "left"
    : "center";
  return (
    <div>
      <h2
        class="text-[30px] leading-[36px] font-bold text-center pb-[30px]"
        dangerouslySetInnerHTML={{ __html: title }}
      >
      </h2>
      <div
        id={id}
        class="container grid grid-cols-[48px_1fr_48px] px-0 md:px-5 relative mb-[40px]"
      >
        <Slider class="carousel carousel-center sm:carousel-end sm:gap-1 row-start-2 row-end-5">
          {products && products.map((product, index) => {
            const { listPrice, price, installments, pixPrice } = useOffer(
              product.offers,
            );

            const { url, productID, name, image: images, offers, isVariantOf, brand } = product;

            const [front, back] = images ?? [];

            const eventItem = mapProductToAnalyticsItem({
              product,
              price,
              listPrice,
            });

            return (
              <Slider.Item
                index={index}
                class={`carousel-item md:w-1/4 w-full`}
              >
                <div>
                  <div
                    class={`h-full group flex flex-col justify-between group/content relative ${align == "left" ? "text-left" : "text-center"
                      }  p-[10px] rounded-md transition-all`}
                  >
                    <a
                      class="block outline-0"
                      href={url}
                    >
                      <figure class="relative overflow-hidden" style={{ aspectRatio: `${300} / ${300}` }}>

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
                            class={`max-w-72 max-h-72 overflow-hidden bg-base-100 col-span-full row-span-full transition-opacity lg:group-hover:opacity-0 rounded w-full`}
                            sizes="(max-width: 640px) 50vw, 20vw"
                            preload={false}
                            loading={"lazy"}
                            decoding="async"
                          />
                          <Image
                                src={back?.url ?? front.url!}
                                alt={back?.alternateName ?? front.alternateName}
                                width={300}
                                height={300}
                                preload={false}
                                class="max-w-72 max-h-72 overflow-hidden bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
                                sizes="(max-width: 640px) 50vw, 20vw"
                                loading="lazy"
                                decoding="async"
                              />
                        </a>
                        {/* <>
                            <figure class="p-[15px] m-0"
                            style={{ aspectRatio: "500 / 500" }}>
                              {front && (
                                <Image
                                class="block max-w-full h-auto mx-auto my-0 outline-none"
                                src={front.url!}
                                alt={front.alternateName || front.name }
                                sizes="(max-width: 640px) 50vw, 20vw"
                                width={500}
                                height={500}
                                loading={"lazy"}
                                decoding="async"
                                />
                              )}
                            </figure>

                            <figure 
                            style={{ aspectRatio: "500 / 500" }}
                            class="group-hover/content:opacity-100 p-[15px] m-0 opacity-0 w-full transition-all absolute left-0 top-0"
                            >
                                  <Image
                                    class="block max-w-full h-auto mx-auto my-0 outline-none"
                                    src={back?.url ?? front.url!}
                                    alt={back?.alternateName ?? front.alternateName}
                                    width={500}
                                    sizes="(max-width: 640px) 50vw, 20vw"
                                    height={500}
                                    loading={"lazy"}
                                    decoding="async"
                                  />
                            </figure>
                          </> */}

                        <div class="absolute top-0 left-0">
                          {listPrice != price && (
                            <span class={`opacity-100 inline`}>
                              <span
                                class={`flex flex-col justify-around relative w-10 h-10 text-white text-[15px] ${align == "left" ? "text-left" : "text-center"
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
                      </figure>

                      <span
                        class={`block h-10 text-black text-[15px] md:text-[17px] leading-5 ${align == "left" ? "text-left" : "text-center"
                          } no-underline overflow-hidden mt-0 mb-2.5 mx-0"`}
                      >
                        {isVariantOf?.name}
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
                        class={`${align == "left" ? "text-left" : "text-center"
                          }`}
                      >
                        {listPrice && (
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
                          <div class="inline-block text-black text-base leading-[19px]">
                            <span>
                              <strong>
                                {formatPrice(
                                  price,
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
                          class={`text-white bg-black block text-center relative  text-sm uppercase rounded-md `}
                        >
                          5% de desconto no PIX
                        </div>
                        {installments && (
                          <div class="block text-[#595956] text-base leading-[19px] mt-2.5">
                            ou {installments}
                          </div>
                        )}
                      </div>
                    </a>

                    <div
                      class={`${showAddButton
                          ? "visible opacity-100"
                          : "group-hover/content:visible group-hover/content:opacity-100 invisible opacity-0"
                        }  inline-block  w-full pb-[5px] transition-all mt-[15px]`}
                    >
                      <div class="shelf__default--buy-wrapper">
                        {addWithoutPLP == true && (
                          <AddToCartButtonVTEX
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
                    {
                      /* <WishlistButtonVtex
                      productGroupID={product?.isVariantOf?.productGroupID}
                      productID={product.productID}
                    /> */
                    }
                  </div>
                </div>
              </Slider.Item>
            );
          })}
        </Slider>

        <>
          <div class="relative block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
              <Icon
                size={48}
                id="ChevronLeftCustom"
                strokeWidth={3}
                class="w-5 rotate-180"
              />
            </Slider.PrevButton>
          </div>
          <div class="relative block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
              <Icon size={48} id="ChevronRightCustom" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} />
      </div>
    </div>
  );
}
