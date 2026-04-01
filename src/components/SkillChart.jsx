import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { subject: 'Python', A: 95, fullMark: 100 },
    { subject: 'SQL / Bancos', A: 90, fullMark: 100 },
    { subject: 'Machine Learning', A: 80, fullMark: 100 },
    { subject: 'Eng. Multivariada', A: 75, fullMark: 100 },
    { subject: 'React / Front-end', A: 85, fullMark: 100 },
    { subject: 'Process. Imagens', A: 80, fullMark: 100 },
];

const SkillChart = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Timeout para animação de entrada fluida
        setMounted(true);
    }, []);

    if (!mounted) return <div style={{ height: 350 }}></div>;

    return (
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#00d2ff', fontSize: 12, fontFamily: 'JetBrains Mono' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#00d2ff', color: '#fff', borderRadius: '4px' }}
                        itemStyle={{ color: '#00ff9d' }}
                        formatter={(value) => [value, 'Proficiência']}
                    />
                    <Radar name="Carolina" dataKey="A" stroke="#00ff9d" fill="#00ff9d" fillOpacity={0.4} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillChart;
