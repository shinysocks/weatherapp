import { Moon } from "lunarphase-js";

const phaseEmoji = Moon.lunarPhaseEmoji();
const phase = Moon.lunarPhase();

const MoonPhase = () => {
  return (
    <div>
      <h1>{phaseEmoji}</h1>
      <h3>{phase}</h3>
    </div>
  );
}

export default MoonPhase;
