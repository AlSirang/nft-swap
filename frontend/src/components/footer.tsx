import { GithubIcon } from "@/svgIcons";

export const Footer = () => {
  return (
    <footer className="pt-10 pb-2">
      <div className="max-w-[105rem] m-auto">
        <hr />
      </div>

      <div className="max-w-[100rem] m-auto px-5 pt-2">
        <div className="flex justify-between items-center">
          <picture>
            <img
              src="/icons/logo-white.png"
              alt="logo"
              className="max-h-[40px]"
            />
          </picture>

          <a
            href="https://github.com/alsirang"
            target="_blank"
            className="text-white flex text-lg items-center gap-2 hover:underline italic"
          >
            <GithubIcon /> <span>AlSirang</span>
          </a>
        </div>

        <div className="text-center">
          <p className="text-lg italic">
            Copyright &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};
