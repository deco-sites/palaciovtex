import { ImageWidget } from "apps/admin/widgets.ts";

interface Banner {
    image: ImageWidget;
    width?: number;
    height?: number;
    alt?: string;
}

interface Props {
    banners: Banner[];
}

function InstitucionalDoubleBanner({banners}: Props) {
    return (
        <div class="flex mt-2.5 mb-[60px] mx-0 gap-3">
            {banners.length > 0 && banners.map((banner) => {
                return (
                    <div>
                        <img 
                        class="inline-block align-top max-w-full h-auto" 
                        src={banner.image} width={banner.width} height={banner.height} alt={banner.alt} />
                    </div>
                )
            })}
        </div>
    )
}

export default InstitucionalDoubleBanner;