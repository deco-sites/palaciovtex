import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useId } from "$store/sdk/useId.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";

interface Props {
    page: ProductDetailsPage | null;
}

export default function ProductDescription({ page }: Props) {
    const platform = usePlatform();
    const id = useId();

    if (page === null) {
        throw new Error("Missing Product Details Page Info");
    }

    const { product } = page;

    const specifications = product.isVariantOf?.additionalProperty;

    return (
        <>
        {specifications && (
            <div class="container">
              <table class="w-full">
                <tbody>
                  {specifications.map((specification, index) => {
                    return (
                      <tr class={`${index % 2 == 0 ? "bg-[#F2F1EB]" : ""}`}>
                        <th class="py-2 px-5 align-top w-[30%] text-[16px] leading-6 text-black name-field Caracteristicas-Tecnicas">
                          {specification.name}
                        </th>
                        <td class="py-2 px-5 text-[14px] w-[70%] value-field Caracteristicas-Tecnicas">
                        {specification.value && specification.value.split("\r\n").map((item) => {
                          return (
                            <>
                              {item}<br/>
                            </>
                          )
                        })}
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
    )
}