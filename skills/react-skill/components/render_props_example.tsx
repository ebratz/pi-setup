// render_props_example.tsx

// =============================================================================
// React Componentes Avançados - Exemplo de Padrão Render Props
// =============================================================================

import React, { useState } from 'react';

// -----------------------------------------------------------------------------
// 1. Componente `MouseTracker` com Render Prop
//    - Compartilha lógica de estado (posição do mouse) com um componente filho
//      através de uma função passada como prop.
// -----------------------------------------------------------------------------

interface MouseTrackerState {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (state: MouseTrackerState) => React.ReactNode;
}

class MouseTracker extends React.Component<MouseTrackerProps, MouseTrackerState> {
  constructor(props: MouseTrackerProps) {
    super(props);
    this.state = { x: 0, y: 0 };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div 
        style={{ height: '200px', border: '2px dashed #00bcd4', position: 'relative', marginBottom: '20px', backgroundColor: '#e0f7fa' }}
        onMouseMove={this.handleMouseMove}
      >
        {this.props.render(this.state)} {/* Invoca a render prop com o estado */} 
      </div>
    );
  }
}

// -----------------------------------------------------------------------------
// 2. Componente `Cat` que consome a lógica do `MouseTracker`
// -----------------------------------------------------------------------------

interface CatProps {
  mouse: MouseTrackerState;
}

const Cat: React.FC<CatProps> = ({ mouse }) => (
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_March_2010-1.jpg"
    style={{
      position: 'absolute',
      left: mouse.x - 50, // Ajuste para centralizar a imagem
      top: mouse.y - 50,
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      pointerEvents: 'none',
      transition: 'left 0.1s linear, top 0.1s linear'
    }}
    alt="Gato seguindo o mouse"
  />
);

// -----------------------------------------------------------------------------
// 3. Componente `MousePositionDisplay` que também consome a lógica
// -----------------------------------------------------------------------------

interface MousePositionDisplayProps {
  mouse: MouseTrackerState;
}

const MousePositionDisplay: React.FC<MousePositionDisplayProps> = ({ mouse }) => (
  <p style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(255,255,255,0.7)', padding: '5px', borderRadius: '3px' }}>
    Posição do Mouse: ({mouse.x}, {mouse.y})
  </p>
);

// -----------------------------------------------------------------------------
// Componente Principal para Demonstrar os Render Props
// -----------------------------------------------------------------------------

const RenderPropsExamples: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Exemplos de Padrão Render Props</h1>

      <p>Mova o mouse sobre a caixa azul abaixo para ver os exemplos:</p>

      <h3>1. Gato Seguindo o Mouse</h3>
      <MouseTracker 
        render={mouse => (
          <Cat mouse={mouse} />
        )}
      />

      <h3>2. Exibição da Posição do Mouse</h3>
      <MouseTracker 
        render={mouse => (
          <MousePositionDisplay mouse={mouse} />
        )}
      />

      <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        O padrão Render Props permite que o componente `MouseTracker` compartilhe seu estado `(x, y)` 
        com qualquer componente que ele renderize, sem precisar saber o que será renderizado.
      </p>
    </div>
  );
};

export default RenderPropsExamples;

/*
Para usar este componente em uma aplicação React:

1.  Crie um arquivo `.tsx` (ex: `App.tsx` ou `RenderPropsExamples.tsx`).
2.  Cole o código.
3.  Importe e renderize em seu componente principal:
    ```tsx
    import React from 'react';
    import RenderPropsExamples from './RenderPropsExamples'; // Ajuste o caminho

    function App() {
      return (
        <div className="App">
          <RenderPropsExamples />
        </div>
      );
    }

    export default App;
    ```

*/
