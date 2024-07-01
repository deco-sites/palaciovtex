import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import Image from "apps/website/components/Image.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    // gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  // const description = product.description || isVariantOf?.description;
  const RefId = product.additionalProperty?.find((refId) =>
    refId.name == "RefId"
  );
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  return (
    <div class="flex flex-col max-w-[95%] m-auto md:max-w-full" id={id}>
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <h1 class="productName">
          <span class="font-medium text-xl capitalize">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : isVariantOf?.name}
          </span>
        </h1>
        <div>
          {RefId && <span class="text-sm text-black">Cod. {RefId.value}</span>}
        </div>
        {product.brand && (
          <span class="block mb-[10px] overflow-hidden">
            {product.brand.logo && (
              <a href={`/${product.brand.name}`} alt={product.brand.name}>
                <Image
                  src={product.brand.logo}
                  alt={product.brand.name}
                  id={product.brand["@id"]}
                  loading={"lazy"}
                  width={80}
                  height={35}
                  decoding="async"
                />
              </a>
            )}
          </span>
        )}

        <div
          class={`text-white bg-black block text-center relative text-xs md:text-sm uppercase rounded-md max-w-72`}
        >
          5% de desconto no PIX
        </div>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-black text-xs">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="text-xl text-black font-bold ">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
        <span class="text-sm text-black">{installments}</span>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <div class="flex items-center">
                  <AddToCartButtonVTEX
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                    seller={seller}
                  />
                    <WishlistButtonVtex
                      productGroupID={product?.isVariantOf?.productGroupID}
                      productID={product.productID}
                    />
                </div>
              )}
              {platform === "wake" && (
                <>
                  <AddToCartButtonWake
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                  />
                  <WishlistButtonWake
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      
      <div class="mt-4 sm:mt-10 flex">
        <div class="product-social-links">
          <div class="product-share">
            <div class="flex items-center gap-2">
                <a 
                class="w-8 h-8 rounded-md border p-1 flex group/link hover:bg-[#3b5a9a]"
                href={`https://www.facebook.com/sharer.php?u=${product.url}`} 
                target="_blank" 
                rel="nofollow">
                  <svg class="group-hover/link:fill-white" width="32" height="32" viewBox="-7 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-facebook"><path d="M2.046 3.865v2.748H.032v3.36h2.014v9.986H6.18V9.974h2.775s.26-1.611.386-3.373H6.197V4.303c0-.343.45-.805.896-.805h2.254V0H6.283c-4.34 0-4.237 3.363-4.237 3.865"/></svg>
                </a>
                <a
                class="w-8 h-8 rounded-md border p-1 flex items-center group/link hover:bg-[#3c8a38]"
                href={`https://api.whatsapp.com/send?text=${product.url}`} 
                target="_blank" 
                rel="nofollow">
                  <svg class="group-hover/link:fill-white" width="32" height="32" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><path fill="none" data-name="invisible box" d="M0 0h48v48H0z"/><path d="M38.9 8.1A20.9 20.9 0 0 0 3.2 22.8 19.8 19.8 0 0 0 6 33.2L3 44l11.1-2.9a20.3 20.3 0 0 0 10 2.5A20.8 20.8 0 0 0 38.9 8.1m-14.8 32a17.1 17.1 0 0 1-9.5-2.8L8 39.1l1.8-6.4a17.9 17.9 0 0 1-3.1-9.9 17.4 17.4 0 1 1 17.4 17.3"/><path d="M33.6 27.2a29 29 0 0 0-3.6-1.7c-.4-.2-.8-.3-1.1.2s-1.4 1.7-1.7 2.1a.8.8 0 0 1-1.1.1 15.2 15.2 0 0 1-4.2-2.6 15 15 0 0 1-2.9-3.6.7.7 0 0 1 .2-1l.8-1a3.5 3.5 0 0 0 .5-.8.9.9 0 0 0 0-.9c-.2-.3-1.2-2.8-1.6-3.9s-.9-.9-1.2-.9h-1a1.7 1.7 0 0 0-1.4.7 5.5 5.5 0 0 0-1.8 4.3 10.4 10.4 0 0 0 2.1 5.4c.3.3 3.7 5.6 8.9 7.8a16.4 16.4 0 0 0 3 1.1 6.4 6.4 0 0 0 3.3.2c1-.1 3.1-1.2 3.5-2.4s.5-2.3.3-2.5a2.1 2.1 0 0 0-1-.6"/></g></svg>
                </a>
                <a
                class="w-8 h-8 rounded-md border p-1 flex items-center group/link hover:bg-[#dd4b39]"
                href={`mailto:?subject=${product.isVariantOf?.name}&amp;body=${product.url}`} 
                target="_blank" 
                rel="nofollow">
                  <svg class="group-hover/link:fill-white" width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.484 11.976 6.151-5.344v10.627zm-7.926.905 2.16 1.875c.339.288.781.462 1.264.462h.017-.001.014c.484 0 .926-.175 1.269-.465l-.003.002 2.16-1.875 6.566 5.639H1.995zM1.986 5.365h20.03l-9.621 8.356a.6.6 0 0 1-.38.132h-.014.001-.014a.6.6 0 0 1-.381-.133l.001.001zm-.621 1.266 6.15 5.344-6.15 5.28zm21.6-2.441c-.24-.12-.522-.19-.821-.19H1.859a1.9 1.9 0 0 0-.835.197l.011-.005A1.86 1.86 0 0 0 0 5.855v12.172a1.86 1.86 0 0 0 1.858 1.858h20.283a1.86 1.86 0 0 0 1.858-1.858V5.855c0-.727-.419-1.357-1.029-1.66l-.011-.005z"/></svg>
                </a>
                <span class="font-bold text-sm">Compartilhe o produto</span>
            </div>
          </div>
        </div>
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[
              {
                id: Number(product.sku),
                quantity: 1,
                seller: seller,
              },
            ]}
          />
        )}
      </div>
      {/* Description card */}
      {
        /* <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}
        </span>
      </div> */
      }
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
