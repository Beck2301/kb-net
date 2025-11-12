import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import AnimateOnScroll, { fadeInUp, scaleIn } from "components/misc/AnimateOnScroll.js";
import anime from "animejs";

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center text-gray-600`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;



export default ({
  subheading = "FAQS",
  heading = "You have Questions ?",
  description = "And we have got answers to all of them. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  faqs = [
    {
      question: "Is lunch provided free of cost ?",
      answer:
        "Yes, it is, if you have a membership with us. Otherwise it is charged as per the menu. Some limits do apply as to how much items can be included in your lunch. This limit is enough for any one person and merely exists to discourage abusal of the system."
    },
    {
      question: "Do you have 2 Bedroom suites ?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "Are Wi-Fi costs included in the price ?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "Where can I reach you for support ?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
  ]
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
  const faqsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    let observer = null;
    let animationTimeout = null;
    let lastIntersectionState = false;
    let animationRef = null;

    const animateFAQs = () => {
      const targets = faqsRef.current.filter(ref => ref !== null && ref !== undefined);
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
          target.style.transform = 'translateX(-30px)';
        }
      });

      // Animar después de un pequeño delay
      animationTimeout = setTimeout(() => {
        animationRef = anime({
          targets: targets,
          opacity: [0, 1],
          translateX: [-30, 0],
          duration: 500,
          easing: 'easeOutExpo',
          delay: anime.stagger(100),
        });
      }, 100);
    };

    observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        
        // Solo animar cuando cambia de no-intersecting a intersecting
        if (isIntersecting && !lastIntersectionState) {
          if (animationTimeout) clearTimeout(animationTimeout);
          animateFAQs();
        }
        
        lastIntersectionState = isIntersecting;
      },
      {
        threshold: 0.1,
        rootMargin: '200px 0px -50px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Verificar si ya está visible al cargar
    setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
          lastIntersectionState = true;
          animateFAQs();
        }
      }
    }, 400);

    return () => {
      if (animationTimeout) clearTimeout(animationTimeout);
      const container = containerRef.current;
      if (observer && container) {
        observer.unobserve(container);
      }
      if (animationRef) {
        const faqs = faqsRef.current;
        const targets = faqs ? faqs.filter(ref => ref !== null) : [];
        if (targets.length > 0) {
          anime.remove(targets);
        }
      }
    };
  }, [faqs.length]);

  const toggleQuestion = questionIndex => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            {subheading && (
              <AnimateOnScroll
                animationConfig={fadeInUp}
                observerOptions={{ threshold: 0.2 }}
              >
                <Subheading>{subheading}</Subheading>
              </AnimateOnScroll>
            )}
            <AnimateOnScroll
              animationConfig={scaleIn}
              observerOptions={{ threshold: 0.2 }}
            >
              <Heading>{heading}</Heading>
            </AnimateOnScroll>
            {description && (
              <AnimateOnScroll
                animationConfig={{
                  ...fadeInUp,
                  delay: 200,
                }}
                observerOptions={{ threshold: 0.2 }}
              >
                <Description>{description}</Description>
              </AnimateOnScroll>
            )}
          </HeaderContent>
          <FAQSContainer ref={containerRef}>
            {faqs.map((faq, index) => (
              <FAQ
                key={index}
                ref={el => faqsRef.current[index] = el}
                style={{ opacity: 0 }}
                onClick={() => {
                  toggleQuestion(index);
                }}
                className="group"
              >
                <Question>
                  <QuestionText>{faq.question}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === index ? "open" : "collapsed"}
                    transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {faq.answer}
                </Answer>
              </FAQ>
            ))}
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1/>
      <DecoratorBlob2 />
    </Container>
  );
};
