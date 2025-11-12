import React, { useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import AnimateOnScroll, { scaleIn } from "components/misc/AnimateOnScroll.js";
import anime from "animejs";

const GrayBackgroundContainer = tw(Container)`-mx-8 px-8 bg-gray-100`;
const Content = tw(ContentWithPaddingXl)`text-center`;
const Heading = tw(SectionHeading)`text-gray-900 mb-8`;
const TextContent = styled.div`
  ${tw`max-w-4xl mx-auto`}
  
  p {
    ${tw`text-gray-700 text-base md:text-lg leading-relaxed mb-6`}
  }
  
  strong {
    ${tw`font-bold text-gray-900`}
  }
  
  p:last-child {
    ${tw`mb-0`}
  }
`;

export default ({
  heading = "Quiénes somos",
  paragraphs = []
}) => {
  const paragraphsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    let observer = null;
    let animationTimeout = null;
    let lastIntersectionState = false;
    let animationRef = null;
    const container = containerRef.current;

    const animateParagraphs = () => {
      const targets = paragraphsRef.current.filter(ref => ref !== null && ref !== undefined);
      if (targets.length === 0) return;

      // Cancelar animación anterior
      if (animationRef) {
        anime.remove(targets);
        animationRef = null;
      }

      // Resetear estado inicial
      targets.forEach(target => {
        if (target) {
          target.style.opacity = '0';
          target.style.transform = 'translateY(30px)';
        }
      });

      // Animar después de un pequeño delay
      animationTimeout = setTimeout(() => {
        animationRef = anime({
          targets: targets,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          easing: 'easeOutExpo',
          delay: anime.stagger(200),
        });
      }, 100);
    };

    observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        
        // Solo animar cuando cambia de no-intersecting a intersecting
        if (isIntersecting && !lastIntersectionState) {
          if (animationTimeout) clearTimeout(animationTimeout);
          animateParagraphs();
        }
        
        lastIntersectionState = isIntersecting;
      },
      {
        threshold: 0.1,
        rootMargin: '200px 0px -50px 0px',
      }
    );

    if (container) {
      observer.observe(container);
    }

    // Verificar si ya está visible al cargar
    setTimeout(() => {
      const currentContainer = containerRef.current;
      if (currentContainer) {
        const rect = currentContainer.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
          lastIntersectionState = true;
          animateParagraphs();
        }
      }
    }, 400);

    return () => {
      if (animationTimeout) clearTimeout(animationTimeout);
      if (observer && container) {
        observer.unobserve(container);
      }
      if (animationRef) {
        const currentParagraphs = paragraphsRef.current.filter(ref => ref !== null);
        if (currentParagraphs.length > 0) {
          anime.remove(currentParagraphs);
        }
      }
    };
  }, [paragraphs.length]);

  return (
    <GrayBackgroundContainer>
      <Content>
        <AnimateOnScroll
          animationConfig={scaleIn}
          observerOptions={{ threshold: 0.2 }}
        >
          <Heading>{heading}</Heading>
        </AnimateOnScroll>
        <TextContent ref={containerRef}>
          {paragraphs.map((paragraph, index) => (
            <p 
              key={index} 
              ref={el => paragraphsRef.current[index] = el}
              style={{ opacity: 0 }}
              dangerouslySetInnerHTML={{ __html: paragraph }} 
            />
          ))}
        </TextContent>
      </Content>
    </GrayBackgroundContainer>
  );
};

