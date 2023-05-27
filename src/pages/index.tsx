/* eslint-disable @typescript-eslint/ban-ts-comment */
//Components
import Head from "next/head";
import Header from "~/components/Header";
import Particles from "react-particles";

//Misc
import { loadFull } from "tsparticles";
import { loadPolygonPath } from "tsparticles-path-polygon";

import NasaConfig from "~/particles-nasa.json";

//Types
import { type NextPage } from "next";
import { useCallback } from "react";
import type {
  Container,
  Engine,
  IOptions,
  RecursivePartial,
} from "tsparticles-engine";
import useHackerEffect from "~/lib/hooks/useHackerEffect";
import useBlobEffect, { BlobStyles } from "~/lib/hooks/useBlobEffect";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/Button";
import Link from "next/link";

const Home: NextPage = () => {
  const { screenRef, textRef } = useHackerEffect();
  const { blobRef } = useBlobEffect("var(--blob-gradient)");

  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    loadPolygonPath(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      return new Promise<void>((resolve) => {
        console.log(container);
        resolve();
      });
    },
    []
  );

  return (
    <>
      <BlobStyles />
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <Head>
          <title>Aptivo | Automate Digital Marketing</title>
          <meta
            name="description"
            content="Aptivo is a digital marketing automation platform that helps you create and manage your digital marketing campaigns."
          />
        </Head>
        <Header className="z-10">
          <div className="ml-auto ">
            <nav className="flex items-center gap-6">
              <Link href="/features">Features</Link>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "accent" }))}
              >
                Login
              </Link>
            </nav>
          </div>
        </Header>
        <main className="flex-1 snap-y snap-mandatory scroll-smooth">
          {/* @ts-ignore */}
          <div ref={blobRef}></div>
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={NasaConfig as RecursivePartial<IOptions>}
          />
          {/* @ts-ignore */}
          <div ref={screenRef} className="z-10 mt-60 p-6">
            <h1 className="mb-6 cursor-default text-3xl font-semibold uppercase md:text-6xl lg:text-9xl">
              Your Business.{" "}
              <span ref={textRef} data-value="Revolutionized">
                Revolutionized
              </span>
            </h1>
            <p className="text-gray-500 md:text-lg lg:text-xl">
              Igniting succcess, one innovation at a time
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
