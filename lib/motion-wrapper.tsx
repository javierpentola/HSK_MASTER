"use client"

// Este archivo es un wrapper para framer-motion
// En un proyecto real, framer-motion se instalaría con npm install framer-motion
// y se importaría directamente

import React from "react"

// Simulación básica de las funcionalidades de framer-motion que estamos usando
export const motion = {
  div: ({
    children,
    className,
    initial,
    animate,
    transition,
    ...props
  }: React.HTMLProps<HTMLDivElement> & {
    initial?: any
    animate?: any
    transition?: any
  }) => {
    const [isAnimated, setIsAnimated] = React.useState(false)

    React.useEffect(() => {
      // Simular la animación estableciendo el estado después de un pequeño retraso
      const timer = setTimeout(
        () => {
          setIsAnimated(true)
        },
        (transition?.delay || 0) * 1000,
      )

      return () => clearTimeout(timer)
    }, [transition?.delay])

    // Aplicar estilos basados en los estados de animación
    const style = {
      opacity: isAnimated ? animate?.opacity || 1 : initial?.opacity || 0,
      transform: isAnimated ? `scale(${animate?.scale || 1})` : `scale(${initial?.scale || 1})`,
      transition: `opacity ${transition?.duration || 0.3}s, transform ${transition?.duration || 0.3}s`,
    }

    return (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    )
  },
}

