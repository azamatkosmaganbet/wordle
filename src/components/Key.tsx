import React, { FC, useContext } from "react";
import { AppContext } from "../App";

interface KeyProps {
  keyVal: string;
  bigKey?: boolean;
  disabled?: boolean;
}

const Key: FC<KeyProps> = ({ keyVal, bigKey, disabled }) => {
  const { onEnter, onDeleteLetter, onSelectLetter } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDeleteLetter();
    } else {
      onSelectLetter(keyVal);
    }
  };

  return (
    <div
      className={`key ${bigKey ? "big" : disabled && "disabled"}`}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
};

export default Key;
