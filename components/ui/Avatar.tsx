/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "text-base-content ring-1 ring-black rounded-full",
  "disabled": "line-through text-neutral-content",
  "default": "text-base-content bg-base-100",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active:
    "bg-[#F0D02C] border text-black border-solid !border-[#F0D02C] !rounded-[5px]",
  disabled: "text-[#cccbc6] border-[#cccbc6] bg-white !rounded-[5px]",
  default: "border text-black border-solid !border-black !rounded-[5px]",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar-custom">
      <div
        class={`py-3 px-9 btn hover:bg-black hover:text-white uppercase otline-none transition-all text-black h-[40px] ${
          colors[content] ?? colors[variant]
        } ${variants[variant]} `}
      >
        <span class="uppercase ">
          {colors[content] ? "" : content}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
