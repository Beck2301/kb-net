import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import AnchorLink from "react-anchor-link-smooth-scroll";
import anime from "animejs";

import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob4 } from "../../images/svg-decorator-blob-4.svg";
import { ReactComponent as SvgDecoratorBlob5 } from "../../images/svg-decorator-blob-5.svg";
import DesignIllustration from "../../images/hero-image.png";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
`;

const CTAButton = styled(AnchorLink)`
  ${tw`inline-block w-full sm:w-auto bg-primary-500 text-gray-100 font-bold px-8 py-4 sm:py-5 rounded-full flex items-center justify-center sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300 text-center`}
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Animated Decorator Blobs (bubbles)
const AnimatedBlob = motion(styled.div`
  ${tw`pointer-events-none absolute -z-10`}
`);

// Responsive blob containers - on mobile they peek from the sides
const BlobContainer1 = styled(AnimatedBlob)`
  left: -10%;
  bottom: 10%;
  width: 300px;
  height: 300px;
  opacity: 0.4;
  @media (max-width: 768px) {
    left: -40%;
    bottom: 5%;
    width: 150px;
    height: 150px;
    opacity: 0.3;
  }
`;

const BlobContainer2 = styled(AnimatedBlob)`
  right: -5%;
  top: 15%;
  width: 280px;
  height: 280px;
  opacity: 0.5;
  @media (max-width: 768px) {
    right: -35%;
    top: 10%;
    width: 140px;
    height: 140px;
    opacity: 0.35;
  }
`;

const BlobContainer4 = styled(AnimatedBlob)`
  right: 10%;
  bottom: 20%;
  width: 220px;
  height: 220px;
  opacity: 0.4;
  @media (max-width: 768px) {
    right: -32%;
    bottom: 15%;
    width: 110px;
    height: 110px;
    opacity: 0.3;
  }
`;

const BlobContainer5 = styled(AnimatedBlob)`
  left: 50%;
  top: 5%;
  width: 200px;
  height: 200px;
  opacity: 0.4;
  @media (max-width: 768px) {
    left: -25%;
    top: 2%;
    width: 100px;
    height: 100px;
    opacity: 0.25;
  }
`;

const Blob1 = styled(SvgDecoratorBlob1)`
  ${tw`w-full h-full`}
  fill: #6222D7;
`;
const Blob4 = styled(SvgDecoratorBlob4)`
  ${tw`w-full h-full`}
  fill: #6222D7;
`;
const Blob5 = styled(SvgDecoratorBlob5)`
  ${tw`w-full h-full`}
  fill: #6222D7;
`;

// Animation variants for floating bubbles
const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    rotate: [0, 5, 0],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }
};

const floatingAnimation2 = {
  animate: {
    y: [0, 15, 0],
    x: [0, -15, 0],
    rotate: [0, -5, 0],
  },
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }
};

const floatingAnimation4 = {
  animate: {
    y: [0, 20, 0],
    x: [0, -10, 0],
    rotate: [0, -8, 0],
  },
  transition: {
    duration: 9,
    repeat: Infinity,
    ease: "easeInOut",
  }
};

const floatingAnimation5 = {
  animate: {
    y: [0, -18, 0],
    x: [0, 8, 0],
    rotate: [0, 6, 0],
  },
  transition: {
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }
};

