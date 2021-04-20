import { CircularProgress, Flex, Icon, Text, Wrap } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiTool } from "react-icons/fi";
interface TimerProps {
  settings: {
    pomodoroDur: number;
    shBreakDur: number;
    lgBreakDur: number;
    iterationToLgBreak: number;
    isTaskTrackerOn: boolean;
  };
  data: { body: string; pomodorosToFinish: number }[];
  isClickable: boolean;
  iteratePomodoro: () => void;
}

const MotionFlex = motion(Flex);
const MotionText = motion(Text);

export const Timer: React.FC<TimerProps> = ({
  settings,
  isClickable = true,
  iteratePomodoro,
  data,
}) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [pomodoroIterations, setPomodoroIterations] = useState(0);
  const [realActivePeriod, setRealActivePeriod] = useState("pomodoro");
  const [currentTimerAmount, setCurrentTimerAmount]: any = useState(
    settings.pomodoroDur
  );
  const [time, setTime]: any = useState(currentTimerAmount);
  const [reset, setReset] = useState(false);

  const fullTimerReset = () => {
    setPomodoroIterations(0);
    setRealActivePeriod("pomodoro");
  };

  //Configuration for time when setting are changed
  useEffect(() => {
    if (
      !isTimerActive &&
      currentTimerAmount !== settings.pomodoroDur &&
      realActivePeriod === "pomodoro"
    ) {
      setTime(settings.pomodoroDur);
      setCurrentTimerAmount(settings.pomodoroDur);
    }
    if (
      !isTimerActive &&
      currentTimerAmount !== settings.shBreakDur &&
      realActivePeriod === "shBreak"
    ) {
      setTime(settings.shBreakDur);
      setCurrentTimerAmount(settings.shBreakDur);
    }
    if (
      !isTimerActive &&
      currentTimerAmount !== settings.lgBreakDur &&
      realActivePeriod === "lgBreak"
    ) {
      setTime(settings.lgBreakDur);
      setCurrentTimerAmount(settings.lgBreakDur);
    }
    if (
      !isTimerActive &&
      (realActivePeriod === "shBreak" || realActivePeriod === "lgBreak") &&
      data.length === 0 &&
      settings.isTaskTrackerOn
    ) {
      fullTimerReset();
    }
  });

  //time modes switching logic
  const switchIntervalMode = () => {
    if (realActivePeriod === "pomodoro") {
      setPomodoroIterations(pomodoroIterations + 1);
      if (pomodoroIterations === settings.iterationToLgBreak - 1) {
        setRealActivePeriod("lgBreak");
        setCurrentTimerAmount(settings.lgBreakDur);
        setTime(settings.lgBreakDur);
        setPomodoroIterations(0);
      } else {
        setRealActivePeriod("shBreak");
        setCurrentTimerAmount(settings.shBreakDur);
        setTime(settings.shBreakDur);
      }
    }
    if (realActivePeriod === "lgBreak" || realActivePeriod === "shBreak") {
      setRealActivePeriod("pomodoro");
      setCurrentTimerAmount(settings.pomodoroDur);
      setTime(settings.pomodoroDur);
    }
  };

  //timer logic
  useEffect(() => {
    if (!isClickable) {
      setIsTimerActive(false);
    }
    if (time !== 0) {
      if (isTimerActive) {
        setTimeout(() => {
          setTime(time - 1);
        }, 1);
      }
    } else if (time === 0) {
      setIsTimerActive(!isTimerActive);
      if (realActivePeriod === "pomodoro") {
        iteratePomodoro();
      }
      switchIntervalMode();
    }
    if (reset) {
      setTime(currentTimerAmount);
      setReset(false);
    }
  });

  //seconds to mm:ss parser
  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return {
      minutes: minutes >= 10 ? minutes : `0${minutes}`,
      seconds: seconds >= 10 ? seconds : `0${seconds}`,
    };
  };

  let timerStyle = {
    borderShadowAndTextColor: "white",
  };

  //styles for current mode
  if (isTimerActive) {
    switch (realActivePeriod) {
      case "pomodoro":
        timerStyle.borderShadowAndTextColor = "#FF3464";
        break;
      case "shBreak":
        timerStyle.borderShadowAndTextColor = "#64CCE4";
        break;
      case "lgBreak":
        timerStyle.borderShadowAndTextColor = "#ffffff";
        break;
    }
  }

  const timeObj = getTime(time);
  return (
    <>
      <MotionFlex
        mt="63px"
        borderRadius="63px"
        borderColor={timerStyle.borderShadowAndTextColor}
        borderWidth="2px"
        fontSize="22px"
        mx="auto"
        w="fit-content"
        flexDir="column"
        padding="17px 45px"
        letterSpacing="3px"
        color="rgb(255, 255, 255, 0.5)"
        animate={
          !isTimerActive
            ? {
                boxShadow: [
                  `0px 4px 0px -10px ${timerStyle.borderShadowAndTextColor}`,
                  `0px 4px 0px -10px ${timerStyle.borderShadowAndTextColor}`,
                  `0px 4px 0px -10px ${timerStyle.borderShadowAndTextColor}`,
                  `0px 4px 0px -10px ${timerStyle.borderShadowAndTextColor}`,
                  `0px 4px 0px -10px ${timerStyle.borderShadowAndTextColor}`,
                ],
                scale: [1, 1, 1, 1, 1],
              }
            : {
                boxShadow: [
                  `0px 4px 10px -10px ${timerStyle.borderShadowAndTextColor}`,
                  `0px 4px 40px -10px ${timerStyle.borderShadowAndTextColor}`,
                  `0px 4px 10px -10px ${timerStyle.borderShadowAndTextColor}`,
                  `0px 4px 40px -10px ${timerStyle.borderShadowAndTextColor}`,
                  `0px 4px 10px -10px ${timerStyle.borderShadowAndTextColor}`,
                ],
                scale: [1, 1.05, 1, 1.05, 1],
              }
        }
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Wrap spacing="82px">
          <MotionText
            color={
              realActivePeriod === "pomodoro" && isTimerActive
                ? ("mRed" as any)
                : null
            }
            textShadow={
              realActivePeriod === "pomodoro" && isTimerActive
                ? ("0px 5px 27px #FF3464" as any)
                : null
            }
          >
            pomodoro
          </MotionText>
          <MotionText
            color={
              realActivePeriod === "shBreak" && isTimerActive
                ? ("mCyian" as any)
                : null
            }
            textShadow={
              realActivePeriod === "shBreak" && isTimerActive
                ? ("0px 5px 27px #64CCE4" as any)
                : null
            }
          >
            short break
          </MotionText>
          <MotionText
            color={
              realActivePeriod === "lgBreak" && isTimerActive
                ? ("#ffffff" as any)
                : null
            }
            textShadow={
              realActivePeriod === "lgBreak" && isTimerActive
                ? ("0px 5px 27px #ffffff" as any)
                : null
            }
          >
            long break
          </MotionText>
        </Wrap>
      </MotionFlex>
      <MotionFlex
        borderRadius="360px"
        mt="76px"
        w="429px"
        h="429px"
        bgColor="mBlack"
        mx="auto"
        position="relative"
        backgroundClip="padding-box"
        border="solid 20px transparent"
        animate={
          !isTimerActive
            ? {
                boxShadow: [
                  "10px 17px 43px 7px #161617, -9px -12px 25px 1px #64CCE4",
                  "10px 17px 43px 7px #161617, -9px -12px 25px 1px #64CCE4",
                  "10px 17px 43px 7px #161617, -9px -12px 25px 1px #64CCE4",
                  "10px 17px 43px 7px #161617, -9px -12px 25px 1px #64CCE4",
                  "10px 17px 43px 7px #161617, -9px -12px 25px 1px #64CCE4",
                ],
              }
            : {
                boxShadow: [
                  "10px 17px 43px 7px #161617, -9px -12px 25px 1px #64CCE4",
                  "10px 17px 43px 14px #161617, -9px -12px 25px 5px #64CCE4",
                  "10px 17px 43px 7px #161617, -9px -12px 25px 1px #64CCE4",
                  "10px 17px 43px 14px #161617, -9px -12px 25px 5px #64CCE4",
                  "10px 17px 43px 7px #161617, -9px -12px 25px 1px #64CCE4",
                ],
              }
        }
        transition={{ repeat: Infinity, duration: 4 }}
        boxShadow="10px 17px 43px 7px #161617, -9px -12px 25px 1px #64CCE4"
        sx={{
          _before: {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            margin: "-20px",
            borderRadius: "inherit",
            background:
              "linear-gradient(159.43deg, #161617 21.79%, #FF3464 88.79%)",
          },
        }}
      >
        <AnimatePresence>
          {settings.isTaskTrackerOn && data.length === 0 ? (
            <MotionFlex
              position="absolute"
              key="noTasks"
              width="70%"
              color="white"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              fontSize="43px"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Add tasks first or disable it in settings
            </MotionFlex>
          ) : !isClickable ? (
            <MotionFlex
              position="absolute"
              key="icon"
              left="30%"
              alignSelf="center"
              animate={{
                opacity: [0, 1, 1, 1, 1, 0],
                rotate: [30, -20, 30, -10, 20, -30, 30],
              }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 7, repeat: Infinity }}
            >
              <Icon color="mCyian" w="160px" h="160px" as={FiTool} />
            </MotionFlex>
          ) : (
            <MotionFlex
              key="timer"
              flexDir="column"
              color="white"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mt="26px"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text fontSize="107px">
                {timeObj.minutes}:{timeObj.seconds}
              </Text>
              <MotionText
                onClick={() => {
                  setIsTimerActive(!isTimerActive);
                }}
                zIndex="2"
                whileHover={{ scale: 1.1 }}
                cursor="pointer"
                letterSpacing="6px"
                mt="-20px"
                fontSize="43px"
              >
                {time === currentTimerAmount && !isTimerActive
                  ? "start"
                  : isTimerActive
                  ? "pause"
                  : "continue"}
              </MotionText>
              {isTimerActive || time === currentTimerAmount ? null : (
                <MotionText
                  onClick={() => {
                    setReset(true);
                  }}
                  mb="-30px"
                  zIndex="2"
                  fontSize="20px"
                  cursor="pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.7 } }}
                  whileHover={{
                    color: "#64CCE4",
                    scale: 1.1,
                  }}
                >
                  reset
                </MotionText>
              )}
            </MotionFlex>
          )}
        </AnimatePresence>
        <CircularProgress
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          value={((time / currentTimerAmount) as any) * 100}
          size="420px"
          color="mCyian"
          trackColor="none"
          thickness="3px"
        />
      </MotionFlex>
    </>
  );
};
