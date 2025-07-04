// deno-lint-ignore no-unused-vars
import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";
import { useOffer } from "site/sdk/useOffer.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { formatPrice } from "site/sdk/format.ts";
import Image from "apps/website/components/Image.tsx";

import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  offset: number;
  addWithoutPLP?: boolean;
  showAddButton?: boolean;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
  };
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2",
  5: "md:grid-cols-5",
};

const calculate = (item: number, item2: number) => {
  if ((item - item2) > 0) {
    const percentValue = Math.round((item - item2) / item * 100);
    if (percentValue > 0) {
      return `${percentValue}%`;
    }
  }
};

function ProductGallery({
  products,
  // deno-lint-ignore no-unused-vars
  addWithoutPLP,
  // deno-lint-ignore no-unused-vars
  showAddButton,
  layout,
  // deno-lint-ignore no-unused-vars
  offset,
}: Props) {
  // deno-lint-ignore no-unused-vars
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  return (
    <div
      class={`grid xl:grid-cols-3 gap-2 items-center ${desktop} ${mobile} sm:gap-10`}
    >
      {products && products.map((product, _index) => {
        // deno-lint-ignore no-unused-vars
        const { listPrice, price, installments, pixPrice } = useOffer(
          product.offers,
        );

        const eventItem = mapProductToAnalyticsItem({
          product,
          price,
          listPrice,
        });

        return (
          <div class="h-full">
            <div
              class={`h-full flex flex-col justify-between group/content relative text-center p-[10px] rounded-md transition-all`}
            >
              <a
                class="block outline-0"
                href={product.url}
              >
                <div class="relative">
                  {product.image && (
                    <>
                      <figure class="p-[15px] m-0">
                        <Image
                          class="block max-w-full h-auto mx-auto my-0 outline-none"
                          src={`https://${
                            product.image[0].url?.split("/")[2]
                          }/${product.image[0].url?.split("/")[3]}/${
                            product.image[0].url?.split("/")[4]
                          }/${product.image[0].url?.split("/")[5]}-800-800/${
                            product.image[0].url?.split("/")[6]
                          }`}
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
                              src={`https://${
                                product.image[1].url?.split("/")[2]
                              }/${product.image[1].url?.split("/")[3]}/${
                                product.image[1].url?.split("/")[4]
                              }/${
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
                    {listPrice != price && (
                      <span class={`opacity-100 inline`}>
                        <span
                          class={`flex flex-col justify-around relative w-10 h-10 text-white text-[15px] text-center uppercase rounded-[5px] bg-black`}
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
                  class={`block h-10 text-black text-[15px] md:text-[17px] leading-5 text-center no-underline overflow-hidden mt-0 mb-2.5 mx-0"`}
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
                        class={`text-left`}
                      >
                        {listPrice && price && listPrice > price && (
                          <div class="inline-block text-[#A6A5A1] text-base leading-[19px] line-through">
                            <span class="mr-[10px]">
                              {formatPrice(
                                listPrice,
                                product.offers?.priceCurrency,
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
                                  product.offers?.priceCurrency,
                                )}
                              </strong>
                            </span>
                          </div>
                        )}
                        <div
                          class={`text-black px-3 py-1 font-bold bg-[#F0D02C] flex items-center gap-1 text-center relative text-xs md:text-base uppercase rounded-md `}
                        >
                          <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.917 11.71a2.05 2.05 0 0 1-1.454-.602l-2.1-2.1a.4.4 0 0 0-.551 0l-2.108 2.108a2.04 2.04 0 0 1-1.454.602h-.414l2.66 2.66c.83.83 2.177.83 3.007 0l2.667-2.668zM4.25 4.282c.55 0 1.066.214 1.454.602l2.108 2.108a.39.39 0 0 0 .552 0l2.1-2.1a2.04 2.04 0 0 1 1.453-.602h.253L9.503 1.623a2.127 2.127 0 0 0-3.007 0l-2.66 2.66h.414z"/><path d="m14.377 6.496-1.612-1.612a.3.3 0 0 1-.114.023h-.733c-.379 0-.75.154-1.017.422l-2.1 2.1a1.005 1.005 0 0 1-1.425 0L5.268 5.32a1.45 1.45 0 0 0-1.018-.422h-.9a.3.3 0 0 1-.109-.021L1.623 6.496c-.83.83-.83 2.177 0 3.008l1.618 1.618a.3.3 0 0 1 .108-.022h.901c.38 0 .75-.153 1.018-.421L7.375 8.57a1.034 1.034 0 0 1 1.426 0l2.1 2.1c.267.268.638.421 1.017.421h.733q.06.001.114.024l1.612-1.612c.83-.83.83-2.178 0-3.008z"/></svg>
                          à vista no PIX / Boleto
                        </div>
                        {installments && (
                          <div class="block rounded-md text-white px-3 py-1 bg-black text-xs md:text-base leading-[19px] mt-2.5">
                            ou {formatPrice(
                              price,
                              product.offers?.priceCurrency,
                            )} <span dangerouslySetInnerHTML={{__html: installments}} />
                          </div>
                        )}
                      </div>
              </a>

              <div
                class={`visible opacity-100 inline-block  w-full pb-[5px] transition-all mt-[15px]`}
              >
                <div class="shelf__default--buy-wrapper">
                  {/* {addWithoutPLP == true && ( */}
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={product.productID}
                    seller={"1"}
                  />
                  {/* )} */}
                  {
                    /* {addWithoutPLP == false && (
                          <a
                            href={product.url}
                            class="rounded-[5px] font-medium text-xs flex justify-center items-center h-[40px] text-center uppercase outline-none transition-all hover:bg-black hover:text-white hover:border-black bg-[#F0D02C] border text-black border-solid border-[#F0D02C]"
                          >
                            {"adicionar ao carrinho"}
                          </a>
                        )} */
                  }
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
        );
      })}
    </div>
  );
}

export default ProductGallery;
