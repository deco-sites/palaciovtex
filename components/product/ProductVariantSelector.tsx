import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "$store/sdk/url.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  console.log('produto',product.offers?.offers);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-sm">{name}</span>
          <ul class="flex flex-row gap-3 flex-wrap">
            {Object.entries(possibilities[name]).map(([value, link]) => {
              const relativeUrl = relative(url);
              const relativeLink = relative(link);
              return (
                <li>
                  <button f-partial={relativeLink} f-client-nav>
                    <Avatar
                      content={value}
                      variant={relativeLink === relativeUrl
                        ? "active"
                        : relativeLink
                        ? "default"
                        : "disabled"}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
