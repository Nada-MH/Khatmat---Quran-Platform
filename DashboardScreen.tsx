
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const DashboardScreen: React.FC = () => {
  const weeklyData = [
    { name: 'السبت', value: 4 },
    { name: 'الأحد', value: 12 },
    { name: 'الاثنين', value: 8 },
    { name: 'الثلاثاء', value: 15 },
    { name: 'الأربعاء', value: 10 },
    { name: 'الخميس', value: 6 },
    { name: 'الجمعة', value: 20 },
  ];

  const pieData = [
    { name: 'حفظ', value: 400 },
    { name: 'تفسير', value: 300 },
    { name: 'تلاوة', value: 300 },
  ];

  const COLORS = ['#059669', '#d97706', '#2563eb'];

  const handleExport = (type: 'CSV' | 'PDF') => {
    alert(`جاري استخراج التقرير بصيغة ${type}...`);
    // Simulation logic for export
    if (type === 'CSV') {
        const content = "Day,Pages Read\n" + weeklyData.map(d => `${d.name},${d.value}`).join('\n');
        const blob = new Blob([content], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 font-amiri">لوحة التحكم</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => handleExport('CSV')}
            className="p-2 bg-slate-200 rounded-lg text-xs"
          >
            CSV 📥
          </button>
          <button 
            onClick={() => handleExport('PDF')}
            className="p-2 bg-slate-200 rounded-lg text-xs"
          >
            PDF 📑
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-xs text-slate-400">معدل الالتزام</p>
          <p className="text-2xl font-bold text-emerald-600">٨٨٪</p>
          <p className="text-[10px] text-emerald-500">↑ ٣٪ عن الأسبوع الماضي</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <p className="text-xs text-slate-400">إجمالي الصفحات</p>
          <p className="text-2xl font-bold text-amber-600">٢٤٥</p>
          <p className="text-[10px] text-amber-500">منذ بداية الشهر</p>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-700 mb-4">نشاطك الأسبوعي (بالصفحات)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {weeklyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 6 ? '#059669' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Distribution Chart */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-700 mb-4">توزيع الوقت التعليمي</h3>
        <div className="flex items-center justify-between">
            <div className="h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex-1 px-4 space-y-2">
                {pieData.map((d, i) => (
                    <div key={d.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                            <span className="text-slate-600">{d.name}</span>
                        </div>
                        <span className="font-bold text-slate-800">{Math.round((d.value/1000)*100)}%</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Volunteer Specific Section (Hidden for normal users in production) */}
      <section className="bg-slate-900 p-6 rounded-2xl text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">لوحة المتطوعين</h3>
          <span className="text-[10px] bg-emerald-500 px-2 py-0.5 rounded">متطوع معتمد</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">إجمالي الطلاب</span>
            <span className="font-bold">٤٢</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">متوسط الحضور</span>
            <span className="font-bold">٩٢٪</span>
          </div>
          <button className="w-full bg-emerald-600 py-3 rounded-xl font-bold mt-2 text-sm">إدارة حلقاتي</button>
        </div>
      </section>
    </div>
  );
};

export default DashboardScreen;
