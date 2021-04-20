import { Flex, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { PomoCounter } from "./PomoCounter";
import { FaTrashAlt } from "react-icons/fa";

interface PlanBlockProps {
  text: string;
  pomodorosToFinish: number;
  iter: number;
  deletePlan: () => void;
  updatePlan: (plan: {}) => void;
}

const MotionFlex = motion(Flex);

export const PlanBlock: React.FC<PlanBlockProps> = ({
  text = "unset",
  pomodorosToFinish = 1,
  iter = 1,
  deletePlan,
  updatePlan,
}) => {
  return (
    <Flex alignItems="center">
      <Flex
        color="white"
        w="65px"
        h="65px"
        mr="40px"
        borderWidth={iter === 0 ? "5px" : "0px"}
        borderColor="white"
        fontSize="36px"
        borderRadius="50px"
        justifyContent="center"
        alignItems="center"
        boxShadow={iter === 0 ? "0px 0px 15px 5px #64CCE4" : ""}
      >
        {iter + 1}
      </Flex>
      <Flex h="65px" w="80%">
        <Flex
          w="100%"
          padding="8px 20px 11px 20px"
          fontSize="36px"
          color="mBlack"
          letterSpacing="2px"
          borderRadius="18px 0 0 18px"
          backgroundColor="white"
        >
          {text}
        </Flex>
        <PomoCounter
          updatePlan={(plan) => updatePlan(plan)}
          pomodorosToFinish={pomodorosToFinish}
          style="dark"
        />
        <MotionFlex
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          letterSpacing="2px"
          padding="11px 17px"
          fontSize="36px"
          backgroundColor="mRed"
          borderRadius="0 18px 18px 0"
          onClick={() => deletePlan()}
        >
          <MotionFlex whileHover={{ scale: 1.1 }}>
            <Icon color="white" w="34px" h="34px" as={FaTrashAlt} />
          </MotionFlex>
        </MotionFlex>
      </Flex>
    </Flex>
  );
};
