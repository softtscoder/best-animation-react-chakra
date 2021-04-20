import {
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { Switch } from "./Switch";

interface Settings {
  pomodoroDur: number;
  shBreakDur: number;
  lgBreakDur: number;
  iterationToLgBreak: number;
  isTaskTrackerOn: boolean;
}

interface SettingsProps {
  setSettings: (value: Settings) => void;
  settings: Settings;
}

const MotionFlex = motion(Flex);

export const Settings: React.FC<SettingsProps> = ({
  setSettings,
  settings,
}) => {
  const { pomodoroDur, shBreakDur, lgBreakDur, iterationToLgBreak } = settings;

  return (
    <MotionFlex
      zIndex={2}
      position="absolute"
      borderWidth="1px"
      w="300px"
      transform="translate(-40%, 3%)"
      borderRadius="24px"
      borderColor="#64CCE4"
      boxShadow="0px 4px 10px 1px #64CCE4"
      color="white"
      padding="100px 25px 30px 25px"
      flexDir="column"
      backgroundColor={[
        "rgb(0, 0, 0, 0.5)",
        "rgb(0, 0, 0, 0.5)",
        "rgb(0, 0, 0, 0.5)",
        "rgb(0, 0, 0, 0.1)",
      ]}
      sx={{
        backdropFilter: "blur(6px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Flex mb="10px" flexDir="column" w="100%">
        <Text mb="10px" fontWeight="400" fontSize="22px">
          Pomodoro duration:
        </Text>
        <NumberInput
          onChange={(value) => {
            const settingsCopy: Settings = Object.assign(settings);
            settingsCopy.pomodoroDur = 60 * +value;
            setSettings(settingsCopy);
          }}
          min={1}
          focusBorderColor="mRed"
          size="md"
          defaultValue={pomodoroDur / 60}
        >
          <NumberInputField fontSize="22px" textAlign="center" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text
          mt="4px"
          fontSize="15px"
          fontWeight="400"
          color="rgb(255, 255, 255, 0.6)"
        >
          in minutes
        </Text>
      </Flex>
      <Flex mb="10px" flexDir="column" w="100%">
        <Text mb="10px" fontWeight="400" fontSize="22px">
          Short break duration:
        </Text>
        <NumberInput
          onChange={(value) => {
            const settingsCopy: Settings = Object.assign(settings);
            settingsCopy.shBreakDur = 60 * +value;
            setSettings(settingsCopy);
          }}
          min={1}
          focusBorderColor="mRed"
          size="md"
          defaultValue={shBreakDur / 60}
        >
          <NumberInputField fontSize="22px" textAlign="center" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text
          mt="4px"
          fontSize="15px"
          fontWeight="400"
          color="rgb(255, 255, 255, 0.6)"
        >
          in minutes
        </Text>
      </Flex>
      <Flex mb="10px" flexDir="column" w="100%">
        <Text mb="10px" fontWeight="400" fontSize="22px">
          Long break duration:
        </Text>
        <NumberInput
          onChange={(value) => {
            const settingsCopy: Settings = Object.assign(settings);
            settingsCopy.lgBreakDur = 60 * +value;
            setSettings(settingsCopy);
          }}
          min={1}
          focusBorderColor="mRed"
          size="md"
          defaultValue={lgBreakDur / 60}
        >
          <NumberInputField fontSize="22px" textAlign="center" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text
          mt="4px"
          fontSize="15px"
          fontWeight="400"
          color="rgb(255, 255, 255, 0.6)"
        >
          in minutes
        </Text>
      </Flex>
      <Flex mb="10px" flexDir="column" w="100%">
        <Text mb="10px" fontWeight="400" fontSize="22px">
          Pomodoros before long break:
        </Text>
        <NumberInput
          onChange={(value) => {
            const settingsCopy: Settings = Object.assign(settings);
            settingsCopy.iterationToLgBreak = +value;
            setSettings(settingsCopy);
          }}
          min={1}
          focusBorderColor="mRed"
          size="md"
          defaultValue={iterationToLgBreak}
        >
          <NumberInputField fontSize="22px" textAlign="center" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <Flex mb="10px" flexDir="column" w="100%">
        <Text mb="10px" fontWeight="400" fontSize="22px">
          Enable task tracker:
        </Text>
        <Switch
          initial={settings.isTaskTrackerOn}
          onChange={(value) => {
            const settingsCopy: Settings = Object.assign(settings);
            settingsCopy.isTaskTrackerOn = value;
            setSettings(settingsCopy);
          }}
        />
      </Flex>
    </MotionFlex>
  );
};
