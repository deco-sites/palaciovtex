import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/vtex.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "$store/sdk/url.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { useId } from "$store/sdk/useId.ts";

import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

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
  products: Product[] | null;
  // /** Preload card image */
  // preload?: boolean;

  // /** @description used for analytics event */
  // itemListName?: string;

  // /** @description index of the product card in the list */
  // index?: number;

  layout?: Layout;
  // platform?: Platform;
}

const calculate = (item: number, item2: number) => {
  if ((item - item2) > 0) {
    const percentValue = Math.round((item - item2) / item * 100);
    if (percentValue > 0) {
      return `${percentValue}%`;
    }
  }
};

export default function ProductCardCustom({ layout, products }: Props) {
  const id = useId();
  console.log(products);

  const align = !layout?.basics?.contentAlignment ||
    layout?.basics?.contentAlignment == "Left"
    ? "left"
    : "center";
  return (
    <div id={id} class="container grid grid-cols-[48px_1fr_48px] px-0 md:px-5`">
      <Slider class="carousel carousel-center sm:carousel-end sm:gap-1 row-start-2 row-end-5">
        {products && products.map((product, index) => {
          console.log("Quantidade de produtos: " + products.length)
          const { listPrice, price, installments, pixPrice } = useOffer(
            product.offers,
          );
          return (

            <Slider.Item
              index={index}
              class={`carousel-item md:w-1/4 w-full`}
            >
              <div>
                <div
                  class={`group/content relative ${align == "left" ? "text-left" : "text-center"
                    }  p-[10px] rounded-md transition-all`}
                >
                  <a
                    class="block outline-0"
                    href={product.url}
                  >
                    <div class="relative">
                      {product.image && (
                        <>
                          <figure class="p-[15px] m-0">
                            <img
                              class="block max-w-full h-auto mx-auto my-0 outline-none"
                              src={`https://${product.image[0].url?.split("/")[2]
                                }/${product.image[0].url?.split("/")[3]}/${product.image[0].url?.split("/")[4]
                                }/${product.image[0].url?.split("/")[5]}-300-300/${product.image[0].url?.split("/")[6]
                                }`}
                              alt=""
                              id=""
                            />
                          </figure>
                          {product.image[1] &&
                            (
                              <figure class="group-hover/content:opacity-100 p-[15px] m-0 opacity-0 w-full transition-all absolute left-0 top-0">
                                <img
                                  class="block max-w-full h-auto mx-auto my-0 outline-none"
                                  src={`https://${product.image[1].url?.split("/")[2]
                                    }/${product.image[1].url?.split("/")[3]}/${product.image[1].url?.split("/")[4]
                                    }/${product.image[1].url?.split("/")[5]}-300-300/${product.image[1].url?.split("/")[6]
                                    }`}
                                  alt={""}
                                  id=""
                                />
                              </figure>
                            )
                          }

                        </>
                      )}

                      <div class="absolute top-0 left-0">
                        {product.additionalProperty &&
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
                          })}
                        {listPrice != price && (
                          <span class={`opacity-100 inline`}>
                            <span
                              class={`flex flex-col justify-around relative w-10 h-10 text-white text-[15px] ${align == "left" ? "text-left" : "text-center"
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
                    </div>

                    <span
                      class={`block h-10 text-black text-[17px] leading-5 ${align == "left" ? "text-left" : "text-center"
                        } no-underline overflow-hidden mt-0 mb-2.5 mx-0"`}
                    >
                      {product.isVariantOf?.name}
                    </span>
                    {product.brand && (
                      <span class="block mb-[10px] overflow-hidden">
                        
                        {product.brand.logo && ( 
                            <img
                              class="w-[80px] h-[35px] m-auto"
                              src={product.brand.logo}
                              alt={product.brand.name}
                              id={product.brand["@id"]}
                            />
                          )
                        }
                        
                      </span>
                    )}

                    <div
                      class={`h-[50px] ${align == "left" ? "text-left" : "text-center"
                        }`}
                    >
                      {listPrice && (
                        <div class="inline-block text-[#A6A5A1] text-base leading-[19px] line-through">
                          <span class="mr-[10px]">
                            {formatPrice(listPrice, product.offers?.priceCurrency)}
                          </span>
                        </div>
                      )}
                      {price && (
                        <div class="inline-block text-black text-base leading-[19px]">
                          <span>
                            <strong>
                              {formatPrice(price, product.offers?.priceCurrency)}
                            </strong>
                          </span>
                        </div>
                      )}
                      {installments && (
                        <div class="block text-[#595956] text-base leading-[19px] mt-2.5">
                          ou {installments}
                        </div>
                      )}
                    </div>
                  </a>

                  <div class="group-hover/content:visible group-hover/content:opacity-100 inline-block invisible opacity-0 w-full pb-[5px] transition-all mt-[15px]">
                    <div class="shelf__default--buy-wrapper">
                      <a
                        href="https://www.palacio.com.br/parafusadeira-e-furadeira-de-impacto-de-½--18v-gsb-180-li---bosch/p"
                        class="rounded-[5px] flex justify-center items-center h-[40px] font-normal text-center uppercase outline-none transition-all hover:bg-black hover:text-white hover:border-black bg-[#F0D02C] border text-black border-solid border-[#F0D02C]"
                      >
                        {layout?.basics?.ctaText
                          ? layout.basics.ctaText
                          : "adicionar ao carrinho"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Slider.Item>
          );
        })}
      </Slider>

      <>
        <div class="relative block z-10 col-start-1 row-start-3">
          <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
            <Icon size={24} id="ChevronLeft" strokeWidth={3} class="w-5" />
          </Slider.PrevButton>
        </div>
        <div class="relative block z-10 col-start-3 row-start-3">
          <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
            <Icon size={24} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>
      </>
      <SliderJS rootId={id} />
    </div>
  );
}
