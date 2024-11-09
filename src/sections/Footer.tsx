import Logo from "@/assets/logo.svg";
import XSocial from "@/assets/social-x.svg"
import XInsta from "@/assets/social-instagram.svg"
import XYoutube from "@/assets/social-youtube.svg"

export const Footer = () => {
  return (
    <footer className="py-5 border-t border-white/15">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">

          <div className="flex gap-2 items-center lg:flex-1">
            <Logo className="size-6" />
            <div className="font-medium">AI Startup Landing Page</div>
          </div>
          
          <nav className="flex flex-col lg:flex-row gap-5 lg:gap-7 lg:flex-1 lg:justify-center">
            <a href="#" className="text-white/70 text-xs md:text-sm  hover:text-white transition">Features</a>
            <a href="#" className="text-white/70 text-xs md:text-sm  hover:text-white transition">Develpers</a>
            <a href="#" className="text-white/70 text-xs md:text-sm  hover:text-white transition">Company</a>
            <a href="#" className="text-white/70 text-xs md:text-sm  hover:text-white transition">Blog</a>
            <a href="#" className="text-white/70 text-xs md:text-sm  hover:text-white transition">ChangeBlog</a>
          </nav>
          
          <div className="flex gap-5 lg:flex-1 lg:justify-end">
            <XSocial className="text-white/40 hover:text-white transition" />
            <XInsta className="text-white/40 hover:text-white transition"/>
            <XYoutube className="text-white/40 hover:text-white transition"/>
          </div>

        </div>
      </div>
    </footer>
  );
};
