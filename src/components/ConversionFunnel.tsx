"use client";

import {
  FunnelChart,
  Funnel,
  ResponsiveContainer,
  Tooltip,
  LabelList,
  type TooltipProps,
} from "recharts";

type FunnelDatum = {
  name: string;
  value: number;
  drop: number;
};

const baseFunnel: Array<Omit<FunnelDatum, "drop">> = [
  { name: "Leads", value: 1000 },
  { name: "Trials", value: 500 },
  { name: "Paid", value: 300 },
];

const funnelData: FunnelDatum[] = baseFunnel.map((stage, index, array) => {
  if (index === 0) {
    return { ...stage, drop: 0 };
  }

  const prev = array[index - 1]?.value ?? stage.value;
  const drop =
    prev > 0 ? Math.round(((prev - stage.value) / prev) * 100) : 0;

  return { ...stage, drop };
});

const numberFormatter = new Intl.NumberFormat("en-US");

const FunnelTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length) {
    return null;
  }

  const datum = payload[0]?.payload as FunnelDatum | undefined;

  if (!datum) {
    return null;
  }

  return (
    <div className="rounded-lg border border-[rgba(34,201,151,0.35)] bg-black/80 px-3 py-2 text-sm shadow-lg backdrop-blur">
      <p className="text-xs uppercase tracking-wide text-white/60">
        {datum.name}
      </p>
      <p
        className="font-semibold"
        style={{ color: "var(--accent-green)" }}
      >
        {numberFormatter.format(datum.value)} contacts
      </p>
      {datum.drop > 0 ? (
        <p className="text-xs text-white/70">Drop-off: {datum.drop}%</p>
      ) : (
        <p className="text-xs text-white/70">Top of funnel</p>
      )}
    </div>
  );
};

const ConversionFunnel = () => {
  return (
    <div className="glass gradient-border p-6">
      <h3 className="text-xl font-bold green-glow mb-4">
        AI-Driven Conversion Funnel
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <FunnelChart>
          <defs>
            <linearGradient id="funnelGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22c997" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.75} />
            </linearGradient>
          </defs>
          <Tooltip content={<FunnelTooltip />} />
          <Funnel
            dataKey="value"
            data={funnelData}
            fill="url(#funnelGradient)"
            stroke="rgba(34,201,151,0.5)"
            strokeWidth={1}
            isAnimationActive
          >
            <LabelList
              dataKey="name"
              position="left"
              fill="#9ca3af"
              style={{ fontSize: 12 }}
            />
            <LabelList
              dataKey="value"
              position="right"
              formatter={(value: number) =>
                `${numberFormatter.format(value)}`
              }
              fill="#e5fdf4"
              style={{ fontSize: 12 }}
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionFunnel;
