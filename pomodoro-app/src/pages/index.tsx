import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Logo } from "../components/Logo";
import { BsFillGearFill } from "react-icons/bs";
import { Timer } from "../components/Timer";
import { Settings } from "../components/Settings";
import { AnimatePresence, motion } from "framer-motion";
import { Plans } from "../components/Plans";

const MotionFlex = motion(Flex);

const getData = (tag: string) => {
  const localStorage = window && window.localStorage;
  const data = JSON.parse(localStorage.getItem(tag) as any);

  if (data) {
    return data;
  } else {
    return -1;
  }
};
const Index = () => {
  const [settings, setSettings] = useState(
    getData("settings") !== -1
      ? getData("settings")
      : {
          pomodoroDur: 25 * 60,
          shBreakDur: 5 * 60,
          lgBreakDur: 15 * 60,
          iterationToLgBreak: 4,
          isTaskTrackerOn: true,
        }
  );
  const [data, setData]: any = useState(
    getData("data") !== -1 ? getData("data") : []
  );
  const [showSettings, setShowSettings] = useState(false);
  let localStorage: any = null;
  if (window) {
    localStorage = window.localStorage;
  }

  const addPlan = (body: string, pomodorosToFinish: number) => {
    const dataTemp = [...data];
    dataTemp.push({ body, pomodorosToFinish });
    setData(dataTemp);
  };

  const deletePlan = (index: number) => {
    const dataTemp = [...data.slice(0, index), ...data.slice(index + 1)];
    setData(dataTemp);
  };

  const updatePlan = (
    index: number,
    plan: { body?: string; pomodorosToFinish?: number }
  ) => {
    const dataTemp = [...data];
    if (plan.body) {
      dataTemp[index].body = plan.body;
    }
    if (plan.pomodorosToFinish) {
      dataTemp[index].pomodorosToFinish = plan.pomodorosToFinish;
    }
    setData(dataTemp);
  };

  const iteratePomodoro = () => {
    if (data && data.length) {
      const dataTemp = [...data];
      if (dataTemp[0].pomodorosToFinish === 1) {
        dataTemp.shift();
      } else {
        dataTemp[0].pomodorosToFinish -= 1;
      }

      setData(dataTemp);
    }
  };

  const saveDataToStore = () => {
    if (localStorage !== null) {
      localStorage.setItem("settings", JSON.stringify(settings));
      if (data !== null) {
        localStorage.setItem("data", JSON.stringify(data));
      }
    }
  };

  useEffect(() => {
    console.log(data);
    saveDataToStore();
  });
  return (
    <Layout>
      <Flex alignItems="center">
        <Logo />
        <Flex>
          <MotionFlex
            zIndex={3}
            animate={
              showSettings
                ? {
                    rotate: 360,
                    filter: [
                      "drop-shadow(1px 5px 11px #FF3464)",
                      "drop-shadow(1px -5px 11px #FF3464)",
                      "drop-shadow(1px 5px 11px #FF3464)",
                    ],
                  }
                : {
                    rotate: 0,
                    filter: [
                      "drop-shadow(1px 5px 11px #FF3464)",
                      "drop-shadow(1px -6px 11px #FF3464)",
                      "drop-shadow(1px 5px 11px #FF3464)",
                    ],
                  }
            }
            transition={{ type: "spring", stiffness: 50 }}
            w="58px"
            h="58px"
            mt="42px"
            mr="-32px"
          >
            <Icon
              as={BsFillGearFill}
              onClick={() => setShowSettings(!showSettings)}
              cursor="pointer"
              position="relative"
              color="white"
              w="100%"
              h="100%"
            />
          </MotionFlex>
          <AnimatePresence>
            {!showSettings ? null : (
              <Settings
                settings={settings}
                setSettings={(value) => setSettings(value)}
              />
            )}
          </AnimatePresence>
        </Flex>
      </Flex>
      <Timer
        data={data}
        isClickable={!showSettings}
        settings={settings}
        iteratePomodoro={() => iteratePomodoro()}
      />
      {!settings.isTaskTrackerOn ? null : (
        <Plans
          updatePlan={(index, plan) => updatePlan(index, plan)}
          addPlan={(body, pomodorosToFinish) =>
            addPlan(body, pomodorosToFinish)
          }
          deletePlan={(index) => deletePlan(index)}
          data={data}
        />
      )}
    </Layout>
  );
};

export default Index;
