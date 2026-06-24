import { motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Line, LineChart } from "recharts";

// 1. Data Definitions
const traffic = [
  { m: "Nov", v: 500 }, { m: "Dec", v: 1200 }, { m: "Jan", v: 2100 },
  { m: "Feb", v: 3100 }, { m: "Mar", v: 4200 }, { m: "Apr", v: 5023 },
  { m: "May", v: 6234 }, { m: "Jun", v: 8412 },
];

const leads = [
  { m: "Nov", v: 18 }, { m: "Dec", v: 26 }, { m: "Jan", v: 38 },
  { m: "Feb", v: 55 }, { m: "Mar", v: 78 }, { m: "Apr", v: 104 },
  { m: "May", v: 142 }, { m: "Jun", v: 179 },
];

const reach = [
  { m: "W1", v: 2.2 }, { m: "W2", v: 3.8 }, { m: "W3", v: 3.1 },
  { m: "W4", v: 5.2 }, { m: "W5", v: 6.4 }, { m: "W6", v: 7.8 }, { m: "W7", v: 8.4 },
];

// 2. Custom Tooltip Component
type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number | string }>;
  label?: string;
  isPercentage?: boolean;
};

const CustomTooltip = ({ active, payload, label, isPercentage = false }: CustomTooltipProps) => {
  const value = payload?.[0]?.value;
  const displayValue = typeof value === "number" 
    ? `${value.toLocaleString()}${isPercentage ? "%" : ""}` 
    : value ?? "—";

  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#0E1412",
        padding: "10px 14px",
        borderRadius: "12px",
        color: "#F7FAF8",
        fontSize: "13px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <div style={{ color: "#7CC7A5", marginBottom: "4px", fontWeight: 600, textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.05em" }}>
          {label}
        </div>
        <div className="num" style={{ fontSize: "16px", fontWeight: 500 }}>
          {displayValue}
        </div>
      </div>
    );
  }
  return null;
};

// 3. Main Dashboard Component
export function Dashboard() {
  return (
    <section className="section-pad">
      <div className="container-tight">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="eyebrow mb-4">Live performance</div>
            <h2 className="headline-lg max-w-2xl">
              Growth, <em className="italic text-muted-foreground">visible.</em>
            </h2>
          </div>
          <div className="flex items-center gap-2 chip">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Aggregated · Last 8 months
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
          {/* Traffic Chart */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-3xl glass shadow-elev p-7">
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <div className="eyebrow">Organic traffic</div>
                <div className="num text-4xl text-ink mt-1">8,412</div>
              </div>
              <span className="num text-sm text-accent">+312% YoY</span>
            </div>
            <div className="h-64 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={traffic}>
                  <defs><linearGradient id="gT" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#7CC7A5" stopOpacity="0.55" /><stop offset="100%" stopColor="#7CC7A5" stopOpacity="0" /></linearGradient></defs>
                  <CartesianGrid stroke="rgba(14,20,18,0.06)" vertical={false} />
                  <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: "#5B6661", fontSize: 11 }} />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(124, 199, 165, 0.4)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="v" stroke="#0E1412" strokeWidth={2} fill="url(#gT)" activeDot={{ r: 6, fill: "#0E1412", stroke: "#7CC7A5", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {/* Engagement Chart */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-3xl bg-ink text-background p-6">
              <div className="eyebrow !text-mint/70">Engagement</div>
              <div className="num text-3xl mt-1">8.4%</div>
              <div className="text-xs opacity-60 mt-1">vs 1.9% industry avg</div>
              <div className="h-20 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reach}>
                    <Tooltip content={<CustomTooltip isPercentage={true} />} cursor={{ stroke: '#7CC7A5', strokeWidth: 1 }} />
                    <Line type="monotone" dataKey="v" stroke="#7CC7A5" strokeWidth={2} dot={{ r: 4, fill: "#7CC7A5" }} activeDot={{ r: 6, fill: "#F7FAF8" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Leads Chart */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="rounded-3xl glass p-6">
              <div className="eyebrow">Qualified leads</div>
              <div className="num text-3xl text-ink mt-1">179 / mo</div>
              <div className="h-20 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leads}>
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(14,20,18,0.04)' }} />
                    <Bar dataKey="v" fill="#0E1412" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}