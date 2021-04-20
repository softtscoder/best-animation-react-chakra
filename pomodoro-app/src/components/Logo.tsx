import Image from "next/image";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";

interface LogoProps {}

export const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <Flex mt="49px" fontSize="90px" color="white" mx="auto" width="fit-content">
      <Text ml="-6px">pomodo</Text>
      <Flex mt="5px" transform="rotate(22.73deg)" position="relative">
        <Text ml="17px" mt="12px">
          ro
        </Text>
        <Flex
          filter="drop-shadow(0px 4px 11px #FF3464)"
          width="114px"
          height="114px"
          position="absolute"
        >
          <Image
            src="/img/tomato2.svg"
            alt="Logo icon"
            width="114px"
            height="114px"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
