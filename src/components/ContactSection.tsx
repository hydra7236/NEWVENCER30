import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, User, ExternalLink } from "lucide-react";

const coordinators = [
  {
    dept: "Artificial Intelligence & Data Science",
    lead1: { name: "Neki J.", phone: "7568676897" },
    lead2: { name: "Ramesh H.", phone: "73532 04108" }
  },
  {
    dept: "Computer Science & Engineering",
    lead1: { name: "Shreedhar S.", phone: "8884608943" },
    lead2: { name: "Srushti B.", phone: "8431976442" }
  },
  {
    dept: "Robotics & Automation",
    lead1: { name: "Yasirahmad R.", phone: "8951450068" },
    lead2: { name: "Abhinandan I.", phone: "8660569165" }
  },
  {
    dept: "Electronics & Communication",
    lead1: { name: "Megha B.", phone: "6363767116" },
    lead2: { name: "Chetan H.", phone: "88674 72005" }
  },
  {
    dept: "Mechanical Engineering",
    lead1: { name: "Prathamesh P.", phone: "9113281234" },
    lead2: { name: "Pradeep K.", phone: "8197898550" }
  },
  {
    dept: "Electrical & Electronics",
    lead1: { name: "Shubham B.", phone: "8904308926" },
    lead2: { name: "Shridevi B.", phone: "9353924390" }
  },
  {
    dept: "Civil Engineering",
    lead1: { name: "Parth P.", phone: "7026611587" },
    lead2: { name: "Ritesh S.", phone: "9164848342" }
  },
  {
    dept: "Bachelor of Computer Applications",
    lead1: { name: "Sushil S.", phone: "9353362031" },
    lead2: { name: "Ruchita N.", phone: "7411487463" }
  }
];

const patrons = [
  { role: "Chief Patron", name: "Mrs. Shradha Angadi (Shettar)", sub: "Director, SAEF" },
  { role: "Chief Patron", name: "Dr. Spoorti Patil", sub: "Director, SAEF" },
  { role: "Patron", name: "Dr. Anand Deshpande", sub: "Principal & Director, AITM" },
  { role: "Patron", name: "Mr. Raju Joshi", sub: "Administrator, SAEF" },
  { role: "Faculty Co-ordinator", name: "Prof. Gautam Dematti", sub: "Cultural Secretary" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl tracking-widest fest-gradient-text mb-4 uppercase">Contact Us</h2>
          <p className="font-body text-white/60">Reach out to the organizers or find us on campus</p>
        </motion.div>

        {/* Core Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          {[
            { icon: Mail, label: "Official Email", value: "info@aitmbgm.ac.in", href: "mailto:info@aitmbgm.ac.in" },
            { icon: Phone, label: "Helpdesk", value: "0831 243 8123/100", href: "tel:08312438123" },
            { 
              icon: MapPin, 
              label: "Location", 
              value: "AITM, Belagavi", 
              href: "https://www.google.com/maps/place/Angadi+Institute+of+Technology+and+Management/@15.8446878,74.4669055,19z" 
            },
            { icon: Instagram, label: "Instagram", value: "@aitm_belagavi_", href: "https://www.instagram.com/aitm_belagavi_/" },
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass p-8 rounded-2xl text-center flex flex-col items-center group hover:border-primary/50 transition-all duration-500 shadow-xl"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                <item.icon className="text-primary" size={28} />
              </div>
              <div className="font-display text-xs uppercase tracking-widest text-white/50 mb-2">{item.label}</div>
              <div className="text-white font-heading font-bold text-sm tracking-wide break-all">{item.value}</div>
              <ExternalLink size={12} className="mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>

        {/* Patrons & Faculty Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl text-white mb-10 tracking-wider uppercase border-l-4 border-primary pl-6"
          >
            Patrons & Faculty
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {patrons.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-primary text-[10px] font-display tracking-[0.2em] uppercase mb-2">{p.role}</div>
                <div className="text-white font-heading font-bold mb-1">{p.name}</div>
                <div className="text-white/40 text-xs font-body">{p.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Student Coordinators Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl text-white mb-10 tracking-wider uppercase border-l-4 border-primary pl-6"
          >
            Student Coordinators
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coordinators.map((dept, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <User className="text-purple-400" size={20} />
                  </div>
                  <h4 className="font-heading text-white text-sm font-bold tracking-wide">{dept.dept}</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[dept.lead1, dept.lead2].map((lead, lIdx) => (
                    <div key={lIdx} className="space-y-1">
                      <div className="text-white/80 font-body text-xs font-semibold">{lead.name}</div>
                      <a href={`tel:${lead.phone}`} className="text-primary/70 hover:text-primary transition-colors text-[10px] font-mono tracking-tighter block">
                        {lead.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map Placeholder/Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
        >
          <div className="relative h-[400px] w-full bg-black/40 flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.0!2d74.4977!3d15.8537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf658e8f6e5b1d%3A0x43d1e71e7a7e4b0a!2sAngadi%20Institute%20of%20Technology%20and%20Management%2C%20Savagaon%20Road%2C%20Belagavi%2C%20Savgaon%2C%20Karnataka%20590006%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AITM Belagavi Location"
              className="grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 pointer-events-none border-2 border-primary/10 group-hover:border-primary/30 transition-colors" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;