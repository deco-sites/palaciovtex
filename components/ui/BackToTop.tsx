import Icon from "deco-sites/palaciovtex/components/ui/Icon.tsx";

function BackToTop () {
    return (
        <div class="fixed z-[200] block right-5 bottom-[90px]">
            <a href="#" onClick={() => {globalThis.scroll(0,0)}} id="back-top" class="flex flex-col justify-center items-center w-[50px] h-[52px] bg-black text-white no-underline rounded-[5px]">
                <Icon
                    class="text-[#F0D02C]"
                    width={24}
                    height={16}
                    strokeWidth={1}
                    id={"arrowUpNovo"}
                />
                <span class="text-[9px] text-center uppercase mt-1">
                    Voltar<br /> ao topo
                </span>
            </a>
        
        </div>
    )
}

export default BackToTop;