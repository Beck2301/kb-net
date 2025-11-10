import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";

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
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
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
  return (
    <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              Hacemos que tu empresa tenga presencia en el mundo digital
            </Heading>
            <Paragraph>
              Permite que tus clientes te conozcan y te encuentren, ofreciéndoles tus productos o servicios en los canales de comunicación que utilizan actualmente
            </Paragraph>
            <Actions>
              <input type="text" placeholder="Tu correo electrónico" />
              <button>Comenzar</button>
            </Actions>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={DesignIllustration} alt="Ilustración" />
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
