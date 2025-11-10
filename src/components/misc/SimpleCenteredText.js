import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";

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
  return (
    <GrayBackgroundContainer>
      <Content>
        <Heading>{heading}</Heading>
        <TextContent>
          {paragraphs.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </TextContent>
      </Content>
    </GrayBackgroundContainer>
  );
};

