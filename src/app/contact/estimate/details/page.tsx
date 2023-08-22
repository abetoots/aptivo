"use client";

//Components
import { Icons } from "@/components/icons";
import { notifyError } from "@/components/notifications";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Upload from "@/components/upload/upload";
import { cn } from "@/lib/utils";
import Link from "next/link";

//Misc
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import type { UploadState } from "@/components/upload/upload";

export default function Page() {
  const [linkInput, setLinkInput] = useState<string>("");
  const [links, setLinks] = useState<Array<string>>([]);
  const [files, setFiles] = useState<UploadState[]>([]);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    console.log("data", Object.fromEntries(data));
    //get the other stored items from localstorage
    router.push("/contact/estimate/skills");
  };

  const removeLink = (link: string) => {
    setLinks([...links.filter((l) => l !== link)]);
  };

  return (
    <section className="h-full p-10">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1 className="mb-10 font-heading text-5xl">
          Now let&apos;s get into the basic details of your project.
        </h1>
        <div className="w-[75%]">
          <div className="mb-6">
            <label htmlFor="projectName">
              Project Name <span className="text-red-600">*</span>{" "}
            </label>
            <Input type="text" id="projectName" name="projectName" required />
          </div>
          <div className="mb-6">
            <label htmlFor="projectDescription">
              Your Message <span className="text-red-600">*</span>{" "}
            </label>
            <Textarea
              id="projectDescription"
              name="projectDescription"
              required
              placeholder="Tell us a little about the project"
            />
          </div>
          <div>
            <h2 className="mb-10 font-heading text-2xl">
              Additional Materials
            </h2>
            <div className="mb-10">
              <Upload
                heading="Please send us any additional files we might need"
                afterLabel=""
                state={files}
                stateHandler={(newVal) => setFiles(newVal)}
                maxMb={3}
                accept="image/*,.pdf.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
            </div>
            <div>
              <h3>
                To send us any additional files, you can upload links to your
                content, such as Google Docs or Dropbox.
              </h3>
              <Input
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    try {
                      const validInput = z.string().url().parse(linkInput);
                      setLinks([...links, validInput]);
                      setLinkInput("");
                    } catch {
                      notifyError("Please enter a valid URL");
                    }
                  }
                }}
                className="mb-6"
                placeholder="Paste your link here then press Enter"
              />
              {links.map((link) => {
                return (
                  <div key={link} className="flex text-blue-400">
                    <Icons.close
                      className="mr-2 h-5 w-5"
                      onClick={() => removeLink(link)}
                    />
                    <span className="truncate">{link}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <Link
            href="/contact/estimate/skills"
            className={cn(buttonVariants({ variant: "plain" }), "mr-3")}
          >
            Back ←
          </Link>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
}
