import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import { User, Mail, Phone, School, Trophy, CheckCircle, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { branches, culturalEvents, gamingEvents } from "@/data/events";

const eventPrices: Record<string, number> = {
  // AI&DS
  "Pandora Logic Wars": 200, "Data Dash": 150, "AI Quiz": 100, "Prompt Wars": 120, "ML Model Showdown": 200, "Data Visualization Duel": 150,
  // CSE
  "Bug Crush": 100, "Code Meme": 50, "Hack The Hunt": 200, "Idea Canvas": 150, "Box Cricket": 100, "Lagori": 80, "Slow Bike Race": 50, "Photography": 100, "Videography": 150,
  // MECH
  "Robo Wars": 300, "CAD Challenge": 150, "Bridge Building": 120, "Auto Expo": 100, "Engine Assembly Race": 200, "3D Printing Showdown": 250,
  // CIVIL
  "Design Doodle Studio": 100, "Pictogram X": 80, "The Messy Masterpiece": 120, "Battle of Legends": 150,
  // ECE
  "Thinker CAD": 150, "Treasure Hunt": 100, "One Minute Games": 50, "Meme Making": 50, "Tug of War": 80, "Pani Puri": 50, "Fun Junction": 70,
  // EEE
  "Power Play": 120, "Electro Quiz": 100, "Wire It Up": 150, "Motor Design Challenge": 200, "Renewable Energy Pitch": 180,
  // ROBO
  "Line Follower Challenge": 200, "Robo Soccer": 250, "Pick & Place Bot": 220, "Robo Quiz": 100, "Maze Solver Bot": 200, "Humanoid Challenge": 300,
  // BCA
  "App Dev Sprint": 150, "Debug Relay": 100, "IT Quiz": 80, "Database Design Duel": 120, "Full Stack Blitz": 200, "Cyber Security Basics": 100,
  // Cultural (General)
  "Singing": 200, "Dance": 200, "Mr & Miss Vencer": 300,
  // Testing
  "Test Event (Free)": 0
};

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    event: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [searchParams] = useSearchParams();
  const scriptURL = "https://script.google.com/macros/s/AKfycbwV-aydGCnSCARehqd2OrJmAFJyjsJIy13ksJDOKyZdHNWSsgAa4i9vfnAr4ycoUReoVg/exec";
  const qrLink = `${scriptURL}?id=${registrationId}`;

  useEffect(() => {
    const eventParam = searchParams.get("event");
    const deptParam = searchParams.get("dept");
    if (eventParam && deptParam) {
      setFormData(prev => ({
        ...prev,
        event: decodeURIComponent(eventParam),
        department: decodeURIComponent(deptParam)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (isRegistered && registrationId) {
      const tryGenerate = (retryCount = 0) => {
        const QRCode = (window as any).QRCode;
        const canvas = qrCanvasRef.current || document.getElementById("qr");
        
        if (QRCode && QRCode.toCanvas && canvas) {
          QRCode.toCanvas(canvas, registrationId, {
            width: 200,
            margin: 1,
            color: {
              dark: '#000000', // Black for best scanability
              light: '#ffffff',
            }
          }, (error: any) => {
            if (error) console.error("QR Error:", error);
          });
        } else if (retryCount < 10) {
          // Retry every 200ms if not ready yet (e.g. during animation)
          setTimeout(() => tryGenerate(retryCount + 1), 200);
        }
      };
      
      tryGenerate();
    }
  }, [isRegistered, registrationId]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string, id: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [id]: value,
      ...(id === "department" ? { event: "" } : {}) 
    }));
  };

  const getAvailableEvents = () => {
    if (!formData.department) return [];
    
    if (formData.department === "General Cultural") return culturalEvents;
    if (formData.department === "General Gaming") return gamingEvents;
    if (formData.department === "Testing Mode") return [{ title: "Test Event (Free)", category: "Debug" }];
    
    const branch = branches.find(b => b.name === formData.department);
    if (branch) {
      return [...branch.events, ...branch.culturalEvents, ...branch.gamingEvents];
    }
    return [];
  };

  const availableEvents = getAvailableEvents();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.college || !formData.event) {
      toast.error("Please fill in all details.");
      return;
    }

    setIsLoading(true);

    const price = eventPrices[formData.event] || 0;

    // 🔥 TEMPORARY TEST BYPASS: Skip Razorpay for testing
    const bypassPayment = true; 

    if (price === 0 || bypassPayment) {
      // Success Logic for Testing/Free
      const userId = "VENCER-TEST-" + Date.now();
      setRegistrationId(userId);
      setPaymentId("TEST_PAYMENT_ID");

      try {
        await fetch(scriptURL, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            id: userId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            college: formData.college,
            department: formData.department,
            event: formData.event,
            payment_id: "TEST_MODE"
          }),
        });
      } catch (e) { console.error(e); }

      setIsRegistered(true);
      alert("✅ Test Flow: Pass Generated!");
      setIsLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_SVX9TXCQlPwWoh",
      amount: price * 100, // Amount in paise
      currency: "INR",
      name: "VENCER 2K26",
      description: `Registration for ${formData.event}`,
      handler: async function (response: any) {
        const userId = "VENCER-" + Date.now();
        setRegistrationId(userId);
        setPaymentId(response.razorpay_payment_id);

        const data = {
          id: userId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          department: formData.department,
          event: formData.event,
          payment_id: response.razorpay_payment_id
        };

        // Save to Google Sheet
        try {
          await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(data)
          });
        } catch (e) {
          console.error("Sheet update failed", e);
        }

        setIsRegistered(true);
        alert("✅ Pass Generated Successfully!");
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#00F7FF",
      },
      modal: {
        ondismiss: function() {
          setIsLoading(false);
          toast.info("Payment cancelled.");
        }
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: 'Best Methods',
              instruments: [
                {
                  method: 'upi'
                }
              ]
            }
          },
          sequence: ['block.banks'],
          preferences: {
            show_default_blocks: true
          }
        }
      }
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay fail:", err);
      toast.error("Payment failed to initialize.");
      setIsLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCanvasRef.current) return;
    const pngFile = qrCanvasRef.current.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `VENCER_Pass_${formData.name}.png`;
    downloadLink.href = pngFile;
    downloadLink.click();
  };

  const handleShare = async () => {
    const passElement = document.getElementById("pass");
    if (!passElement) return;

    try {
      setIsLoading(true);
      toast.info("Preparing your pass for sharing...");
      
      const canvas = await html2canvas(passElement, {
        scale: 2,
        backgroundColor: "#030712",
        useCORS: true,
      });

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      
      if (blob && navigator.share) {
        const file = new File([blob], `VENCER_Pass_${formData.name}.png`, { type: 'image/png' });
        
        await navigator.share({
          files: [file],
          title: 'VENCER 2K26 Pass',
          text: `I'm attending VENCER 2K26! Here's my pass for ${formData.event}. Join me at AITM Belagavi!`
        });
        toast.success("Shared successfully!");
      } else {
        // Fallback for desktop or unsupported browsers
        downloadQR();
        toast.info("Sharing not supported. Pass downloaded instead!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      toast.error("Could not capture the pass.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 flex flex-col items-center justify-center bg-background relative overflow-hidden">
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
                        autoComplete="name"
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
                        autoComplete="email"
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
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
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
                      <School className="absolute left-3 top-3 z-[150] w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Select 
                        value={formData.department} 
                        onValueChange={(val) => handleSelectChange(val, "department")}
                      >
                        <SelectTrigger className="pl-10 bg-black/40 border-primary/20 focus:border-primary/50 font-body">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent className="glass-pandora border-primary/20 text-white z-[201]">
                          <SelectGroup>
                            <SelectLabel className="text-primary/70">Tribes / Departments</SelectLabel>
                            {branches.map((b) => (
                              <SelectItem key={b.name} value={b.name} className="hover:bg-primary/10">
                                {b.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel className="text-fest-yellow/70">Other Categories</SelectLabel>
                            <SelectItem value="General Cultural">General Cultural</SelectItem>
                            <SelectItem value="General Gaming">General Gaming</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel className="text-destructive/70">Developer Mode</SelectLabel>
                            <SelectItem value="Testing Mode">Enable Testing</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="relative group">
                      <Trophy className="absolute left-3 top-3 z-[150] w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Select 
                        value={formData.event} 
                        onValueChange={(val) => handleSelectChange(val, "event")}
                        disabled={!formData.department}
                      >
                        <SelectTrigger className="pl-10 bg-black/40 border-primary/20 focus:border-primary/50 font-body">
                          <SelectValue placeholder={formData.department ? "Select Event" : "Select Department First"} />
                        </SelectTrigger>
                        <SelectContent className="glass-pandora border-primary/20 text-white z-[201]">
                          <SelectGroup>
                            <SelectLabel className="text-primary/70">Available Events</SelectLabel>
                            {availableEvents.length > 0 ? (
                              availableEvents.map((ev) => (
                                <SelectItem key={ev.title} value={ev.title} className="hover:bg-primary/10">
                                  {ev.title} ({ev.category})
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="none" disabled>No events found</SelectItem>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      id="payBtn"
                      disabled={isLoading}
                      className="w-full bg-primary hover:bg-primary/80 text-black font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,247,255,0.4)] transition-all duration-300 font-display"
                    >
                      {isLoading ? "Generating..." : "Pay & Generate Pass"}
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
              id="pass"
              className="z-50"
            >
              <Card className="glass-pandora border-primary/30 shadow-[0_0_50px_rgba(0,247,255,0.2)] overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary via-fest-purple to-primary" />
                <CardHeader className="text-center pb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-2 shadow-[0_0_20px_rgba(0,247,255,0.2)] mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl text-primary font-bold tracking-tight uppercase font-display">
                    🎟 VENCER 2K26 PASS
                  </CardTitle>
                  <CardDescription className="font-body text-xs text-muted-foreground/80">Digital Access Ticket</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center pt-4">
                  <div className="w-full space-y-4 mb-6">
                    <div className="text-center border-b border-primary/20 pb-2">
                       <p id="p_name" className="text-xl font-bold font-body text-white uppercase tracking-wider">{formData.name}</p>
                       <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1">Registrant</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p id="p_event" className="text-sm font-bold font-body text-primary">{formData.event}</p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">Event</p>
                      </div>
                      <div className="text-center">
                        <p id="p_id" className="text-sm font-mono text-white/90">{registrationId}</p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">Pass ID</p>
                      </div>
                    </div>
                  </div>

                  {/* QR Canvas based on User Request */}
                  <div className="p-3 bg-white rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.1)] relative group overflow-hidden">
                    <canvas id="qr" ref={qrCanvasRef} className="max-w-full h-auto rounded-lg" />
                  </div>

                  <p className="text-[10px] text-muted-foreground mt-6 text-center italic opacity-60">
                    Scan at the venue for quick check-in. Valid for 1 person only.
                  </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pb-8">
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <Button
                      onClick={downloadQR}
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary/10 flex items-center gap-2 font-display text-xs"
                    >
                      <Download className="w-4 h-4" /> Download
                    </Button>
                    <Button
                      onClick={handleShare}
                      variant="outline"
                      className="border-fest-purple/50 text-fest-purple hover:bg-fest-purple/10 flex items-center gap-2 font-display text-xs"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setIsRegistered(false)}
                    className="text-muted-foreground text-xs hover:text-white font-body"
                  >
                    Register for another event
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
