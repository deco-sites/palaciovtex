import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Image {
  image: ImageWidget;
  link?: string;
  alt?: string;
}

interface Props {
  images: Image[];
  layout: {
    slidesPerViewDesktop?: number;
    slidesPerViewTablet?: number;
    slidesPerViewMobile?: number;
    spaceBetween?: number;
    autoplay?: boolean;
    showArrows?: boolean;
    fundoDasArrows?: string;
  };
}

function CustomSlider({ images, layout }: Props) {
  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    spaceBetween: layout.spaceBetween || 20,
    autoplay: layout.autoplay,

    // Navigation arrows
    navigation: {
      enabled: true,
      nextEl: ".button-next",
      prevEl: ".button-prev",
    },
    breakpoints: {
      // when window width is >= 0
      0: {
        slidesPerView: layout.slidesPerViewMobile || 2,
      },
      768: {
        slidesPerView: layout.slidesPerViewTablet || 3,
      },
      1024: {
        slidesPerView: layout.slidesPerViewDesktop || 5,
      },
    },
  });

  swiper;

  return (
    <>
      <div class="container">
        <div class="swiper">
          <div class="swiper-wrapper">
            {images.length > 0 &&
              images.map((image) => (
                <div class="swiper-slide">
                  TESTE DE LOCALHOST
                  <a href={image.link}>
                    <img src={image.image} alt={image.alt} />
                  </a>
                </div>
              ))}
          </div>

          <div
            style={{
              backgroundColor: layout.fundoDasArrows
                ? layout.fundoDasArrows
                : "",
            }}
            class={`${
              layout.showArrows ? "" : "hidden"
            } "button-prev absolute top-1/2 left-0 z-20 bg-white cursor-pointer"`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 16a1 1 0 0 1-.707-.293l-5-5a1 1 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L8.414 10l4.293 4.293A.999.999 0 0 1 12 16" />
            </svg>
          </div>
          <div
            style={{
              backgroundColor: layout.fundoDasArrows
                ? layout.fundoDasArrows
                : "",
            }}
            class={`${
              layout.showArrows ? "" : "hidden"
            } "button-next  absolute top-1/2 right-0 z-20 bg-white cursor-pointer"`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(180)"
            >
              <path d="M12 16a1 1 0 0 1-.707-.293l-5-5a1 1 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L8.414 10l4.293 4.293A.999.999 0 0 1 12 16" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomSlider;
