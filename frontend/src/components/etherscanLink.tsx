import { EtherscanIcon } from "@/svgIcons";
import classNames from "classnames";

const url = "https://sepolia.etherscan.io";

export const EtherscanLink = ({
  path,
  className = "",
  children,
  light = false,
}: {
  path: string;
  children: React.ReactNode;
  className?: string | undefined;
  light?: boolean;
}) => {
  return (
    <a
      href={`${url}/${path}`}
      target="_blank"
      className={classNames(
        className,
        "text-xl font-semibold flex gap-1 items-center"
      )}
    >
      {children}
      <EtherscanIcon light={light} />
    </a>
  );
};
