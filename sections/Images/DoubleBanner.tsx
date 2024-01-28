import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
    image1: {
        img: ImageWidget;
        altText: string;
        link: string;
        width: number;
        height: number;
    };
    image2: {
        img: ImageWidget;
        altText: string;
        link: string;
        width: number;
        height: number;
    };
}

export default function DoubleBanner({image1, image2}: Props) {
    return (
        <>
            <div class="home__banners--wrapper container mb-[40px]">
                <div class="desk-view">
                    {image1 &&  
                        <div class="inline-block md:w-1/2 w-full float-left mb-[10px]">
                            <a class="block overflow-hidden group" href={image1.link}>
                                <Image
                                    class="inline-block max-w-full transition-opacity group-hover:opacity-80"
                                    src={image1.img}
                                    alt={image1.altText}
                                    decoding="async"
                                    loading="lazy"
                                    width={image1.width}
                                    height={image1.height}
                                />
                            </a>
                        </div>
                    }
                    {image2 &&  
                        <div class="inline-block md:w-1/2 w-full float-left mb-[10px]">
                            <a class="block overflow-hidden group" href={image2.link}>
                                <Image
                                    class="inline-block max-w-full transition-opacity group-hover:opacity-80"
                                    src={image2.img}
                                    alt={image2.altText}
                                    decoding="async"
                                    loading="lazy"
                                    width={image2.width}
                                    height={image2.height}
                                />
                            </a>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}