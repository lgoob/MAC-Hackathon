import { useState } from "react";

function Clock() {
  let time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(time);
  };
  setInterval(UpdateTime);
  return (
    <h1 class="text-9xl tracking-wide  font-sans font-black slashed-zero text-white">
      {ctime}
    </h1>
  );
}

export default Clock;
