import { useId } from "$store/sdk/useId.ts";

export interface Props {
  alerts?: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
}

function Alert({ alerts = [] }: Props) {
  const id = useId();

  return (
    <div class="flex flex-row gap-2" id={id}>
      {alerts.map((alert, index) => (
        <span
          key={index}
          class="text-black flex justify-center items-center text-xs leading-[14px]"
        >
          {alert}
        </span>
      ))}
    </div>
  );
}

export default Alert;
