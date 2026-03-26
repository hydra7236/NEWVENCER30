import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Camera, LogOut, CheckCircle, RefreshCcw, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

const AdminScanner = () => {
  const [scannedId, setScannedId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const navigate = useNavigate();

  // REPLACE WITH YOUR ACTUAL GOOGLE APPS SCRIPT WEB APP URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbwV-aydGCnSCARehqd2OrJmAFJyjsJIy13ksJDOKyZdHNWSsgAa4i9vfnAr4ycoUReoVg/exec";

  useEffect(() => {
    // Check if logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/admin/login");
      return;
    }

    // Initialize Scanner after component mount
    const scanner = new Html5QrcodeScanner(
      "reader", 
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      }, 
      /* verbose= */ false
    );

    const onScanSuccess = (decodedText: string) => {
      setScannedId(decodedText);
      toast.success("ID Detected: " + decodedText);
      // Pause scanner if success
      scanner.clear();
    };

    const onScanFailure = (error: any) => {
      // Ignore failures
    };

    scanner.render(onScanSuccess, onScanFailure);
    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Scanner clear failed", err));
      }
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast.info("Logged Out");
    navigate("/");
  };

  const markAttendance = async () => {
    if (!scannedId) return;

    setIsProcessing(true);
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          type: "attendance",
          id: scannedId,
          timestamp: new Date().toISOString()
        }),
      });
      
      toast.success("Attendance marked successfully!");
      setScannedId(null);
      // Restart scanner
      window.location.reload(); 
    } catch (error) {
      console.error("Attendance mark failed", error);
      toast.error("Failed to mark attendance. Check connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-12">
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-fest-purple/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="container pt-12 pb-6 flex items-center justify-between relative z-20 px-4">
        <h1 className="font-display text-xl text-glow-teal font-bold uppercase tracking-widest flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Vencer Admin
        </h1>
        <div className="flex items-center gap-2 pt-8 sm:pt-0">
          <Button 
            onClick={() => navigate("/admin/dashboard")} 
            variant="outline" 
            className="text-[10px] uppercase font-bold tracking-widest border-primary/30 text-primary hover:bg-primary/10"
          >
            Dashboard
          </Button>
          <Button 
            onClick={handleLogout} 
            variant="destructive" 
            className="text-[10px] uppercase font-bold tracking-widest h-9 px-3 flex items-center gap-2 bg-destructive text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container max-w-lg mx-auto relative z-20 px-4">
        <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
          <Card className="glass-pandora border-primary/20 shadow-[0_0_40px_rgba(0,247,255,0.1)]">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-display uppercase tracking-wider text-primary">Attendance Scanner</CardTitle>
              <CardDescription className="font-body">Scan the QR code on the participant pass</CardDescription>
            </CardHeader>
            <CardContent>
              {!scannedId ? (
                <div id="reader" className="overflow-hidden rounded-2xl border-2 border-primary/20 bg-black/40 shadow-inner"></div>
              ) : (
                <div className="flex flex-col items-center py-8 space-y-6">
                  <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center animate-pulse">
                    <UserCheck className="text-primary w-10 h-10" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-body">Scanned Pass ID</p>
                    <h3 className="text-2xl font-mono text-white font-bold">{scannedId}</h3>
                  </div>
                  
                  <div className="w-full space-y-3">
                    <Button 
                      onClick={markAttendance} 
                      disabled={isProcessing}
                      className="w-full bg-primary hover:bg-primary/80 text-black font-bold uppercase tracking-widest h-12 shadow-[0_0_20px_rgba(0,247,255,0.3)] transition-all"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                          Marking...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Attendance
                        </>
                      )}
                    </Button>
                    <Button 
                      onClick={() => setScannedId(null)} 
                      variant="ghost" 
                      className="w-full text-muted-foreground"
                    >
                      Scan Another
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col pb-6 opacity-60">
               <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-body text-center">
                 AITM BELAGAVI | VENCER 2K26 MANAGEMENT
               </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      <style>{`
        #reader { border: none !important; }
        #reader__status_span { display: none !important; }
        #reader__scan_region { background: #000; display: flex; align-items: center; justify-content: center; }
        #reader__camera_selection { background: #1a1a1a; border: 1px solid #333; color: white; padding: 5px; border-radius: 5px; width: 100%; margin: 10px 0; }
        #reader__dashboard_section_csr button { background: #00f7ff; color: black; font-weight: bold; padding: 8px 15px; border-radius: 5px; font-family: inherit; font-size: 12px; margin-top: 10px; }
      `}</style>
    </div>
  );
};

export default AdminScanner;
