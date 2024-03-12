interface Props {
  title: string;
}

function InstitucionalTitle({ title }: Props) {
  return (
    <h2
      class="block text-black text-xl font-medium leading-6 uppercase mb-5 pt-0 pb-2.5 px-0 border-b-[#CCCBC6] border-b border-solid"
      dangerouslySetInnerHTML={{ __html: title }}
    >
    </h2>
  );
}

export default InstitucionalTitle;
