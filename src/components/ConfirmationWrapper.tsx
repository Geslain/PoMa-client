import { Tooltip } from "@mui/material";
import React, { MouseEvent, ReactNode } from "react";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children: ReactNode;
  text: string;
};
export default function ConfirmationWrapper({
  onConfirm,
  onCancel,
  open,
  text,
  children,
}: Props) {
  function handleClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    onConfirm();
  }

  return (
    <Tooltip title={text} arrow open={open}>
      <div onClick={handleClick} onMouseLeave={onCancel} className={"w-fit"}>
        {children}
      </div>
    </Tooltip>
  );
}
