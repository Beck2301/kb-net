import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import anime from "animejs";

const Container = tw.div`relative bg-primary-500 -mx-8 px-8 text-gray-100`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}
`;
const Subheading = tw(SubheadingBase)`mb-4 text-gray-100`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center text-gray-300`;

const VerticalSpacer = tw.div`mt-10 w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-xs`}
`;

const Card = styled.div`
  ${tw`flex flex-col items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`bg-gray-100 text-center rounded-full p-5 flex-shrink-0 flex items-center justify-center`}
    img, svg {
      width: 2rem;
      height: 2rem;
      color: #6B21A8; /* o el color que prefieras */
      display: inline-block;
    }
  }

  .textContainer {
    ${tw`mt-6`}
  }

  .title {
    ${tw`tracking-wider font-bold text-xl leading-none`}
  }

  .description {
    ${tw`mt-2 font-normal text-gray-400 leading-snug`}
  }
`;

export default ({
  cards = null,
  heading = "Amazing Features",
  subheading = "",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}) => {
  if (!cards) cards = [];
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const animationTimelineRef = useRef(null);

  useEffect(() => {
    let observer = null;
    let animationTimeout = null;
    let resetTimeout = null;
    let lastIntersectionState = false;
    const cards = cardsRef.current;

    const animateCards = () => {
      const targets = cardsRef.current.filter(ref => ref !== null && ref !== undefined);
      if (targets.length === 0) return;

      // Cancelar animación anterior si existe
      if (animationTimelineRef.current) {
        anime.remove(targets);
        animationTimelineRef.current = null;
      }

      // Limpiar timeouts anteriores
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }

      // Resetear estado inicial - usar requestAnimationFrame para suavidad
      requestAnimationFrame(() => {
        targets.forEach(target => {
          if (target) {
            // Cancelar transiciones CSS
            target.style.transition = 'none';
            // Establecer estado inicial
            target.style.opacity = '0';
            target.style.transform = 'translateY(50px) scale(0.9)';
          }
        });

        // Animar después de un pequeño delay
        animationTimeout = setTimeout(() => {
          try {
            animationTimelineRef.current = anime({
              targets: targets,
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.9, 1],
              duration: 600,
              easing: 'easeOutExpo',
              delay: anime.stagger(150),
              complete: () => {
                animationTimelineRef.current = null;
              }
            });
          } catch (error) {
            console.error('Error animando cards:', error);
            targets.forEach(target => {
              if (target) {
                target.style.opacity = '1';
                target.style.transform = 'translateY(0) scale(1)';
              }
            });
            animationTimelineRef.current = null;
          }
        }, 100);
      });
    };

    const resetCardsWhenOutOfView = () => {
      // Resetear las tarjetas cuando están completamente fuera del viewport
      const targets = cardsRef.current.filter(ref => ref !== null && ref !== undefined);
      targets.forEach(target => {
        if (target) {
          const rect = target.getBoundingClientRect();
          const isCompletelyOut = rect.bottom < -100 || rect.top > window.innerHeight + 100;
          if (isCompletelyOut) {
            // Resetear solo cuando están completamente fuera
            target.style.opacity = '0';
            target.style.transform = 'translateY(50px) scale(0.9)';
          }
        }
      });
    };

    const setupObserver = () => {
      const targets = cardsRef.current.filter(ref => ref !== null && ref !== undefined);
      if (targets.length === 0) {
        setTimeout(setupObserver, 200);
        return;
      }

      // Observar las tarjetas para detectar cuando entran/salen del viewport
      observer = new IntersectionObserver(
        (entries) => {
          const anyIntersecting = entries.some(entry => entry.isIntersecting);
          
          // Solo animar cuando cambian de no-intersecting a intersecting
          if (anyIntersecting && !lastIntersectionState) {
            // Limpiar timeout de reset si existe
            if (resetTimeout) {
              clearTimeout(resetTimeout);
              resetTimeout = null;
            }
            
            // Debounce para evitar animaciones múltiples
            if (animationTimeout) {
              clearTimeout(animationTimeout);
            }
            
            animationTimeout = setTimeout(() => {
              animateCards();
            }, 150);
          }
          
          // Cuando salen del viewport, resetear después de un delay
          if (!anyIntersecting && lastIntersectionState) {
            if (resetTimeout) {
              clearTimeout(resetTimeout);
            }
            // Resetear después de que salgan completamente (delay para evitar flash)
            resetTimeout = setTimeout(() => {
              resetCardsWhenOutOfView();
            }, 500);
          }
          
          lastIntersectionState = anyIntersecting;
        },
        {
          threshold: 0.1,
          rootMargin: '300px 0px -100px 0px'
        }
      );

      // Observar todas las tarjetas
      targets.forEach(target => {
        if (target) {
          observer.observe(target);
        }
      });

      // Verificar estado inicial
      const firstCard = targets[0];
      if (firstCard) {
        const rect = firstCard.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + 400 && rect.bottom > -100;
        if (isVisible) {
          lastIntersectionState = true;
          setTimeout(() => {
            animateCards();
          }, 500);
        }
      }
    };

    const timer = setTimeout(setupObserver, 400);

    return () => {
      clearTimeout(timer);
      if (animationTimeout) clearTimeout(animationTimeout);
      if (resetTimeout) clearTimeout(resetTimeout);
      if (observer) observer.disconnect();
      if (animationTimelineRef.current) {
        const targets = cards ? cards.filter(ref => ref !== null) : [];
        if (targets.length > 0) {
          anime.remove(targets);
        }
        animationTimelineRef.current = null;
      }
    };
  }, [cards.length]);

  return (
    <Container>
      <ThreeColumnContainer>
        {subheading && <Subheading>{subheading}</Subheading>}
        <Heading>{heading}</Heading>
        {description && <Description>{description}</Description>}
        <VerticalSpacer />
        <div ref={cardsContainerRef} style={{ display: 'contents' }}>
          {cards.map((card, i) => (
            <Column 
              key={i} 
              ref={el => { if (el) cardsRef.current[i] = el; }}
              style={{ opacity: 0, transform: 'translateY(50px) scale(0.9)' }}
            >
              <Card>
                <span className="imageContainer">
                  {typeof card.imageSrc === "string"
                    ? <img src={card.imageSrc} alt="" />
                    : card.imageSrc}
                </span>
                <span className="textContainer">
                  <span className="title">{card.title || "Fully Secure"}</span>
                  <p className="description">
                    {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."}
                  </p>
                </span>
              </Card>
            </Column>
          ))}
        </div>
      </ThreeColumnContainer>
    </Container>
  );
};
