import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const dataDados = [
    { subject: 'Python', A: 95, fullMark: 100 },
    { subject: 'SQL / Bancos', A: 90, fullMark: 100 },
    { subject: 'Machine Learning', A: 85, fullMark: 100 },
    { subject: 'Eng. Features', A: 80, fullMark: 100 },
    { subject: 'Data Viz', A: 85, fullMark: 100 },
    { subject: 'Estatística', A: 80, fullMark: 100 },
];

const dataDev = [
    { subject: 'React / Front', A: 85, fullMark: 100 },
    { subject: 'TypeScript', A: 80, fullMark: 100 },
    { subject: 'APIs REST', A: 85, fullMark: 100 },
    { subject: 'Git', A: 90, fullMark: 100 },
    { subject: 'Linux', A: 80, fullMark: 100 },
    { subject: 'MongoDB', A: 75, fullMark: 100 },
];

const SkillChart = ({ mode = 'dados' }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div style={{ height: 350 }}></div>;

    const currentData = mode === 'dados' ? dataDados : dataDev;
    const color = mode === 'dados' ? '#00d2ff' : '#00ff9d';

    return (
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={currentData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: color, fontSize: 12, fontFamily: 'JetBrains Mono' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#111827', borderColor: color, color: '#fff', borderRadius: '4px' }}
                        itemStyle={{ color: color }}
                        formatter={(value) => [value, 'Proficiência']}
                    />
                    <Radar name="Carolina" dataKey="A" stroke={color} fill={color} fillOpacity={0.4} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillChart;
