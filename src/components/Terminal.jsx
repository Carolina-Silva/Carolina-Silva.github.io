import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

const Terminal = () => {
    const [history, setHistory] = useState([
        { type: 'output', text: 'Console interativo iniciado v1.0.0' },
        { type: 'output', text: "Digite 'help' para ver os comandos disponíveis." }
    ]);
    const [input, setInput] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let output = '';

            switch (cmd) {
                case 'help':
                    output = 'Comandos disponíveis: whoami, skills, projects, clear, sudo hire carolina';
                    break;
                case 'whoami':
                    output = 'Carolina Silva - Cientista de Dados Júnior & Software Eng.\nEspecialista em unir lógica de programação com dados clínicos.';
                    break;
                case 'skills':
                    output = '[ Python, SQL, React, NumPy, Pandas, Scikit-learn, OpenCV ]';
                    break;
                case 'projects':
                    output = '> Bookshifter (Sistema de Recomendação)\n> Análise de Fibras InCor (Processamento OpenCV)';
                    break;
                case 'sudo hire carolina':
                    output = 'Acesso concedido. Decisão extremamente inteligente! Redirecionando para a seção de contato...';
                    setTimeout(() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }), 1500);
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                case '':
                    output = '';
                    break;
                default:
                    output = `Comando desconhecido: ${cmd}. Digite 'help'.`;
            }

            setHistory(prev => [
                ...prev,
                { type: 'input', text: `carolina@portfolio:~$ ${cmd}` },
                ...(output ? [{ type: 'output', text: output }] : [])
            ]);
            setInput('');
        }
    };

    return (
        <div className="terminal-container">
            <div className="terminal-header">
                <div className="term-btn close"></div>
                <div className="term-btn min"></div>
                <div className="term-btn max"></div>
                <span className="term-title">bash - carolina@portfolio</span>
            </div>
            <div className="terminal-body" ref={containerRef} onClick={() => document.getElementById('term-input').focus()}>
                {history.map((line, idx) => (
                    <div key={idx} className={`term-line ${line.type}`}>
                        {line.text}
                    </div>
                ))}
                <div className="term-input-line">
                    <span className="prompt">carolina@portfolio:~$</span>
                    <input
                        id="term-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
