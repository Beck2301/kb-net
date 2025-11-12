import React from 'react';
import useAnimeScroll from 'helpers/useAnimeScroll';
import anime from 'animejs';

/**
 * Componente wrapper para animar elementos cuando entran en el viewport
 * @param {React.ReactNode} children - Elementos hijos a animar
 * @param {Object} animationConfig - Configuración de animación de anime.js
 * @param {Object} observerOptions - Opciones del Intersection Observer
 * @param {string} as - Tag HTML a usar como wrapper (default: 'div')
 * @param {Object} className - Clases CSS adicionales
 * @param {Object} style - Estilos inline adicionales
 */
export default function AnimateOnScroll({
  children,
  animationConfig = {},
  observerOptions = {},
  as: Component = 'div',
  className = '',
  style = {},
  ...props
}) {
  const ref = useAnimeScroll(animationConfig, observerOptions);

  return (
    <Component ref={ref} className={className} style={style} {...props}>
      {children}
    </Component>
  );
}

/**
 * Variantes predefinidas de animación
 */
export const fadeInUp = {
  opacity: [0, 1],
  translateY: [50, 0],
  duration: 800,
  easing: 'easeOutExpo',
};

export const fadeInDown = {
  opacity: [0, 1],
  translateY: [-50, 0],
  duration: 800,
  easing: 'easeOutExpo',
};

export const fadeInLeft = {
  opacity: [0, 1],
  translateX: [-50, 0],
  duration: 800,
  easing: 'easeOutExpo',
};

export const fadeInRight = {
  opacity: [0, 1],
  translateX: [50, 0],
  duration: 800,
  easing: 'easeOutExpo',
};

export const scaleIn = {
  opacity: [0, 1],
  scale: [0.8, 1],
  duration: 600,
  easing: 'easeOutBack',
};

export const rotateIn = {
  opacity: [0, 1],
  rotate: [-10, 0],
  scale: [0.9, 1],
  duration: 700,
  easing: 'easeOutExpo',
};

export const staggerFadeIn = {
  opacity: [0, 1],
  translateY: [30, 0],
  duration: 600,
  easing: 'easeOutExpo',
  delay: anime.stagger(100), // Se aplicará cuando se use con múltiples elementos
};

