import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        // deno-lint-ignore no-unused-vars
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        // if (key === "PriceRanges") {
        //   const range = parseRange(item.value);

        //   return range && (
        //     <ValueItem
        //       {...item}
        //       label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
        //     />
        //   );
        // }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 py-4">
      {filters
        .filter(isToggle)
        .map((filter) => {
          return (
            <>
              {filter.label != "Departments" &&
                (
                  <div class="collapse collapse-plus">
                    <input type="checkbox" />
                    {filter.label != "Departments" && filter.quantity != 0 && (
                      <div class="pt-2 pb-2 mb-1.5 text-md rounded-none border-b-[#e9e9e9] 
                border-b border-solid collapse-title font-semibold 
                leading-9 after:!w-[30px] after:!h-[30px] after:!flex 
                after:!items-center after:!justify-center after:rounded-md">
                        {filter.label == "Categories" && (
                          <span>Categorias</span>
                        )}
                        {filter.label == "Brands" && <span>Marcas</span>}
                        {filter.label == "PriceRanges" && (
                          <span>Faixa de Preço</span>
                        )}
                        {filter.label != "Brands" &&
                          filter.label != "PriceRanges" &&
                          filter.label != "Categories" && (
                          <span>{filter.label}</span>
                        )}
                      </div>
                    )}

                    <div class="collapse-content">
                      <FilterValues {...filter} />
                    </div>
                  </div>
                )}
            </>
          );
        })}
    </ul>
  );
}

export default Filters;
