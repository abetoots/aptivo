import { Button } from "@/components/ui/button";
import { InputLine } from "@/components/ui/input";
import { TextAreaLine } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <section className="h-full p-10">
      <div className="rounded-lg p-10">
        <h1 className="mb-6 font-heading text-5xl">Get in touch</h1>
        <form>
          <InputLine placeholder="Your name" className="mb-6" />
          <InputLine
            placeholder="you@yourcompany.com"
            type="email"
            className="mb-6"
          />
          <TextAreaLine placeholder="Your message" className="mb-6" />
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
}
