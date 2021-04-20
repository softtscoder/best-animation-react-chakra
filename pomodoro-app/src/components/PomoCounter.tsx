import { Tooltip, Flex, Text, Icon } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiPlus, HiMinusSm } from "react-icons/hi";

interface PomoCounterProps {
  style?: "dark" | "light";
  pomodorosToFinish?: number;
  updatePlan?: (plan: { body?: string; pomodorosToFinish?: number }) => void;
  setPomodorosToFinishValue?: (value: number) => void;
}

const MotionFlex = motion(Flex);

export const PomoCounter: React.FC<PomoCounterProps> = ({
  style = "light",
  pomodorosToFinish = 1,
  updatePlan,
  setPomodorosToFinishValue,
}) => {
  //prevent props dismatch with data due to setState async
  useEffect(() => {
    if (updatePlan && pomodorosToFinish !== counter) {
      setCounter(pomodorosToFinish);
    }
  });

  const [counter, setCounter] = useState(pomodorosToFinish);
  const [showControls, setShowControls] = useState(false);
  return (
    <Flex position="relative">
      <Tooltip
        padding="5px 10px 8px 10px"
        hasArrow
        label="pomodoro iterations"
        bg="black"
        color="white"
      >
        <Flex
          onClick={() => {
            setShowControls(!showControls);
          }}
          cursor="pointer"
          justifyContent="center"
          alignItems="center"
          fontSize="36px"
          w="65px"
          color={style === "dark" ? "mCyian" : "white"}
          bgColor={style === "dark" ? "mBlack" : "mCyian"}
          zIndex={2}
        >
          <Text>{counter}</Text>
        </Flex>
      </Tooltip>
      <AnimatePresence>
        {!showControls ? null : (
          <MotionFlex
            key="counter"
            zIndex={1}
            justifyContent="space-between"
            bgColor={style === "dark" ? "mCyian" : "mBlack"}
            h="65px"
            flexDir="column"
            position="absolute"
            top="0"
            left="-46%"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.7 }}
          >
            <MotionFlex
              onClick={() => {
                updatePlan && updatePlan({ pomodorosToFinish: counter + 1 });
                setPomodorosToFinishValue &&
                  setPomodorosToFinishValue(counter + 1);
                setCounter(counter + 1);
              }}
              whileHover={{ scale: 1.2 }}
              cursor="pointer"
            >
              <Icon color="white" w="30px" h="30px" as={HiPlus} />
            </MotionFlex>
            <MotionFlex
              onClick={() => {
                if (counter >= 2) {
                  updatePlan && updatePlan({ pomodorosToFinish: counter - 1 });
                  setPomodorosToFinishValue &&
                    setPomodorosToFinishValue(counter - 1);
                  setCounter(counter - 1);
                }
              }}
              whileHover={{ scale: 1.2 }}
              cursor="pointer"
            >
              <Icon color="white" w="30px" h="30px" as={HiMinusSm} />
            </MotionFlex>
          </MotionFlex>
        )}
      </AnimatePresence>
    </Flex>
  );
};
