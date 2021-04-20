import { Flex } from "@chakra-ui/react";
import React from "react";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex
      fontFamily={"Proxima Nova Rg"}
      fontWeight="bold"
      flexDir="column"
      width="77%"
      mx="auto"
    >
      {children}
    </Flex>
  );
};
