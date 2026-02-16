import { useState, useCallback } from "react";

export type SimStage = "waiting" | "sunlight" | "water" | "co2" | "light-reaction" | "calvin-cycle" | "completed";

export function useSimulation() {
  const [stage, setStage] = useState<SimStage>("waiting");
  const [sunlightActive, setSunlightActive] = useState(false);
  const [waterActive, setWaterActive] = useState(false);
  const [co2Active, setCo2Active] = useState(false);
  const [showChloroplast, setShowChloroplast] = useState(false);
  const [oxygenCount, setOxygenCount] = useState(0);
  const [glucoseCount, setGlucoseCount] = useState(0);
  const [showExplanations, setShowExplanations] = useState(true);

  const activateSunlight = useCallback(() => {
    if (stage !== "waiting") return;
    setSunlightActive(true);
    setStage("sunlight");
  }, [stage]);

  const activateWater = useCallback(() => {
    if (stage !== "sunlight") return;
    setWaterActive(true);
    setStage("water");
  }, [stage]);

  const activateCO2 = useCallback(() => {
    if (stage !== "water") return;
    setCo2Active(true);
    setStage("co2");
    setTimeout(() => {
      setShowChloroplast(true);
      setStage("light-reaction");
      setTimeout(() => {
        setOxygenCount(6);
        setStage("calvin-cycle");
        setTimeout(() => {
          setGlucoseCount(1);
          setStage("completed");
        }, 3000);
      }, 3000);
    }, 2000);
  }, [stage]);

  const reset = useCallback(() => {
    setStage("waiting");
    setSunlightActive(false);
    setWaterActive(false);
    setCo2Active(false);
    setShowChloroplast(false);
    setOxygenCount(0);
    setGlucoseCount(0);
  }, []);

  return {
    stage, sunlightActive, waterActive, co2Active, showChloroplast,
    oxygenCount, glucoseCount, showExplanations,
    activateSunlight, activateWater, activateCO2, reset, setShowExplanations,
  };
}
