//Misc
import React, {
  HTMLAttributes,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";

import Gallery from "./gallery/gallery";
//Components
import { cn } from "@/lib/utils";

export type UploadElementConfig = {
  heading: string;
  maxMb?: number;
  accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
  uploadLabel?: string;
  trailingLabel?: string | (() => React.ReactNode);
  afterLabel?: string | (() => React.ReactNode);
  allowMultiple?: boolean;
  overlayText?: string;
  enableGallery?: boolean;
  renderAfter?: () => React.ReactNode;
  required?: boolean;
  headingDescription?: string;
};

export type UploadState = {
  file: File;
  url: string;
};

type UploadProps = UploadElementConfig & {
  state: UploadState[];
  stateHandler: (newState: UploadState[]) => void;
};

//Component API Type: Composable (see Opinions.md)
const Upload = ({
  accept = "image/*",
  uploadLabel = "Upload a file",
  trailingLabel = "or drag and drop",
  maxMb = 10,
  afterLabel = "Sample after text",
  allowMultiple = true,
  overlayText = "Drop files to upload",
  enableGallery = true,
  heading,
  required,
  headingDescription,
  state,
  stateHandler,
  renderAfter,
}: UploadProps) => {
  const id = heading.toLowerCase().replace(/\s/g, "-");

  const uploadInputRef = useRef<HTMLInputElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const addFileInputHandler = (files: FileList | null) => {
    if (!files) {
      return;
    }
    //Return when user doesn't select anything
    if (files.length === 0) {
      return;
    }

    if (maxMb) {
      for (const file of files) {
        if (file.size / 1024 > maxMb * 1024) {
          return alert(`File size cannot be larger than ${maxMb} MB`);
        }
      }
    }

    // if (props.state.preview) {
    //   //TODO link to explanation
    //   //Cleanup the previous preview's file URL as the previous URL is still valid and attackers
    //   //can use that URL to gain access to your file
    //   URL.revokeObjectURL(props.state.preview);
    // }

    let copy = [...state];
    if (allowMultiple) {
      for (const file of files) {
        copy.push({ file, url: URL.createObjectURL(file) });
      }
    } else {
      //Ignore since we already check if files length > 0
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      copy = [{ file: files[0], url: URL.createObjectURL(files[0]) }];
    }

    //Make a state copy then merge new values
    stateHandler(copy);
  };

  const removeItemHandler = (stateItem: UploadState) => {
    let copy = [...state];
    //   //TODO link to explanation
    //Cleanup the previous preview's file URL as the previous URL is still valid and attackers
    //can use that URL to gain access to your file
    URL.revokeObjectURL(stateItem.url);
    copy = copy.filter((item) => item.url !== stateItem.url);
    stateHandler(copy);
  };

  // use to check if a file is being dragged
  const hasFiles = ({
    dataTransfer: { types = [] },
  }: React.DragEvent<HTMLDivElement>) => types.indexOf("Files") > -1;

  // use to drag dragenter and dragleave events.
  // this is to know if the outermost parent is dragged over
  // without issues due to drag events on its children
  const counterRef = useRef(0);

  // only react to actual files being dragged
  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!hasFiles(e)) {
      return;
    }
    ++counterRef.current && setIsDraggedOver(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    1 > --counterRef.current && setIsDraggedOver(false);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (hasFiles(e)) {
      e.preventDefault();
    }
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    addFileInputHandler(e.dataTransfer.files);
    counterRef.current = 0;
    setIsDraggedOver(false);
  };

  return (
    <div
      ref={parentRef}
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
    >
      <div className="mb-2">
        <label htmlFor={id}>
          {heading}
          {required ? <span className="text-red-500">*</span> : null}
        </label>
        <span className="pt-1 text-xs italic text-muted-foreground">
          {headingDescription}
        </span>
      </div>
      <div className="relative">
        <section className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 text-center">
          <div
            className={cn(
              "pointer-events-none absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center rounded-md",
              {
                ["bg-black/20"]: isDraggedOver,
              }
            )}
          >
            <i className={cn("opacity-0", { ["opacity-1"]: isDraggedOver })}>
              <svg
                className="mb-3 h-12 w-12 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
              </svg>
            </i>
            <p
              className={cn("text-lg font-bold opacity-0", {
                ["opacity-1"]: isDraggedOver,
              })}
            >
              {overlayText}
            </p>
          </div>
          <div>
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>{uploadLabel}</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  ref={uploadInputRef}
                  onChange={(e) => addFileInputHandler(e.target.files)}
                  accept={accept}
                  multiple={allowMultiple}
                />
              </label>
              {trailingLabel ? (
                typeof trailingLabel === "function" ? (
                  trailingLabel()
                ) : (
                  <span className="pl-1">{trailingLabel}</span>
                )
              ) : null}
            </div>
            {afterLabel ? (
              typeof afterLabel === "function" ? (
                afterLabel()
              ) : (
                <span className="text-gray-500text-xs text-xs text-gray-500">{`${afterLabel} ${maxMb} MB`}</span>
              )
            ) : null}
          </div>
        </section>
        {enableGallery ? (
          <Gallery items={state} onDelete={removeItemHandler} />
        ) : null}
        {renderAfter ? renderAfter() : null}
      </div>
    </div>
  );
};

export default Upload;
