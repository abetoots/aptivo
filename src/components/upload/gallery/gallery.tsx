//Components
import Image from "next/image";

//Misc
import React from "react";
import type { UploadState } from "../upload";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type GalleryProps = {
  heading?: string;
  renderHeading?: () => React.ReactNode;
  items: UploadState[];
  onDelete: (item: UploadState) => void;
};

const Gallery = ({
  heading = "To Upload",
  onDelete,
  ...props
}: GalleryProps) => {
  const empty = (
    <li
      className={
        "flex h-full w-full flex-col items-center justify-center text-center"
      }
    >
      <Image
        width={128}
        height={128}
        className="mx-auto w-32"
        src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
        alt="no data"
      />
      <span className="text-sm text-gray-500">No files selected</span>
    </li>
  );
  return (
    <section>
      {props.renderHeading ? (
        props.renderHeading()
      ) : (
        <h4 className="pb-3 pt-6 text-gray-900">{heading}</h4>
      )}
      <ul className="-m-1 flex flex-1 flex-wrap">
        {props.items.length === 0
          ? empty
          : props.items.map((item) => (
              <Template
                fileName={item.file.name}
                fileSize={item.file.size}
                type={item.file.type.match("image.*") ? "image" : "file"}
                url={item.url}
                key={item.file.name}
                onDelete={() => onDelete(item)}
              />
            ))}
      </ul>
    </section>
  );
};

export default Gallery;

type TemplateProps = {
  type: "file" | "image";
  fileName: string;
  fileSize: number;
  url: string;
  onDelete: () => void;
};

const Template = ({
  type,
  fileName,
  fileSize,
  url,
  onDelete,
}: TemplateProps) => {
  let textContent;
  if (fileSize > 1024) {
    if (fileSize > 1048576) {
      textContent = Math.round(fileSize / 1048576).toString() + "mb";
    } else {
      textContent = Math.round(fileSize / 1024).toString() + "kb";
    }
  } else {
    textContent = fileSize.toString() + "b";
  }

  let icon;
  if (type === "file") {
    icon = (
      <svg
        className="ml-auto h-4 w-4 fill-current pt-1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
      </svg>
    );
  } else {
    icon = (
      <svg
        className="pt- ml-auto h-4 w-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
      </svg>
    );
  }
  return (
    <li className="block h-24 w-1/2 p-1 sm:w-1/3 md:w-1/4">
      <div
        tabIndex={0}
        className={cn(
          "relative h-full w-full cursor-pointer rounded-md bg-gray-100 shadow-sm focus:outline-none",
          {
            ['hover:text-color-[#2b6cb0]"']: type === "file",
            ["text-transparent hover:text-white"]: type === "image",
          }
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={fileName}
          src={url}
          className="sticky h-full w-full rounded-md bg-fixed object-cover"
        />

        <section
          className={cn(
            "absolute top-0 z-20 flex h-full w-full flex-col break-words rounded-md px-3 py-2 text-xs",
            { ["bg-color-[rgba(5, 5, 5, 0.4)]"]: type === "image" }
          )}
        >
          <span className="flex-1">{fileName}</span>
          <div className="flex flex-wrap-reverse">
            <span className={cn("p-1", { "text-blue-800": type === "file" })}>
              <i>{icon}</i>
            </span>
            <span
              className={cn("p-1 text-xs", {
                "text-gray-700": type === "file",
              })}
            >
              {textContent}
            </span>
            <Button
              className={cn(
                "ml-auto rounded-md border-none p-1 hover:bg-destructive focus:outline-none",
                { "text-gray-800": type === "file" }
              )}
              variant={"plain"}
              onClick={() => onDelete()}
            >
              <svg
                className="pointer-events-none ml-auto h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  className="pointer-events-none"
                  d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                />
              </svg>
            </Button>
          </div>
        </section>
      </div>
    </li>
  );
};
