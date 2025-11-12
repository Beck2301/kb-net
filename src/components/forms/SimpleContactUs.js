import React, { useEffect, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import AnimateOnScroll, { fadeInLeft, fadeInRight, fadeInUp } from "components/misc/AnimateOnScroll.js";
import anime from "animejs";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Select = styled(Input).attrs({as: "select"})`
  ${tw`appearance-none bg-transparent`}
  option {
    ${tw`bg-white text-gray-900`}
  }
`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24 resize-none`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

export default ({
  subheading = "Contact Us",
  heading = <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  submitButtonText = "Send",
  formspreeEndpoint = "YOUR_FORMSPREE_ENDPOINT_HERE",
  textOnLeft = true,
}) => {
  const formRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let observer = null;
    let animationTimeout = null;
    let lastIntersectionState = false;
    let formAnimationRef = null;
    let imageAnimationRef = null;

    const animateForm = () => {
      // Cancelar animaciones anteriores
      if (formAnimationRef) {
        const formElements = formRef.current?.querySelectorAll('input, select, textarea, button');
        if (formElements) anime.remove(formElements);
        formAnimationRef = null;
      }
      if (imageAnimationRef && imageRef.current) {
        anime.remove(imageRef.current);
        imageAnimationRef = null;
      }

      // Resetear estado inicial del formulario
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll('input, select, textarea, button');
        formElements.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
        });
      }

      // Resetear estado inicial de la imagen
      if (imageRef.current) {
        imageRef.current.style.opacity = '0';
        imageRef.current.style.transform = `translateX(${textOnLeft ? '50px' : '-50px'}) scale(0.9)`;
      }

      // Animar después de un pequeño delay
      animationTimeout = setTimeout(() => {
        // Animar el formulario
        if (formRef.current) {
          const formElements = formRef.current.querySelectorAll('input, select, textarea, button');
          formAnimationRef = anime({
            targets: formElements,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 400,
            easing: 'easeOutExpo',
            delay: anime.stagger(50),
          });
        }
        // Animar la imagen
        if (imageRef.current) {
          imageAnimationRef = anime({
            targets: imageRef.current,
            opacity: [0, 1],
            translateX: textOnLeft ? [50, 0] : [-50, 0],
            scale: [0.9, 1],
            duration: 600,
            easing: 'easeOutExpo',
          });
        }
      }, 100);
    };

    observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0].isIntersecting;
        
        // Solo animar cuando cambia de no-intersecting a intersecting
        if (isIntersecting && !lastIntersectionState) {
          if (animationTimeout) clearTimeout(animationTimeout);
          animateForm();
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
          animateForm();
        }
      }
    }, 400);

    return () => {
      if (animationTimeout) clearTimeout(animationTimeout);
      const container = containerRef.current;
      if (observer && container) {
        observer.unobserve(container);
      }
      const form = formRef.current;
      if (formAnimationRef && form) {
        const formElements = form.querySelectorAll('input, select, textarea, button');
        anime.remove(formElements);
      }
      const image = imageRef.current;
      if (imageAnimationRef && image) {
        anime.remove(image);
      }
    };
  }, [textOnLeft]);

  return (
    <Container ref={containerRef}>
      <TwoColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && (
              <AnimateOnScroll
                animationConfig={fadeInUp}
                observerOptions={{ threshold: 0.2 }}
              >
                <Subheading>{subheading}</Subheading>
              </AnimateOnScroll>
            )}
            <AnimateOnScroll
              animationConfig={textOnLeft ? fadeInLeft : fadeInRight}
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
            <Form ref={formRef} action={`https://formspree.io/f/${formspreeEndpoint}`} method="POST">
              <Select name="service" required style={{ opacity: 0 }}>
                <option value="">Selecciona un servicio</option>
                <option value="web-design">Diseño Web</option>
                <option value="web-development">Desarrollo Web</option>
                <option value="content">Contenido</option>
                <option value="branding">Branding</option>
                <option value="consulting">Consultoría</option>
                <option value="other">Otro</option>
              </Select>
              <Input type="text" name="name" placeholder="Tu Nombre" required style={{ opacity: 0 }} />
              <Input type="email" name="email" placeholder="Tu Email" required style={{ opacity: 0 }} />
              <Textarea name="message" placeholder="Cuéntanos sobre tu proyecto y qué necesitas" required style={{ opacity: 0 }} />
              <SubmitButton type="submit" style={{ opacity: 0 }}>{submitButtonText}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
        <ImageColumn>
          <Image ref={imageRef} imageSrc={EmailIllustrationSrc} style={{ opacity: 0 }} />
        </ImageColumn>
      </TwoColumn>
    </Container>
  );
};
