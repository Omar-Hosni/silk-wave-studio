import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-lg font-medium">Symphony Neuro-Tech</div>
        <div className="flex space-x-6 text-sm">
          <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">
            Home
          </button>
          <button className="hover:text-primary transition-colors">Projects</button>
          <button className="hover:text-primary transition-colors">About</button>
          <button className="text-primary">Contact</button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl">
          {/* Left Section - Heading and Form */}
          <div className="space-y-12">
            <h1 className="text-4xl lg:text-6xl font-light leading-tight">
              Let's create something<br />
              <span className="text-muted-foreground">unforgettable</span>
            </h1>

            <div className="space-y-8">
              <h2 className="text-lg font-medium">Send a message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-muted-foreground">Name</Label>
                    <Input 
                      id="name"
                      className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:border-primary"
                      placeholder=""
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:border-primary"
                      placeholder=""
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm text-muted-foreground">Your message...</Label>
                  <Textarea 
                    id="message"
                    className="bg-transparent border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 resize-none min-h-24 focus:border-primary"
                    placeholder=""
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="outline"
                  className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>

          {/* Right Section - Contact Info */}
          <div className="space-y-8 lg:pt-24">
            <div>
              <h2 className="text-lg font-medium mb-4">Get in touch</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>hi@symphonyneurotech.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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