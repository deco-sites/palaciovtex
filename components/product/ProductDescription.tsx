import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useId } from "$store/sdk/useId.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Section } from "deco/blocks/section.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  page: ProductDetailsPage | null;
  extraSection: Section;
}

export default function ProductDescription(
  { page, extraSection: { Component, props } }: Props,
) {
  // deno-lint-ignore no-unused-vars
  const platform = usePlatform();
  // deno-lint-ignore no-unused-vars
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = page;

  const specifications = product.isVariantOf?.additionalProperty;
  const description = product.description;

  // console.log(product)

  return (
    <section class="max-w-[95%] pt-15 m-auto md:max-w-full">
      {description && (
        <div class="container">
          <div class="mb-5">
            <h4 class="mb-5 mt-10 text-3xl leading-9 text-black font-bold uppercase">
              DESCRIÇÃO
            </h4>
          </div>
          <div
            class="w-full max-w-full"
            dangerouslySetInnerHTML={{ __html: description }}
          >
          </div>
        </div>
      )}

      <Component principal={product} {...props} />

      {specifications && (
        <div class="container">
          <div class="mb-5">
            <h4 class="mb-5 mt-10 text-3xl leading-9 text-black font-bold uppercase">
              ESPECIFICAÇÕES TÉCNICAS
            </h4>
          </div>
          <table class="w-full">
            <tbody class="block">
              {specifications.map((specification, index) => {
                return (
                  <>
                    {specification.name != "Vídeo" &&
                      specification.name != "Compre Junto - produtos" && (
                      <tr
                        class={`flex flex-col md:flex-row ${
                          index % 2 == 0 ? "bg-[#F2F1EB]" : ""
                        }`}
                      >
                        <th class="py-2 px-5 align-top w-full md:w-[30%] text-[16px] leading-6 text-black name-field Caracteristicas-Tecnicas">
                          {specification.name}
                        </th>
                        <td class="py-2 px-5 text-[14px] w-full md:w-[70%] value-field Caracteristicas-Tecnicas">
                          {specification.value &&
                            specification.value.split("\r\n").map((item) => {
                              return (
                                <>
                                  {specification.name == "Manual" && (
                                    <a
                                      class="flex items-center justify-between w-36 h-10 rounded bg-black text-white text-xs font-medium px-[15px] py-0"
                                      target="_blank"
                                      href={item}
                                    >
                                      <Image
                                        width={17}
                                        height={17}
                                        src="https://palaciodasferramentas.vteximg.com.br/arquivos/download.png"
                                        loading={"lazy"}
                                      />
                                      Baixar Manual
                                    </a>
                                  )}
                                  {specification.name != "Manual" && item}
                                  <br />
                                </>
                              );
                            })}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
