import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import TwoColumnWithInput from "components/hero/TwoColumnWithInput.js";
import ThreeColWithSideImageWithPrimaryBackground from "components/features/ThreeColWithSideImageWithPrimaryBackground.js";
import SimpleCenteredText from "components/misc/SimpleCenteredText.js";
import SimpleContactUs from "components/forms/SimpleContactUs.js";
import SingleCol from "components/faqs/SingleCol.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header, { NavLinks, NavLink, PrimaryLink } from "components/headers/light.js";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { IoTimeOutline, IoShieldCheckmarkOutline, IoPeopleOutline, IoAlbumsOutline, IoSearchOutline } from "react-icons/io5";

export default function MainLandingPage() {
  const headerLinks = [
    <NavLinks key={1}>
      <NavLink as={AnchorLink} href="#beneficios">Beneficios</NavLink>
      <NavLink as={AnchorLink} href="#quienes-somos">Quiénes somos</NavLink>
      <NavLink as={AnchorLink} href="#contacto">Contacto</NavLink>
      <NavLink as={AnchorLink} href="#faqs">FAQs</NavLink>
      <PrimaryLink as={AnchorLink} href="#contacto">Comenzar</PrimaryLink>
    </NavLinks>
  ];

  return (
    <AnimationRevealPage>
      <Header links={headerLinks} />
      <TwoColumnWithInput />
      <div id="beneficios">
        <ThreeColWithSideImageWithPrimaryBackground
          heading="¿Cómo impacta tu presencia online en tu negocio?"
        description="Tener presencia digital te permite llegar a más personas, fortalecer la confianza en tu marca y destacar frente a la competencia. Aprovecha el potencial de internet para crecer y conectar con tus clientes en todo momento."
        cards={[
          {
            imageSrc: <IoTimeOutline size={32} />,
            title: "Disponibilidad 24/7",
            description:
              "Tus clientes pueden encontrarte, conocerte y contactarte incluso fuera del horario laboral."
          },
          {
            imageSrc: <IoShieldCheckmarkOutline size={32} />,
            title: "Confianza y profesionalismo",
            description:
              "Generas mayor confianza al contar con un sitio web profesional y redes sociales activas."
          },
          {
            imageSrc: <IoPeopleOutline size={32} />,
            title: "Atracción de clientes",
            description:
              "Atraes visitantes interesados que pueden convertirse en clientes potenciales."
          },
          {
            imageSrc: <IoAlbumsOutline size={32} />,
            title: "Presentación clara",
            description:
              "Muestras tus productos o servicios de forma clara, ordenada y accesible."
          },
          {
            imageSrc: <IoSearchOutline size={32} />,
            title: "Mejor posicionamiento",
            description:
              "Te posicionas en buscadores cuando alguien busca lo que ofreces."
          }
        ]}
        />
      </div>
      <div id="quienes-somos">
        <SimpleCenteredText
        heading="Quiénes somos"
        paragraphs={[
          "Somos una startup creativa especializada en contenido, diseño y desarrollo web. Combinamos estrategia, estética y tecnología para ayudar a marcas y negocios a destacarse en el mundo digital.",
          "Creamos soluciones que se ven bien y que también funcionen: <strong>contenido que conecta</strong>, <strong>diseño con intención</strong> y <strong>sitios que convierten</strong>.",
          "¡Confíanos tu estrategia digital y te ayudaremos a que tus clientes te encuentren!"
        ]}
        />
      </div>
      <div id="contacto">
        <SimpleContactUs
        subheading="Contacto"
        heading={<>¿Te gustaría que seamos parte de <span tw="text-primary-500">tu proyecto</span>?</>}
        description=""
        submitButtonText="Enviar"
        formspreeEndpoint="myzlgvpj"
        />
      </div>
      <div id="faqs">
        <SingleCol
        subheading=""
        heading="FAQs"
        description=""
        faqs={[
          {
            question: "¿Son personas capacitadas?",
            answer: "Sí. Contamos con experiencia profesional en redacción de contenido estratégico, diseño visual y desarrollo web frontend. Trabajamos con marcas reales y seguimos aprendiendo constantemente para ofrecer soluciones actualizadas y efectivas."
          },
          {
            question: "¿Dónde están ubicados?",
            answer: "Estamos en El Salvador, pero trabajamos con clientes de cualquier parte del mundo. Podemos coordinar reuniones virtuales y adaptar nuestras soluciones a distintos contextos y zonas horarias."
          },
          {
            question: "¿Trabajan con paquetes o precios personalizados?",
            answer: "Ofrecemos ambos. Tenemos paquetes diseñados para facilitar el inicio, pero también creamos propuestas a medida según las necesidades, el alcance y los objetivos de cada proyecto."
          },
          {
            question: "¿Qué tipo de negocios pueden contratarlos?",
            answer: "Trabajamos con empresas pequeñas, medianas, emprendimientos, marcas personales y organizaciones que necesiten posicionarse mejor en el entorno digital."
          },
          {
            question: "¿Pueden ayudar si ya tengo un sitio web o redes funcionando?",
            answer: "Claro. Podemos optimizar lo que ya tenés, completar lo que falta o escalar tu estrategia. También ofrecemos auditorías SEO y mejoras visuales o técnicas según cada caso."
          },
          {
            question: "¿Qué herramientas utilizan?",
            answer: "Utilizamos plataformas modernas como Figma, WordPress, Shopify, HubSpot, React, herramientas de automatización de contenido, análisis SEO, entre otras. Nos adaptamos según el proyecto."
          }
        ]}
        />
      </div>
      <Footer />
    </AnimationRevealPage>
  );
}