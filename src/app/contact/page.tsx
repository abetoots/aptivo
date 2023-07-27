import UnderConstructionSvg from "@/assets/under-construction.svg";

export default function ContactPage() {
  return (
    <section className="h-full bg-slate-300">
      <div className="mr-10">
        <h1 className="text-4xl font-bold">
          This page is
          <br />
          <span className="text-[3rem] font-extrabold uppercase">
            under construction
          </span>
        </h1>
      </div>
      <div className="mx-auto w-1/2">
        <UnderConstructionSvg />
      </div>
    </section>
  );
}