export default () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const animationTimelineRef = useRef(null);
  const lastIntersectionState = useRef(false);

  useEffect(() => {
    let observer = null;
    let animationTimeout = null;
    let isAnimating = false;

    const animateHero = () => {
      // Verificar que todos los refs existan y sean elementos válidos
      const heading = headingRef.current;
      const paragraph = paragraphRef.current;
      const button = buttonRef.current;
      const image = imageRef.current;

      if (!heading || !paragraph || !button || !image) {
        return;
      }

      // Verificar que sean elementos DOM válidos
      if (!(heading instanceof HTMLElement) || !(paragraph instanceof HTMLElement) || 
          !(button instanceof HTMLElement) || !(image instanceof HTMLElement)) {
        return;
      }

      // Si ya está animando, cancelar y empezar de nuevo
      if (isAnimating && animationTimelineRef.current) {
        const targets = [heading, paragraph, button, image];
        try {
          anime.remove(targets);
        } catch (e) {
          // Ignorar errores al remover
        }
        animationTimelineRef.current = null;
      }

      isAnimating = true;

      // Cancelar timeout anterior si existe
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }

      // Verificar si los elementos ya están visibles antes de resetear
      let headingVisible = true;
      let paragraphVisible = true;
      let buttonVisible = true;
      let imageVisible = true;
      
      try {
        headingVisible = window.getComputedStyle(heading).opacity !== '0';
        paragraphVisible = window.getComputedStyle(paragraph).opacity !== '0';
        buttonVisible = window.getComputedStyle(button).opacity !== '0';
        imageVisible = window.getComputedStyle(image).opacity !== '0';
      } catch (e) {
        // Si falla getComputedStyle, asumir que están visibles y resetear de todos modos
        headingVisible = true;
        paragraphVisible = true;
        buttonVisible = true;
        imageVisible = true;
      }

      // Solo resetear si no están ya ocultos (para evitar ocultar elementos visibles)
      if (headingVisible) {
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(-30px)';
      }
      if (paragraphVisible) {
        paragraph.style.opacity = '0';
        paragraph.style.transform = 'translateY(20px)';
      }
      if (buttonVisible) {
        button.style.opacity = '0';
        button.style.transform = 'scale(0.8)';
      }
      if (imageVisible) {
        image.style.opacity = '0';
        image.style.transform = 'translateX(50px) scale(0.9)';
      }

      // Animar después de un pequeño delay para que el reset se aplique
      animationTimeout = setTimeout(() => {
        try {
          animationTimelineRef.current = anime.timeline({
            easing: 'easeOutExpo',
            complete: () => {
              isAnimating = false;
              animationTimelineRef.current = null;
            }
          });

          animationTimelineRef.current
            .add({
              targets: heading,
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 800,
            })
            .add({
              targets: paragraph,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
            }, '-=400')
            .add({
              targets: button,
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 500,
            }, '-=300')
            .add({
              targets: image,
              opacity: [0, 1],
              translateX: [50, 0],
              scale: [0.9, 1],
              duration: 800,
            }, '-=600');
        } catch (error) {
          console.error('Error en animación del hero:', error);
          isAnimating = false;
          // Si falla, mostrar directamente
          heading.style.opacity = '1';
          heading.style.transform = 'none';
          paragraph.style.opacity = '1';
          paragraph.style.transform = 'none';
          button.style.opacity = '1';
          button.style.transform = 'none';
          image.style.opacity = '1';
          image.style.transform = 'none';
        }
      }, 150);
    };

    const setupObserver = () => {
      if (!containerRef.current) {
        setTimeout(setupObserver, 100);
        return;
      }

      // Verificar que todos los refs estén listos
      if (!headingRef.current || !paragraphRef.current || !buttonRef.current || !imageRef.current) {
        setTimeout(setupObserver, 100);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const isIntersecting = entries[0].isIntersecting;
          
          // Animar cuando entra en el viewport (cambia de no-intersecting a intersecting)
          if (isIntersecting && !lastIntersectionState.current) {
            animateHero();
          }
          
          lastIntersectionState.current = isIntersecting;
        },
        {
          threshold: 0.1,
          rootMargin: '100px 0px -50px 0px'
        }
      );

      observer.observe(containerRef.current);

      // Verificar si ya está visible al cargar y animar inmediatamente
      let hasAnimatedOnLoad = false;
      const checkInitialVisibility = () => {
        if (hasAnimatedOnLoad) return;
        
        const container = containerRef.current;
        const heading = headingRef.current;
        const paragraph = paragraphRef.current;
        const button = buttonRef.current;
        const image = imageRef.current;
        
        if (!container || !heading || !paragraph || !button || !image) {
          return;
        }
        
        // Verificar que sean elementos DOM válidos
        if (!(heading instanceof HTMLElement) || !(paragraph instanceof HTMLElement) || 
            !(button instanceof HTMLElement) || !(image instanceof HTMLElement)) {
          return;
        }
        
        try {
          const rect = container.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight + 100 && rect.bottom > -100;
          
          if (isVisible) {
            hasAnimatedOnLoad = true;
            lastIntersectionState.current = true;
            
            // Animar directamente (animateHero ya resetea el estado inicial)
            setTimeout(() => {
              animateHero();
            }, 200);
          }
        } catch (error) {
          console.warn('Error al verificar visibilidad inicial:', error);
        }
      };

      // Intentar varias veces para asegurar que los elementos estén listos
      setTimeout(checkInitialVisibility, 200);
      setTimeout(checkInitialVisibility, 400);
      setTimeout(checkInitialVisibility, 600);
    };

    const timer = setTimeout(setupObserver, 100);

    // Fallback de seguridad: si después de 2 segundos los elementos aún no están visibles, mostrarlos directamente
    const fallbackTimer = setTimeout(() => {
      const heading = headingRef.current;
      const paragraph = paragraphRef.current;
      const button = buttonRef.current;
      const image = imageRef.current;

      if (!heading || !paragraph || !button || !image) {
        return;
      }

      if (!(heading instanceof HTMLElement) || !(paragraph instanceof HTMLElement) || 
          !(button instanceof HTMLElement) || !(image instanceof HTMLElement)) {
        return;
      }

      try {
        const headingOpacity = window.getComputedStyle(heading).opacity;
        
        // Solo mostrar si aún están ocultos (la animación no se ejecutó)
        if (headingOpacity === '0' || parseFloat(headingOpacity) < 0.1) {
          heading.style.opacity = '1';
          heading.style.transform = 'none';
          paragraph.style.opacity = '1';
          paragraph.style.transform = 'none';
          button.style.opacity = '1';
          button.style.transform = 'none';
          image.style.opacity = '1';
          image.style.transform = 'none';
        }
      } catch (error) {
        // Silenciar errores en el fallback
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      if (animationTimeout) clearTimeout(animationTimeout);
      if (observer) observer.disconnect();
      if (animationTimelineRef.current) {
        const targets = [headingRef.current, paragraphRef.current, buttonRef.current, imageRef.current].filter(Boolean);
        if (targets.length > 0) {
          try {
            anime.remove(targets);
          } catch (e) {
            // Ignorar errores
          }
        }
      }
    };
  }, []);

  return (
    <Container ref={containerRef}>
        <TwoColumn>
          <LeftColumn>
            <Heading ref={headingRef}>
              Hacemos que tu empresa tenga presencia en el mundo digital
            </Heading>
            <Paragraph ref={paragraphRef}>
              Permite que tus clientes te conozcan y te encuentren, ofreciéndoles tus productos o servicios en los canales de comunicación que utilizan actualmente
            </Paragraph>
            <Actions>
              <CTAButton ref={buttonRef} href="#contacto">Comenzar</CTAButton>
            </Actions>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img 
                ref={imageRef}
                tw="min-w-0 w-full max-w-lg xl:max-w-3xl" 
                src={DesignIllustration} 
                alt="Ilustración"
                onLoad={() => {
                  // Cuando la imagen carga, asegurar que se muestre si aún no se ha animado
                  const image = imageRef.current;
                  if (image && image instanceof HTMLElement && image.style) {
                    setTimeout(() => {
                      const currentImage = imageRef.current;
                      if (currentImage && currentImage instanceof HTMLElement && currentImage.style) {
                        try {
                          const currentOpacity = window.getComputedStyle(currentImage).opacity;
                          if (currentOpacity === '0' || parseFloat(currentOpacity) < 0.1) {
                            // Si aún está oculta después de cargar, mostrar directamente
                            currentImage.style.opacity = '1';
                            currentImage.style.transform = 'none';
                          }
                        } catch (error) {
                          console.warn('Error al verificar opacidad de imagen:', error);
                        }
                      }
                    }, 500);
                  }
                }}
              />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        {/* Animated floating bubbles */}
        <BlobContainer1 {...floatingAnimation}>
          <Blob1 />
        </BlobContainer1>
        <BlobContainer2 {...floatingAnimation2}>
          <SvgDecoratorBlob4 />
        </BlobContainer2>
        <BlobContainer4 {...floatingAnimation4}>
          <Blob4 />
        </BlobContainer4>
        <BlobContainer5 {...floatingAnimation5}>
          <Blob5 />
        </BlobContainer5>
      </Container>
  );
};
