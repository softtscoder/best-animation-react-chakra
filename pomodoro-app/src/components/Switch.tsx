import { Flex } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface SwitchProps {
  onChange: (value: boolean) => void;
  initial?: boolean;
}

const MotionFlex = motion(Flex);

export const Switch: React.FC<SwitchProps> = ({
  onChange,
  initial = false,
}) => {
  const [active, setActive] = useState(initial);
  return (
    <MotionFlex
      borderWidth="1px"
      borderColor="white"
      padding="4px 6px"
      w="65px"
      h="40px"
      borderRadius="20px"
      alignItems="center"
      cursor="pointer"
      onClick={() => {
        onChange(!active);
        setActive(!active);
      }}
      animate={
        active
          ? { borderColor: "rgb(255, 52, 100)" }
          : { borderColor: "rgb(255, 255, 255, 0.6)" }
      }
      justifyContent={active ? "flex-end" : "flex-start"}
    >
      <MotionFlex
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        layout
        h="26px"
        w="26px"
        borderRadius="50px"
        animate={
          active
            ? { backgroundColor: "rgb(255, 52, 100)" }
            : { backgroundColor: "rgb(255, 255, 255, 0.6)" }
        }
      />
    </MotionFlex>
  );
};
