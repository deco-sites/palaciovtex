import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
// import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  // console.log(products?.length);

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };
  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class={`grid ${
          layout?.showArrows ? "grid-cols-[48px_1fr_48px]" : ""
        } px-0 md:px-5 container`}
      >
        <div class="row-start-2 row-end-5">
          <Slider class="">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={`${slideDesktop[layout?.numberOfSliders?.desktop ?? 3]} ${slideMobile[layout?.numberOfSliders?.mobile ?? 1]}`}
              >
                <ProductCard
                  product={product}
                  itemListName={title}
                  layout={cardLayout}
                  platform={platform}
                  index={index}
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        {layout?.showArrows && (
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
        )}
        <Slider.JS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductShelf;
