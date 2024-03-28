import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

type Props = {
  onSubmit: (value: string) => void;
  text: string;
  variant: React.ComponentProps<typeof Typography>["variant"];
};
export default function EditableTitle({ text, onSubmit }: Props) {
  const [isOver, setIsOver] = useState(false);

  const inputRef = useRef<HTMLSpanElement>(null);

  function handleClick() {
    setIsOver(false);
  }

  function handleChange(e: ChangeEvent<HTMLSpanElement>) {
    const newText = e.currentTarget.textContent;
    if (newText && newText !== text) {
      setIsOver(false);
      onSubmit(newText);
      toast("The project has been updated with great success ! 🎉");
    }
  }

  function handleMouseEnter() {
    setIsOver(true);
  }

  function handleMouseLeave() {
    setIsOver(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLSpanElement>) {
    if (e.type === "keydown" && e.key === "Enter") {
      inputRef.current?.blur();
    }
  }

  return (
    <div className={"flex flex-row"}>
      <Typography
        variant="h1"
        gutterBottom
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onBlur={handleClick}
      >
        <span
          ref={inputRef}
          className={`${isOver ? "border-blue-400 rounded-md" : " border-transparent"} border p-2`}
          role="textbox"
          style={{ width: "auto" }}
          onBlur={handleChange}
          onKeyDown={handleKeyDown}
          contentEditable
          suppressContentEditableWarning={true}
        >
          {text}
        </span>
      </Typography>
      <EditIcon />
    </div>
  );
}
