import Icon from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import Image from "apps/website/components/Image.tsx";
import { asset } from "$fresh/runtime.ts";

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface PaymentItem {
  label:
    | "PixNovo"
    | "Diners"
    | "visaNovo"
    | "mastercardNovo"
    | "hipercardNovo"
    | "boletoNovo";
}

export interface SocialItem {
  label:
    | "youtubeNovo"
    | "facebookNovo"
    | "instagramNovo"
    | "linkedinNovo";
  link: string;
}
export interface politicasItem {
  text: string;
  link: string;
}
export interface institucionalItem {
  text: string;
  link: string;
}

export interface ThemeColors {
  /**
   * @format color
   * @title Cor do Fundo
   */
  /** @format color */
  corFundo?: string;
  /** @format color */
  corNewsletter?: string;
  /**
   * @format color
   * @title Cor dos textos
   * @description Aqui se altera a cor de tal lugar
   */
  corTexto?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  colors?: ThemeColors;
  layout?: Layout;
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  socials?: {
    title?: string;
    items?: SocialItem[];
  };
  duvidas: {
    title: string;
    items?: {
      text: string;
    }[];
  };
  orcamentos: {
    title: string;
    items?: {
      text: string;
    }[];
  };
  politicas: {
    title: string;
    items?: politicasItem[];
  };
  institucional: {
    title: string;
    items?: institucionalItem[];
  };
}

