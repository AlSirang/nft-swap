import { GithubIcon } from "@/svgIcons";

export const Footer = () => {
  return (
    <footer className="pt-20 pb-4">
      <hr />

      <div className="max-w-7xl m-auto px-5 py-4">
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
            className="text-white flex text-lg items-center gap-2 hover:underline"
          >
            <GithubIcon /> <span>AlSirang</span>
          </a>
        </div>

        <div className="text-center">
          <p className="text-lg">Copyright &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};
