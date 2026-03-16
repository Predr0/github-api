"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

export function TechStackChart({ data }: { data: any[] }) {
  return (
    <div className="h-[400px] w-full bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner">
      <h3 className="text-lg font-semibold mb-2 text-slate-100">Distribuição de Tecnologias</h3>
      <p className="text-xs text-slate-500 mb-6 italic">*Baseado no peso em bytes dos repositórios</p>
      
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value" 
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
          <Tooltip 
    formatter={(value: any, name: any, props: any) => {
        const { percentage } = props.payload;
        return [`${percentage}%`, name];
  }}
  contentStyle={{ 
    backgroundColor: "#0f172a", 
    border: "1px solid #1e293b", 
    borderRadius: "8px", 
    color: "#fff" 
  }}
  itemStyle={{ color: "#fff" }}
/>

<Legend 
  verticalAlign="bottom" 
  align="center"
  layout="horizontal"
  iconType="circle"
  wrapperStyle={{
    paddingTop: "40px", 
  }}
/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}