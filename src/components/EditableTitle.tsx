import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  onSubmit: (value: string) => void;
  text: string;
  variant: React.ComponentProps<typeof Typography>["variant"];
};

/**
 * A Component to visually edit a title
 *
 * @param text
 * @param onSubmit
 * @constructor
 */
export default function EditableTitle({ text, onSubmit }: Props) {
  const [isOver, setIsOver] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const inputRef = useRef<HTMLSpanElement>(null);
  const inputValue = useRef("");

  useEffect(() => {
    if (inputRef.current?.innerText && !inputValue.current) {
      inputValue.current = inputRef.current.innerText;
    }
  }, []);

  function handleFocus() {
    setIsEdited(true);
    setIsOver(false);
  }

  function handleIconClick() {
    const input = inputRef.current,
      selection = window.getSelection(),
      range = document.createRange();

    // Select all the text instead of placing cursor at start
    if (selection?.type === "Range") {
      selection?.removeAllRanges();
      inputRef.current?.blur();
    } else if (input) {
      range.setStart(input, 0);
      range.setEnd(input, inputRef.current.innerText.length ? 1 : 0);
      selection?.removeAllRanges();
      selection?.addRange(range);
      inputRef.current?.focus();
    }
  }

  function handleBlur(e: ChangeEvent<HTMLSpanElement>) {
    const newText = e.currentTarget.textContent;
    if (newText && newText !== text) {
      onSubmit(newText);
      inputValue.current = newText;
    }

    if (newText === "" && inputRef.current) {
      inputRef.current.innerText = inputValue.current;
    }

    setIsOver(false);
    setIsEdited(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLSpanElement>) {
    if (e.type === "keydown" && inputRef.current) {
      switch (e.key) {
        case "Escape":
          inputRef.current.innerText = inputValue.current;
        case "Enter":
          inputRef.current?.blur();
          break;
      }
    }
  }

  function handleMouseEnter() {
    setIsOver(true);
  }

  function handleMouseLeave() {
    setIsOver(false);
  }

  return (
    <div
      className={"flex flex-row w-fit"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Typography variant="h1" gutterBottom>
        <span
          ref={inputRef}
          className={`${isOver ? "border-blue-400 rounded-md" : " border-transparent"} border p-2`}
          role="textbox"
          style={{ width: "auto" }}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          contentEditable
          suppressContentEditableWarning={true}
        >
          {text}
        </span>
      </Typography>
      <div>
        <IconButton
          sx={{
            backgroundColor: isEdited ? "primary.main" : "white",
            color: isEdited ? "white" : "primary.main",
            "&:hover": {
              backgroundColor: isEdited ? "primary.dark" : "grey-100",
            },
          }}
          className={"-mt-2 ml-2"}
          color={"info"}
          onClick={handleIconClick}
        >
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
}
