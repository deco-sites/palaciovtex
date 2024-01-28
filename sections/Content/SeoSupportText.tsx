export interface Props {
  title: string;
  description: string;
  textFinal: string;
}

export default function SeoSupportText(
  { title, description, textFinal }: Props,
) {
  return (
    <div class="container mb-[40px]">
      <div class="border md:p-10 pt-[30px] pb-[55px] px-[15px] rounded-[5px] border-solid border-[#A6A5A1]">
        <h2 class="font-medium text-center uppercase text-xl mt-0 mb-5 mx-0">
          {title}
        </h2>
        <p
          class="text-center text-[15px] leading-[30px]"
          dangerouslySetInnerHTML={{ __html: description }}
        >
        </p>
        <p
          class="text-center text-[15px] leading-[30px]"
          dangerouslySetInnerHTML={{ __html: textFinal }}
        >
        </p>
      </div>
    </div>
  );
}
