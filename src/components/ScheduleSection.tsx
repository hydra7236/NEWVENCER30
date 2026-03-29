import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

const schedule = [
  {
    day: "Day 1 — April 10",
    events: [
      { time: "9:00 AM", title: "Inauguration Ceremony", type: "Ceremony" },
      { time: "10:30 AM", title: "Bug Crush & AI Prompt Battle", type: "Technical" },
      { time: "12:00 PM", title: "Bridge Making & TinkerCad", type: "Technical" },
      { time: "2:00 PM", title: "Pandora Logic Wars & Robo Race", type: "Technical" },
      { time: "4:30 PM", title: "BGMI & FIFA Gaming", type: "Gaming" },
      { time: "7:00 PM", title: "Vocal Fusion & Rhythm Riot", type: "Cultural" },
    ],
  },
  {
    day: "Day 2 — April 11",
    events: [
      { time: "9:00 AM", title: "Design Doodle & Eva Intellect", type: "Technical" },
      { time: "11:00 AM", title: "Robo Race & Do or Die Arena", type: "Technical" },
      { time: "2:00 PM", title: "Dance & Music Showdown", type: "Cultural" },
      { time: "4:00 PM", title: "Mr & Miss Vencer Finals", type: "Cultural" },
      { time: "6:00 PM", title: "Valedictory & Prize Distribution", type: "Ceremony" },
      { time: "8:00 PM", title: "Grand Finale & DJ Night", type: "Cultural" },
    ],
  },
];

const ScheduleSection = () => {
  return (
    <section id="schedule" className="relative py-24">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl tracking-wider fest-gradient-text mb-4 uppercase">Event Schedule</h2>
          <p className="font-body text-muted-foreground">The ultimate two-day techno-cultural experience</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {schedule.map((day, di) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: di * 0.2, duration: 0.6 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={20} className="text-primary" />
                <h3 className="font-display text-sm tracking-wider text-primary">{day.day}</h3>
              </div>
              <div className="space-y-4">
                {day.events.map((e) => (
                  <div key={e.title} className="flex gap-3 items-start">
                    <div className="flex items-center gap-1 text-muted-foreground min-w-[80px]">
                      <Clock size={12} />
                      <span className="text-xs font-body">{e.time}</span>
                    </div>
                    <div>
                      <div className="text-sm font-heading text-foreground">{e.title}</div>
                      <div className="text-xs text-muted-foreground">{e.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
