// usestate_example.tsx

// =============================================================================
// React Gerenciamento de Estado - Exemplo de useState
// =============================================================================

import React, { useState } from 'react';

interface CounterProps {
    initialValue?: number;
}

const UseStateCounter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
    // 1. Usando o Hook useState para gerenciar o estado do contador.
    //    O tipo 'number' é inferido, mas pode ser explicitamente definido como useState<number>(0).
    const [count, setCount] = useState(initialValue);

    // Função para incrementar o contador
    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    // Função para decrementar o contador
    const decrement = () => {
        setCount(prevCount => prevCount - 1);
    };

    // Função para resetar o contador para o valor inicial
    const reset = () => {
        setCount(initialValue);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px', margin: '20px auto' }}>
            <h2>Contador com useState</h2>
            <p style={{ fontSize: '3em', margin: '20px 0' }}>{count}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button 
                    onClick={decrement}
                    style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    Decrementar
                </button>
                <button 
                    onClick={reset}
                    style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    Resetar
                </button>
                <button 
                    onClick={increment}
                    style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                    Incrementar
                </button>
            </div>
        </div>
    );
};

export default UseStateCounter;

/*
Para usar este componente em uma aplicação React:

1.  Crie um arquivo .tsx (ex: App.tsx).
2.  Importe o componente: `import UseStateCounter from './UseStateCounter';`
3.  Renderize-o: `<UseStateCounter initialValue={10} />`
*/
