// shadcn_button_example.tsx

// =============================================================================
// shadcn/ui - Exemplo Básico do Componente Button
// =============================================================================

// Nota: Em um projeto real, este arquivo 'ui/button.tsx' seria copiado
// diretamente da documentação do shadcn/ui para o seu diretório 'components/ui'.
// Ele não seria instalado via npm.

// Imagine que este é o conteúdo do seu arquivo `components/ui/button.tsx`
// (Simplificado para o exemplo)
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils"; // Seu utilitário para className merging

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

// -----------------------------------------------------------------------------
// Exemplo de como usar o componente Button em um componente React (ex: App.tsx)
// -----------------------------------------------------------------------------

import React from 'react';
// Importe o Button do caminho onde você o colocou (e.g., ../components/ui/button)
import { Button } from './components/ui/button'; 

const ShadcnButtonExample: React.FC = () => {
  const handleClick = () => {
    alert("Botão clicado!");
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
      <h2>Exemplos de Botões shadcn/ui</h2>
      
      <Button onClick={handleClick}>
        Botão Padrão
      </Button>

      <Button variant="secondary" onClick={handleClick}>
        Botão Secundário
      </Button>

      <Button variant="destructive" size="lg" onClick={handleClick}>
        Botão Destrutivo Grande
      </Button>

      <Button variant="outline" size="sm" onClick={handleClick}>
        Botão Outline Pequeno
      </Button>

      <Button variant="ghost">
        Botão Fantasma
      </Button>

      <Button variant="link" onClick={handleClick}>
        Link Button
      </Button>

      <Button disabled>
        Botão Desabilitado
      </Button>

      <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#666' }}>
        Para usar, certifique-se de ter o utilitário `cn` (para Tailwind) e as dependências `class-variance-authority` e `@radix-ui/react-slot` instaladas e configuradas.
      </p>
    </div>
  );
};

export default ShadcnButtonExample;

/*
Para testar este exemplo em um projeto real (ex: Next.js/Create React App com Tailwind CSS):

1.  **Configure o shadcn/ui:** Siga as instruções oficiais para inicializar o shadcn/ui e adicionar o componente 'button'. Isso criará `components/ui/button.tsx` e `lib/utils.ts`.
2.  **Crie um arquivo de exemplo:** Crie um novo arquivo, por exemplo, `ShadcnButtonUsage.tsx`.
3.  **Cole o código:** Cole o conteúdo de `ShadcnButtonExample` (a partir do `import React from 'react';`) neste novo arquivo.
4.  **Ajuste os imports:** Certifique-se de que o `import { Button } from './components/ui/button';` aponte para o local correto do seu componente Button.
5.  **Renderize:** Renderize `ShadcnButtonUsage` em seu `App.tsx` ou página.
*/
