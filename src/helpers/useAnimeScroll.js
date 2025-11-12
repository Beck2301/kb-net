import { useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * Hook para animar elementos cuando entran en el viewport usando anime.js
 * @param {Object} animationConfig - Configuración de animación de anime.js
 * @param {Object} options - Opciones del Intersection Observer
 * @param {number} options.threshold - Porcentaje del elemento que debe ser visible (0-1)
 * @param {string} options.rootMargin - Margen del root (ej: "0px 0px -100px 0px")
 * @param {boolean} options.once - Si es true, la animación solo se ejecuta una vez
 * @returns {React.RefObject} - Referencia al elemento que se animará
 */
export default function useAnimeScroll(animationConfig = {}, options = {}) {
  const elementRef = useRef(null);
  const animationRef = useRef(null);
  const lastIntersectionState = useRef(false);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = false, // Cambiado a false por defecto para permitir repetición
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Configuración por defecto de animación
    const defaultConfig = {
      targets: element,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      easing: 'easeOutExpo',
      ...animationConfig,
    };

    // Función para resetear y animar
    const animate = () => {
      // Cancelar animación anterior si existe
      if (animationRef.current) {
        anime.remove(element);
        animationRef.current = null;
      }

      // Resetear estado inicial basado en la configuración
      const initialOpacity = animationConfig.opacity ? animationConfig.opacity[0] : 0;
      const initialTranslateY = animationConfig.translateY ? animationConfig.translateY[0] : 50;
      const initialTranslateX = animationConfig.translateX ? animationConfig.translateX[0] : 0;
      const initialScale = animationConfig.scale ? animationConfig.scale[0] : 1;

      element.style.opacity = initialOpacity;
      if (initialTranslateY !== 0 || initialTranslateX !== 0 || initialScale !== 1) {
        let transform = '';
        if (initialTranslateY !== 0) transform += `translateY(${initialTranslateY}px) `;
        if (initialTranslateX !== 0) transform += `translateX(${initialTranslateX}px) `;
        if (initialScale !== 1) transform += `scale(${initialScale})`;
        element.style.transform = transform.trim();
      }

      // Animar después de un pequeño delay
      setTimeout(() => {
        animationRef.current = anime(defaultConfig);
      }, 100);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          
          // Solo animar cuando cambia de no-intersecting a intersecting
          if (isIntersecting && !lastIntersectionState.current) {
            animate();
          }
          
          // Si está configurado para ejecutarse solo una vez, dejar de observar
          if (once && isIntersecting) {
            observer.unobserve(entry.target);
          }
          
          lastIntersectionState.current = isIntersecting;
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Verificar si ya está visible al cargar
    setTimeout(() => {
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
          lastIntersectionState.current = true;
          animate();
        }
      }
    }, 400);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      if (animationRef.current) {
        anime.remove(element);
      }
    };
  }, [animationConfig, threshold, rootMargin, once]);

  return elementRef;
}

