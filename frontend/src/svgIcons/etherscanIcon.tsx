export const EtherscanIcon = ({ light }: { light?: boolean }) => {
  const src = light ? "/icons/etherscan-light.svg" : "/icons/etherscan.svg";
  return (
    <picture>
      <img src={src} alt="etherscan icon" className="w-6 h-6" />
    </picture>
  );
};
