import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const navigate = useNavigate();

  // SEO
  useEffect(() => {
    document.title = "Contact | Symphony Neuro-Tech";
    const ensureTag = (selector: string, create: () => HTMLElement) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el as HTMLElement;
    };
    const desc = ensureTag('meta[name="description"]', () => {
      const m = document.createElement('meta');
      m.setAttribute('name', 'description');
      return m;
    }) as HTMLMetaElement;
    desc.setAttribute('content', "Get in touch with Symphony Neuro-Tech. Let's create something unforgettable.");
    const canonical = ensureTag('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    }) as HTMLLinkElement;
    canonical.setAttribute('href', `${window.location.origin}/contact`);
  }, []);

  const FormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    company: z.string().optional(),
    message: z.string().min(10, "Please provide at least 10 characters"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", email: "", company: "", message: "" },
    mode: "onTouched",
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    toast({
      title: "Thanks for reaching out!",
      description: "We'll get back to you shortly.",
    });
    console.log("Contact form:", values);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-lg font-medium">Symphony Neuro-Tech</div>
        <div className="flex space-x-6 text-sm">
          <button
            onClick={() => navigate('/')}
            className="hover:text-primary transition-colors"
          >
            Home
          </button>
          <button className="hover:text-primary transition-colors">Projects</button>
          <button className="hover:text-primary transition-colors">About</button>
          <button className="text-primary">Contact</button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl">
          <section className="space-y-12">
            <h1 className="text-4xl lg:text-6xl font-light leading-tight">
              Let&apos;s create something
              <br />
              <span className="text-muted-foreground">unforgettable</span>
            </h1>

            <article className="space-y-8">
              <h2 className="text-lg font-medium">Send a message</h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-muted-foreground">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder=""
                              className="bg-transparent border-0 border-b border-input rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-muted-foreground">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder=""
                              className="bg-transparent border-0 border-b border-input rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">Company (optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder=""
                            className="bg-transparent border-0 border-b border-input rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-muted-foreground">Your message...</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder=""
                            className="bg-transparent border-0 border-b border-input rounded-none px-0 resize-none min-h-24 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Share a few details about your goals, timeline, or vision.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" variant="outline" className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors">
                    Submit
                  </Button>
                </form>
              </Form>
            </article>
          </section>

          <aside className="space-y-8 lg:pt-24">
            <div>
              <h2 className="text-lg font-medium mb-4">Get in touch</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>hi@symphonyneurotech.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="absolute bottom-6 left-6 right-6 flex justify-between text-xs text-muted-foreground">
        <p>Symphony Neuro-Tech © 2024</p>
        <div className="flex space-x-4">
          <span>Symphony Neuro-Tech Digital Design</span>
          <span>KVK: 12345678</span>
        </div>
      </footer>
    </div>
  );
};

export default Contact;