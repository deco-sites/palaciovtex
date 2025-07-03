import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import _Modal from "$store/components/ui/Modal.tsx";
// import Button from "$store/components/ui/Button.tsx";
import { useSignal as _useSignal } from "@preact/signals";
import ProductYoutube from "$store/islands/ProductYoutube.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */

export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: {
      product: {
        image: images = [],
        isVariantOf,
      },
    },
    layout: { width, height },
  } = props;
  const _aspectRatio = `${width} / ${height}`;

  const specifications = isVariantOf?.additionalProperty.find(
    (specification) => {
      return specification.name == "Vídeo";
    },
  );

  return (
    <div id={id} class="grid grid-flow-row sm:grid-flow-col">
      {/* Image Slider */}
      <div class="relative order-1 sm:order-2">
        <div class="absolute z-50 top-2 left-2 bg-base-100 rounded-full">
          {specifications && specifications.value && (
            <ProductYoutube
              video={specifications.value.replace("560", "100%").replace(
                "315",
                "550",
              )}
            />
          )}
        </div>
        <div className="col-span-full row-span-full">
          <Slider class="w-full max-w-[50vw]">
          {images?.map((img, index) => (
            <Slider.Item
              index={index}
              class="w-full"
            >
              {/* <figure  style={{backgroundImage: `url(https://${img.url?.split("/")[2]}/${img.url?.split("/")[3]}/${img.url?.split("/")[4]}/${img.url?.split("/")[5]}-1000-1000/${img.url?.split("/")[6]})` }}> */}
              <Image
                class="w-full"
                sizes="(max-width: 640px) 100vw, 40vw"
                src={`https://${img.url?.split("/")[2]}/${img.url?.split("/")[3]}/${img.url?.split("/")[4]}/${img.url?.split("/")[5]}-1000-1000/${img.url?.split("/")[6]}`}
                alt={img.alternateName}
                width={1000}
                height={1000}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* </figure> */}
            </Slider.Item>
          ))}
        </Slider>
        </div>

        <Slider.PrevButton
          class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
        >
          <Icon size={24} id="ChevronLeft" strokeWidth={3} />
        </Slider.PrevButton>

        <Slider.NextButton
          class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
          disabled={images.length < 2}
        >
          <Icon size={24} id="ChevronRight" strokeWidth={3} />
        </Slider.NextButton>

        <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <ProductImageZoom
            images={images!}
            width={700}
            height={Math.trunc(700 * height / width)}
          />
        </div>
      </div>

      {/* Dots */}
        <div class="col-start-1 col-span-1">
          <div
            class={`carousel carousel-center sm:carousel-vertical gap-2 max-w-full overflow-x-auto sm:overflow-y-auto`}
            style={{ maxHeight: "600px" }}
          >
            {images?.map((img) => (
              <li class="carousel-item w-24 h-24">
                <Slider.Dot>
                  <Image
                    style={{ aspectRatio: "1 / 1" }}
                    class="group-disabled:border-base-400 border rounded object-cover w-full h-full"
                    width={64}
                    height={64}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </div>
        </div>


      {/* Dots */}
      {/* <Slider.Dots class="hidden md:flex  max-h-[600px] overflow-hidden max-w-full gap-4 px-4 sm:px-0 sm:flex-col order-2 sm:order-1">
        {images && images.map((img, index) => (
            <Slider.Dot
              class={"h-full max-w-20 max-h-20 w-1/3 md:w-full md:h-1/5 justify-center"}
            >
              <Image
                class="group-disabled:border-[#164195] border-2 border-solid border-[#E9E9E9] rounded-[22px] "
                width={125}
                height={108}
                src={img.url!}
                alt={img.alternateName}
              />
            </Slider.Dot>
          ))}
      </Slider.Dots> */}

      <Slider.JS rootId={id} controlDots />
    </div>
  );
}
