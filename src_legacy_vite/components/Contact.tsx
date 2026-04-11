import { SocialIcon } from "./SocialIcon";

const Contact = () => {
  return (
    <div
      id="contato"
      className="w-screen h-auto scroll-m-16 bg-indigo-950 px-5 pt-10 pb-2 text-white"
    >
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-shadow-violet-500">
          Contato
        </h1>
        <SocialIcon />
        <div>Feito por João Calsavara</div>
      </div>
    </div>
  );
};

export default Contact;
