interface Props {
  src?: string;
}

const runOnMount = () => {
  globalThis.onload = () => {
    const iFrame = document.getElementById(
      "proxy-loader",
    ) as HTMLIFrameElement;
    if (!iFrame) {
      return console.error("Couldn't find iframe");
    }
    globalThis.scrollTo({ top: 0, behavior: 'smooth' });
    iFrame.height = `${iFrame.contentWindow?.document.body.scrollHeight}`;
  };
};

export default function ProxyIframe({ src }: Props) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `(${runOnMount})();` }}>
      </script>
      <iframe
        id="proxy-loader"
        style="width:100%;border:none;overflow:auto; min-height:650px; height:650px; max-height: 650px"
        src={src}
        // onload='javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight+"px";}(this));'
      >
      </iframe>
    </>
  );
}