export default function Rodape(
  {
    payments,
    socials,
    duvidas,
    orcamentos,
    politicas,
    institucional,
    colors,
    newsletter,
    layout = {
      backgroundColor: "Primary",
      variation: "Variation 1",
      hide: {
        logo: false,
        newsletter: false,
        sectionLinks: false,
        socialLinks: false,
        paymentMethods: false,
        mobileApps: false,
        regionOptions: false,
        extraLinks: false,
        backToTheTop: false,
      },
    },
  }: Props,
) {
  return (
    <footer>
      <div className="footer-in">
        <div
          style={{
            backgroundColor: colors?.corNewsletter ? colors?.corNewsletter : "",
          }}
          class="bg-black py-[30px]"
        >
          <div class="container">
            {newsletter &&
              (
                <Newsletter
                  content={newsletter}
                  layout={{
                    tiled: layout?.variation == "Variation 4" ||
                      layout?.variation == "Variation 5",
                  }}
                />
              )}
          </div>
        </div>
        <div
          style={{ backgroundColor: colors?.corFundo ? colors?.corFundo : "" }}
          class="bg-black md:pt-[46px] pt-[35px] pb-0 px-0"
        >
          <div class="container">
            <div class="row">
              <div class="w-full">
                <div class="flex flex-wrap justify-between p-[15px] md:pt-0 md:pb-4 md:px-0">
                  <div class="md:w-[36%] w-full p-0">
                    <div class="mb-[30px]">
                      {duvidas.title &&
                        (
                          <h6
                            style={{
                              color: colors?.corTexto ? colors?.corTexto : "",
                            }}
                            class="flex items-center justify-between text-white font-bold tracking-[0.9px] pt-0 pb-[30px] px-0"
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: duvidas.title,
                              }}
                            >
                            </span>
                          </h6>
                        )}
                      <ul class="mb-8">
                        {duvidas?.items && duvidas?.items.map((item) => {
                          return (
                            <li class="flex items-center pt-0 pb-3.5 px-0">
                              <span
                                dangerouslySetInnerHTML={{ __html: item.text }}
                                style={{
                                  color: colors?.corTexto
                                    ? colors?.corTexto
                                    : "",
                                }}
                                class="text-xs leading-[14px] text-white no-underline tracking-[0.3px]"
                              >
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      {orcamentos.title &&
                        (
                          <h6
                            style={{
                              color: colors?.corTexto ? colors?.corTexto : "",
                            }}
                            class="flex items-center justify-between text-white font-bold tracking-[0.9px] pt-0 pb-[30px] px-0"
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: orcamentos.title,
                              }}
                            >
                            </span>
                          </h6>
                        )}
                      <ul class="mb-8">
                        {orcamentos?.items && orcamentos?.items.map((item) => {
                          return (
                            <li class="flex items-center pt-0 pb-3.5 px-0">
                              <span
                                style={{
                                  color: colors?.corTexto
                                    ? colors?.corTexto
                                    : "",
                                }}
                                dangerouslySetInnerHTML={{ __html: item.text }}
                                class="text-xs leading-[14px] text-white no-underline tracking-[0.3px]"
                              >
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div class="md:w-[64%] w-full">
                    <div class="md:flex block justify-between m-0 md:pl-[41px] p-0 pr-0 py-0">
                      <div class="relative">
                        <h6
                          style={{
                            color: colors?.corTexto ? colors?.corTexto : "",
                          }}
                          class="flex items-center justify-between text-white font-bold tracking-[0.9px] pt-0 pb-[30px] px-0"
                        >
                          <span>Minha conta</span>
                        </h6>
                        <ul class="mb-8">
                          <li class="flex items-center pt-0 pb-3.5 px-0">
                            <a
                              style={{
                                color: colors?.corTexto ? colors?.corTexto : "",
                              }}
                              class="text-xs leading-[14px] text-white no-underline tracking-[0.3px]"
                              href="/account/profile"
                            >
                              Meus Dados
                            </a>
                          </li>
                          <li class="flex items-center pt-0 pb-3.5 px-0">
                            <a
                              style={{
                                color: colors?.corTexto ? colors?.corTexto : "",
                              }}
                              class="text-xs leading-[14px] text-white no-underline tracking-[0.3px]"
                              href="/account/orders"
                            >
                              Meus Pedidos
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="relative">
                        {politicas.title &&
                          (
                            <h6
                              style={{
                                color: colors?.corTexto ? colors?.corTexto : "",
                              }}
                              class="flex items-center justify-between text-white font-bold tracking-[0.9px] pt-0 pb-[30px] px-0"
                            >
                              <span>{politicas.title}</span>
                            </h6>
                          )}
                        <ul class="mb-8">
                          {politicas?.items && politicas?.items.map((item) => {
                            return (
                              <li class="flex items-center pt-0 pb-3.5 px-0">
                                <a
                                  style={{
                                    color: colors?.corTexto
                                      ? colors?.corTexto
                                      : "",
                                  }}
                                  class="text-xs leading-[14px] text-white no-underline tracking-[0.3px]"
                                  href={item.link}
                                  itemprop="url"
                                  title={item.text}
                                  dangerouslySetInnerHTML={{
                                    __html: item.text,
                                  }}
                                >
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div class="relative">
                        {institucional.title &&
                          (
                            <h6
                              style={{
                                color: colors?.corTexto ? colors?.corTexto : "",
                              }}
                              class="flex items-center justify-between text-white font-bold tracking-[0.9px] pt-0 pb-[30px] px-0"
                            >
                              <span>{institucional.title}</span>
                            </h6>
                          )}
                        <ul class="mb-8">
                          {institucional?.items &&
                            institucional?.items.map((item) => {
                              return (
                                <li class="flex items-center pt-0 pb-3.5 px-0">
                                  <a
                                    style={{
                                      color: colors?.corTexto
                                        ? colors?.corTexto
                                        : "",
                                    }}
                                    class="text-xs leading-[14px] text-white no-underline tracking-[0.3px]"
                                    href={item.link}
                                    itemprop="url"
                                    title={item.text}
                                    dangerouslySetInnerHTML={{
                                      __html: item.text,
                                    }}
                                  >
                                  </a>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-black py-[15px] px-0">
          <div class="container">
            <div class="row">
              <div class="flex justify-between items-center md:flex-row flex-col">
                <div class="footer-logos-payment">
                  <h6
                    style={{ color: colors?.corTexto ? colors?.corTexto : "" }}
                    class="md:hidden flex items-center justify-center md:justify-between text-white font-bold tracking-[0.9px] pt-0 pb-[30px] px-0"
                  >
                    {payments?.title &&
                      <span>{payments?.title}</span>}
                  </h6>
                  <div class="list__items pb-[30px] md:pb-0">
                    <ul>
                      {payments?.items.map((item) => {
                        return (
                          <li
                            style={{
                              color: colors?.corTexto ? colors?.corTexto : "",
                            }}
                            key={item.label}
                            class="text-white inline-block mr-[15px] md:mr-[25px]"
                          >
                            <Icon
                              width={48}
                              height={32}
                              strokeWidth={1}
                              id={item.label}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div class="footer-logos-certified">
                  <h6 class="md:hidden flex items-center justify-center md:justify-between text-white font-bold tracking-[0.9px] pt-0 pb-[30px] px-0">
                    <span>Segurança</span>
                  </h6>
                  <div class="list__items">
                    <ul class="flex md:flex-wrap items-center justify-center">
                      <li class="my-0 mx-[10px]">
                        <a href="https://secure.vtex.com/?an=palaciodasferramentas">
                          <Image
                            class="inline-block align-top max-w-full h-auto"
                            src="https://palaciodasferramentas.vteximg.com.br/arquivos/vtex-pci.png"
                            width={92}
                            height={58}
                            loading={"lazy"}
                            alt="Logo VTEX PCI"
                          />
                        </a>
                      </li>
                      <li class="my-0 mx-[10px]">
                        <a href="https://encurtador.com.br/aswPU">
                          <Image
                            class="inline-block align-top max-w-full h-auto"
                            src="https://palaciodasferramentas.vteximg.com.br/arquivos/googleavalia.png"
                            width={108}
                            height={71}
                            loading={"lazy"}
                            alt="Google Avaliação"
                          />
                        </a>
                      </li>
                      <li class="my-0 mx-[10px]">
                        <a
                          id="seloEbit"
                          href="http://www.ebit.com.br/112991/selo"
                          target="_blank"
                          title="Avaliado pelos consumidores"
                          style="display: block; overflow: hidden; position: relative;"
                        >
                          <Image
                            class="inline-block align-top max-w-full h-auto"
                            src="https://newimgebit-a.akamaihd.net/ebitBR/selo/img_112991.png"
                            width={70}
                            height={95}
                            loading={"lazy"}
                          />
                        </a>
                        {
                          /* <script
                          type="text/javascript"
                          id="getSelo"
                          src="https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?112991"
                        >
                        </script> */
                        }
                      </li>

                      <li class="my-0 mx-[10px]">
                        <a
                          id="seloEconfy"
                          href="https://confi.com.vc/lojas-confiaveis/detalhes?id=2000957"
                          target="_blank"
                        >
                          <Image
                            class="inline-block align-top max-w-full h-auto"
                            src="https://cdn.confi.com.vc/reputation/2000957.png"
                            width={95}
                            height={95}
                            loading={"lazy"}
                          />
                        </a>
                        {
                          /* <script
                          type="text/javascript"
                          id="getData"
                          src="https://cdn.confi.com.vc/scripts/getData.js?sellerId=2000957"
                        >
                        </script> */
                        }
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="social-icons">
                  <h6
                    style={{ color: colors?.corTexto ? colors?.corTexto : "" }}
                    class="md:hidden flex items-center justify-center md:justify-between text-white font-bold tracking-[0.9px] pt-0 pb-[30px] px-0"
                  >
                    {socials?.title &&
                      <span>{socials?.title}</span>}
                  </h6>
                  <ul class="flex flex-wrap text-center justify-center">
                    {socials?.items && socials?.items.map((item) => {
                      return (
                        <li class="py-0 px-[7px]" key={item.label}>
                          <a
                            class="flex max-w-[18px] w-[18px] text-[#F0D02C]"
                            href={item.link}
                            target="_blank"
                          >
                            <Icon
                              width={18}
                              height={18}
                              strokeWidth={1}
                              id={item.label}
                            />
                          </a>
                        </li>
                      );
                    })}
                    <li>
                      <a
                        href="https://pt-br.facebook.com/PalacioDaFerramentaMaquinasLtda/"
                        target="_blank"
                      >
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/palaciodaferramenta/"
                        target="_blank"
                      >
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/channel/UCHgGs_i3D01zMGeOgmB7dNg"
                        target="_blank"
                      >
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://br.linkedin.com/company/palácio-da-ferramenta-máquinas-ltda"
                        target="_blank"
                      >
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class=" bg-black pt-[15px] pb-5 px-0">
          <div class="container">
            <div class="flex flex-wrap items-center justify-center">
              <div class="pt-0 pb-[30px] px-0">
                <p
                  style={{ color: colors?.corTexto ? colors?.corTexto : "" }}
                  class=" text-white text-xs leading-[14px] text-center"
                >
                  Palácio da Ferramenta, Máquinas Ltda
                  <br />
                  Rua Buenos Aires, Nº150/160 – Centro – RJ – CEP: 20070-022 ©
                  <span data-id="current-year">2024</span>
                  Todos dos direitos reservados
                  <br />
                  CNPJ: 42.101.436/0001-17
                </p>
              </div>
              <div class="w-full float-left">
                <ul class="flex flex-wrap items-center m-0 justify-center">
                  <li class="px-[15px] py-0">
                    <div class="flex items-center">
                      <span
                        style={{
                          color: colors?.corTexto ? colors?.corTexto : "",
                        }}
                        class="text-white text-[11px] px-1.5 py-0"
                      >
                        Created by
                      </span>
                      <a href="https://instagram.com/caio.nogueira.509">
                        <img
                          class="inline-block align-top max-w-full h-auto"
                          src="/image/logo-sword.png"
                          width={140}
                          height={140}
                          loading={"lazy"}
                        />
                      </a>
                    </div>
                  </li>
                  <li class="px-[15px] py-0">
                    <div class="flex items-center">
                      <span
                        style={{
                          color: colors?.corTexto ? colors?.corTexto : "",
                        }}
                        class="text-white text-[11px] px-1.5 py-0"
                      >
                        Powered by
                      </span>
                      <a href="https://vtex.com">
                        <img
                          class="inline-block align-top max-w-full h-auto"
                          src="https://palaciodasferramentas.vteximg.com.br/arquivos/logo-vtex.svg"
                          width={60}
                          height={22}
                          loading={"lazy"}
                        />
                      </a>
                      <a class="ml-3" href="https://deco.cx">
                        <img
                          class="inline-block max-w-[70px] align-top h-auto"
                          src={"/image/logo-deco.png"}
                          width={180}
                          height={40}
                          loading={"lazy"}
                        />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
