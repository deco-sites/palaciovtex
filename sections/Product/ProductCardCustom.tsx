export { default } from "$store/components/product/ProductCardCustom.tsx";

export function LoadingFallback() {
  // Renderize spinners, esqueletos e outros espaços reservados
  return <div class="skeleton w-full h-[570px] mb-3 bg-[#c2c2c2]"></div>;
}
