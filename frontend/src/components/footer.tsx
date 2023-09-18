import { GithubIcon } from "@/svgIcons";

export const Footer = () => {
  return (
    <footer className="pt-10 pb-2">
      <div className="max-w-[105rem] m-auto border border-gray-500" />

      <div className="max-w-[100rem] m-auto px-5 pt-3 pb-5">
        <div className="flex justify-between items-center">
          <p className="text-lg italic">
            Copyright &copy; {new Date().getFullYear()}
          </p>
          <a
            href="https://github.com/alsirang"
            target="_blank"
            className="text-white flex text-lg items-center gap-2 hover:underline italic"
          >
            <GithubIcon /> <span>AlSirang</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
