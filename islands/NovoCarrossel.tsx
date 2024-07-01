import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";
// deno-lint-ignore no-unused-vars
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
// import { Picture } from "apps/website/components/Picture.tsx";
// import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title: string;
    /** @description Image text subtitle */
    subTitle: string;
    /** @description Button label */
    label: string;
  };
}

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 1 | 2 | 3 | 4 | 5;
}

export interface Props {
  title?: string;
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title IN Container?
   * @description Colocar num container menor?
   */
  container?: boolean;
  /**
   * @title Show arrows
   * @description show arrows to navigate through the images
   */
  arrows?: boolean;
  /**
   * @title Show dots
   * @description show dots to navigate through the images
   */
  dots?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  layout?: {
    columns?: Columns;
  };
}

const MOBILE_COLUMNS = {
  1: "w-full",
  2: "w-1/2",
};

const DESKTOP_COLUMNS = {
  1: "md:w-full",
  2: "md:w-1/2",
  3: "md:w-1/3",
  4: "md:w-1/4",
  5: "md:w-1/5",
};

const DEFAULT_PROPS = {
  images: [
    {
      alt: "/feminino",
      action: {
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      action: {
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
    {
      alt: "/feminino",
      action: {
        title: "New collection",
        subTitle: "Main title",
        label: "Explore collection",
        href: "/",
      },
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/d057fc10-5616-4f12-8d4c-201bb47a81f5",
    },
  ],
  preload: true,
};

function BannerItem(
  { image, lcp, id }: { image: Banner; lcp?: boolean; id: string },
) {
  const {
    alt,
    desktop,
    action,
  } = image;

  return (
    <a
      id={id}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="items-center justify-center relative overflow-y-hidden w-full flex"
    >
      <img src={desktop} alt={alt} loading={lcp ? "eager" : "lazy"} />
    </a>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-6 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-[12px] h-[12px] rounded-full group-disabled:bg-black bg-white"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="bg-transparent border-0">
          <Icon
            class="text-black"
            size={24}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="bg-transparent border-0">
          <Icon
            class="text-black"
            size={24}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function NovoCarrossel(props: Props) {
  const id = useId();
  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  const mobile = MOBILE_COLUMNS[props.layout?.columns?.mobile ?? 1];
  const desktop = DESKTOP_COLUMNS[props.layout?.columns?.desktop ?? 1];

  return (
    <>
      {props.title && (
        <h2
          class="text-[30px] leading-[36px] font-bold text-center pb-[30px]"
          dangerouslySetInnerHTML={{ __html: props.title }}
        />
      )}
      <div
        id={id}
        class={`${
          props.container ? "container" : ""
        } grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] sm:min-h-min mb-20`}
      >
        <Slider class="carousel carousel-center w-full col-span-full row-span-full">
          {images?.map((image, index) => {
            const params = { promotion_name: image.alt };
            return (
              <Slider.Item
                index={index}
                class={`carousel-item ${mobile} ${desktop}`}
              >
                <BannerItem
                  image={image}
                  lcp={index === 0 && preload}
                  id={`${id}::${index}`}
                />
                <SendEventOnClick
                  id={`${id}::${index}`}
                  event={{ name: "select_promotion", params }}
                />
                <SendEventOnView
                  id={`${id}::${index}`}
                  event={{ name: "view_promotion", params }}
                />
              </Slider.Item>
            );
          })}
        </Slider>

        {props.arrows && <Buttons />}

        {props.dots && <Dots images={images} interval={interval} />}

        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </>
  );
}

export default NovoCarrossel;
