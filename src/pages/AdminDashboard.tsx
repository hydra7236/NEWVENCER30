import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  RefreshCcw, 
  LogOut, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Download,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  event: string;
  payment_id: string;
  timestamp: string;
  attendance?: boolean | string;
}

const AdminDashboard = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const navigate = useNavigate();

  // REPLACE WITH YOUR ACTUAL GOOGLE APPS SCRIPT WEB APP URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbwV-aydGCnSCARehqd2OrJmAFJyjsJIy13ksJDOKyZdHNWSsgAa4i9vfnAr4ycoUReoVg/exec";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${scriptURL}?type=fetch_all`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setParticipants(data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      // Fallback for testing UI without real API
      setParticipants([
        { id: "VENCER-123", name: "Rohan Kumar", email: "rohan@example.com", phone: "9876543210", college: "AITM", department: "CSE", event: "Bug Crush", payment_id: "PAY-1", timestamp: "2024-03-24", attendance: true },
        { id: "VENCER-124", name: "Sahil Patil", email: "sahil@example.com", phone: "9876543211", college: "GIT", department: "AI&DS", event: "Pandora Logic Wars", payment_id: "PAY-2", timestamp: "2024-03-24", attendance: false },
        { id: "VENCER-125", name: "Ananya S", email: "ananya@example.com", phone: "9876543212", college: "AITM", department: "ECE", event: "Thinker CAD", payment_id: "PAY-3", timestamp: "2024-03-24", attendance: "Present" },
      ]);
      toast.info("Showing test data (Check Apps Script connectivity)");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Auth check
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const stats = useMemo(() => {
    const total = participants.length;
    const presentCount = participants.filter(p => p.attendance === true || p.attendance === "true" || p.attendance === "Present").length;
    return {
      total,
      present: presentCount,
      absent: total - presentCount
    };
  }, [participants]);

  const filteredData = useMemo(() => {
    return participants.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEvent = eventFilter === "all" || p.event === eventFilter;
      return matchesSearch && matchesEvent;
    });
  }, [participants, searchTerm, eventFilter]);

  const uniqueEvents = useMemo(() => {
    const events = new Set(participants.map(p => p.event));
    return Array.from(events);
  }, [participants]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-primary/30">
      {/* Sidebar-like top nav */}
      <div className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50 pt-8 sm:pt-0">
        <div className="container mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/scanner" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-xs uppercase font-bold tracking-widest">
              <Camera size={14} /> Scanner
            </Link>
            <div className="h-4 w-[1px] bg-white/10" />
            <h1 className="font-display text-lg tracking-tight text-glow-teal font-bold uppercase">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchData} disabled={isLoading} className="text-[10px] uppercase font-bold tracking-widest gap-2 bg-transparent border-white/10 hover:bg-white/5">
              <RefreshCcw size={14} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="text-[10px] uppercase font-bold tracking-widest gap-2 bg-destructive text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <LogOut size={14} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Participants" value={stats.total} icon={<Users className="text-primary" size={20} />} accent="primary" />
          <StatCard title="Present (Checked-in)" value={stats.present} icon={<CheckCircle2 className="text-fest-teal" size={20} />} accent="teal" />
          <StatCard title="Absent" value={stats.absent} icon={<XCircle className="text-fest-purple" size={20} />} accent="purple" />
        </div>

        {/* Filters and Search */}
        <Card className="glass-pandora border-white/5 bg-white/[0.02] mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search by name or pass ID..." 
                  className="pl-10 bg-black/40 border-white/10 focus:border-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={eventFilter} onValueChange={setEventFilter}>
                  <SelectTrigger className="bg-black/40 border-white/10 focus:border-primary/50 text-xs sm:text-sm font-bold uppercase tracking-widest">
                    <SelectValue placeholder="All Events" />
                  </SelectTrigger>
                  <SelectContent className="glass-pandora border-white/10 text-white">
                    <SelectItem value="all">All Events</SelectItem>
                    {uniqueEvents.map(e => (
                      <SelectItem key={e} value={e}>{e}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tables */}
        <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.02] glass-pandora">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-white/[0.05] text-left">
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Event</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Dept</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone</th>
                <th className="p-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((p, idx) => (
                  <motion.tr 
                    key={p.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-t border-white/5 hover:bg-white/[0.04] transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm">{p.name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{p.id}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium">{p.event}</td>
                    <td className="p-4 text-[10px] font-bold uppercase text-primary/70">{p.department}</td>
                    <td className="p-4 font-mono text-xs">{p.phone}</td>
                    <td className="p-4">
                      <AttendanceBadge present={p.attendance === true || p.attendance === "true" || p.attendance === "Present"} />
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-muted-foreground italic font-body">
                    No participants found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon, accent }: { title: string; value: number; icon: React.ReactNode; accent: string }) => (
  <Card className="glass-pandora border-white/5 bg-white/[0.02] shadow-[0_0_20px_rgba(0,247,255,0.02)]">
    <CardContent className="p-6 flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{title}</p>
        <h3 className={`text-3xl font-bold font-display`}>{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner`}>
        {icon}
      </div>
    </CardContent>
  </Card>
);

const AttendanceBadge = ({ present }: { present: boolean }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
    present ? "bg-fest-teal/15 text-fest-teal border border-fest-teal/30 shadow-[0_0_10px_rgba(0,247,255,0.1)]" : "bg-destructive/15 text-destructive border border-destructive/30"
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full ${present ? "bg-fest-teal animate-pulse" : "bg-destructive"}`} />
    {present ? "Present" : "Absent"}
  </span>
);

export default AdminDashboard;
