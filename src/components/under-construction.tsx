import UnderConstructionSvg from "@/assets/under-construction.svg";

export const UnderConstruction = () => {
  return (
    <section>
      <div>
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
};
