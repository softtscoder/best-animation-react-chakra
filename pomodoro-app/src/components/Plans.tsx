import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { PlanBlock } from "./PlanBlock";
import { PomoCounter } from "./PomoCounter";

interface PlansProps {
  data: { body: string; pomodorosToFinish: number }[];
  addPlan: (body: string, pomodorosToFinish: number) => void;
  deletePlan: (index: number) => void;
  updatePlan: (index: number, plan: {}) => void;
}

const MotionFlex = motion(Flex);

export const Plans: React.FC<PlansProps> = ({
  data,
  addPlan,
  deletePlan,
  updatePlan,
}) => {
  const [value, setValue] = useState("");
  const [pomodorosToFinishValue, setPomodorosToFinishValue] = useState(1);

  let plans: any = [];
  data.forEach((item, iterator) => {
    plans.push(
      <PlanBlock
        updatePlan={(plan) => updatePlan(iterator, plan)}
        deletePlan={() => deletePlan(iterator)}
        text={item.body}
        pomodorosToFinish={item.pomodorosToFinish}
        key={iterator}
        iter={iterator}
      />
    );
  });
  return (
    <Flex flexDir="column" alignItems="center" mt="72px">
      <Flex alignItems="center" w="100%" flexDir="column">
        <Text
          background="linear-gradient(90deg, rgba(100,204,228,1) 1%, rgba(255,255,255,1) 100%)"
          backgroundClip="text"
          letterSpacing="0.087em"
          fontSize="64px"
        >
          plans for a day
        </Text>
        <Flex mt="20px" h="65px" w="100%">
          <Input
            padding="11px 20px"
            fontSize="36px"
            color="mBlack"
            letterSpacing="2px"
            _placeholder={{
              color: "rgba(22, 22, 23, 0.59)",
            }}
            borderRadius="18px 0 0 18px"
            backgroundColor="white"
            variant="unstyled"
            placeholder="Short description"
            value={value}
            onChange={(event) => setValue("" + event.target.value)}
          />
          <PomoCounter
            setPomodorosToFinishValue={(value) =>
              setPomodorosToFinishValue(value)
            }
            style="light"
          />
          <MotionFlex
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            letterSpacing="2px"
            padding="11px 17px"
            fontSize="36px"
            backgroundColor="mBlack"
            color="rgb(255, 52, 100)"
            borderRadius="0 18px 18px 0"
            whileHover={{ color: "rgb(255, 255, 255)" }}
            onClick={() => {
              if (value !== "") {
                addPlan(value, pomodorosToFinishValue);
                setValue("");
              }
            }}
          >
            Add
          </MotionFlex>
        </Flex>
        <VStack mt="80px" w="70%" spacing="30px" align="stretch">
          {plans}
        </VStack>
      </Flex>
    </Flex>
  );
};
