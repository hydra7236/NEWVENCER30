import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, School, Trophy, CheckCircle, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    event: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Your actual Google Apps Script Web App URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbwnU3NIAco_E2XUwajf2LUr_AhXtH_SUYTSVySapheran1Ffy9PfSdBUT4J5N8bc_x8/exec";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const id = Date.now().toString();
    setRegistrationId(id);

    try {
      // Sending data to Google Apps Script
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script if not handling CORS
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          ...formData, 
          registrationId: id,
          timestamp: new Date().toISOString()
        }),
      });

      setIsRegistered(true);
      toast.success("Registration Successful!", {
        description: "Your data has been saved and digital pass generated.",
      });
    } catch (error) {
      console.error("Error!", error);
      toast.error("Submission failed. Please check your connection.");
      // Even if fetch fails (due to CORS in some cases), we can still show the QR
      // but usually we want to confirm data saving first.
      // For this demo, let's allow pass generation anyway if you want
      // setIsRegistered(true); 
    } finally {
      setIsLoading(false);
    }
  };

  const qrData = `VENCER2026\nID: ${registrationId}\nName: ${formData.name}\nEvent: ${formData.event}`;

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `VENCER_Pass_${formData.name}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-fest-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg z-10"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-glow-teal mb-4 uppercase">
            Pass <span className="text-white">Registration</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto font-body">
            Fill in your details to generate your digital entry pass for VENCER 2K26.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isRegistered ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-pandora border-primary/20 shadow-[0_0_40px_rgba(0,247,255,0.1)]">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center gap-2 uppercase tracking-wider font-display">
                    <CheckCircle className="w-5 h-5 text-primary" /> Details
                  </CardTitle>
                  <CardDescription className="font-body">Enter your credentials below</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="relative group">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="name"
                        placeholder="Full Name"
                        className="pl-10 bg-black/40 border-primary/20 focus:border-primary/50 font-body"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        className="pl-10 bg-black/40 border-primary/20 focus:border-primary/50 font-body"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="relative group">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="phone"
                        placeholder="Phone Number"
                        className="pl-10 bg-black/40 border-primary/20 focus:border-primary/50 font-body"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="relative group">
                      <School className="absolute left-3 top-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="college"
                        placeholder="College Name"
                        className="pl-10 bg-black/40 border-primary/20 focus:border-primary/50 font-body"
                        value={formData.college}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="relative group">
                      <Trophy className="absolute left-3 top-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="event"
                        placeholder="Event Name"
                        className="pl-10 bg-black/40 border-primary/20 focus:border-primary/50 font-body"
                        value={formData.event}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-primary hover:bg-primary/80 text-black font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,247,255,0.4)] transition-all duration-300 font-display"
                    >
                      {isLoading ? "Generating..." : "Generate Pass"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="pass"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <Card className="glass-pandora border-primary/30 shadow-[0_0_50px_rgba(0,247,255,0.2)] overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary via-fest-purple to-primary" />
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-2 shadow-[0_0_20px_rgba(0,247,255,0.2)] mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl text-primary font-bold tracking-tight uppercase font-display">REGISTRATION CONFIRMED</CardTitle>
                  <CardDescription className="font-body">Screenshot this pass or download it below</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="p-4 bg-white rounded-xl shadow-inner mb-6 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <QRCodeSVG
                      id="qr-code-svg"
                      value={qrData}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <div className="w-full space-y-3 px-4">
                    <div className="flex justify-between border-b border-primary/20 pb-2">
                      <span className="text-muted-foreground text-xs uppercase tracking-widest font-body">Registrant</span>
                      <span className="text-white font-bold font-body">{formData.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-primary/20 pb-2">
                      <span className="text-muted-foreground text-xs uppercase tracking-widest font-body">Event</span>
                      <span className="text-white font-bold font-body">{formData.event}</span>
                    </div>
                    <div className="flex justify-between border-b border-primary/20 pb-2">
                      <span className="text-muted-foreground text-xs uppercase tracking-widest font-body">ID</span>
                      <span className="text-primary font-mono text-xs">{registrationId}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 pb-8">
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <Button
                      onClick={downloadQR}
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary/10 flex items-center gap-2 font-display"
                    >
                      <Download className="w-4 h-4" /> Download
                    </Button>
                    <Button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'VENCER 2K26 Digital Pass',
                            text: `My registration for ${formData.event} is confirmed!`,
                            url: window.location.href,
                          });
                        } else {
                          toast.info("Sharing not supported on this browser");
                        }
                      }}
                      variant="outline"
                      className="border-fest-purple/50 text-fest-purple hover:bg-fest-purple/10 flex items-center gap-2 font-display"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setIsRegistered(false)}
                    className="text-muted-foreground text-xs hover:text-white font-body"
                  >
                    New Registration
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Registration;
