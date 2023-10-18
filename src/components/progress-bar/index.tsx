import { on } from "events";
import React, { memo, useState, useCallback, useRef, useEffect } from "react";

interface ProgressBarProps {
  vertical?: boolean;
  round?: boolean;
  percent: number;
  onInput?: (percent: number) => void;
  onChange?: (percent: number) => void;
  barWidth?: string;
  pointSize?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = memo(
  ({
    vertical = false,
    round = false,
    percent,
    onInput = () => {},
    onChange = () => {},
    barWidth = "2px",
    pointSize = "10px",
  }) => {
    const progressBarRef = useRef<HTMLDivElement | null>(null);
    const handleRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState<number>(() =>
      Math.min(100, Math.max(0, percent))
    );
    const [isDragging, setDragging] = useState(false);

    useEffect(() => {
      if (!isDragging) {
        setProgress(Math.min(100, Math.max(0, percent)));
      }
    }, [isDragging, percent]);

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging || !progressBarRef.current || !handleRef.current)
          return;

        const progressBarRect = progressBarRef.current.getBoundingClientRect();
        const handleRect = handleRef.current.getBoundingClientRect();

        let newPercent: number;

        if (vertical) {
          const offsetY = progressBarRect.bottom - e.clientY;
          newPercent = (offsetY / progressBarRect.height) * 100;
        } else {
          const offsetX = e.clientX - progressBarRect.left;
          newPercent = (offsetX / progressBarRect.width) * 100;
        }
        newPercent = Math.min(
          100,
          Math.max(0, Math.round(newPercent * 100) / 100)
        );
        setProgress(newPercent);
        onInput(newPercent);
      },
      [vertical, isDragging, onInput]
    );

    function handleMouseUp() {
      if (isDragging) {
        onChange(progress);
        setDragging(false);
      }
    }

    function handleMouseDown() {
      setDragging(true);
    }

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      if (!progressBarRef.current) return;
      const progressBarRect = progressBarRef.current.getBoundingClientRect();
      const targetRect = e.currentTarget.getBoundingClientRect();

      let newPercent: number;
      if (vertical) {
        const offsetY = targetRect.top + targetRect.height - e.clientY;
        newPercent = (offsetY / targetRect.height) * 100;
      } else {
        const offsetX = e.clientX - targetRect.left;
        newPercent = (offsetX / progressBarRect.width) * 100;
      }
      newPercent = Math.min(
        100,
        Math.max(0, Math.round(newPercent * 100) / 100)
      );
      setProgress(newPercent);
      onInput(newPercent);
      onChange(newPercent);
    }

    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [handleMouseMove, handleMouseUp]);

    return (
      <div
        className="bg-[#e5e5e5] relative"
        ref={progressBarRef}
        style={{
          width: vertical ? barWidth : "100%",
          height: vertical ? "100%" : barWidth,
          borderRadius: round ? "9999px" : "0",
        }}
      >
        <div
          className="absolute left-0 bottom-0 bg-primary "
          style={{
            height: vertical ? `${progress}%` : "100%",
            width: vertical ? "100%" : `${progress}%`,
            borderRadius: round ? "9999px" : "0",
          }}
        ></div>
        <div
          className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{
            width: vertical ? pointSize : "100%",
            height: vertical ? "100%" : pointSize,
          }}
          onClick={handleClick}
        >
          <div
            className="absolute bg-primary rounded-full cursor-grab"
            ref={handleRef}
            style={{
              width: pointSize,
              height: pointSize,
              transform: vertical ? `translateY(50%)` : `translateX(-50%)`,
              left: vertical ? "0" : `${progress}%`,
              bottom: vertical ? `${progress}%` : "0",
            }}
            onMouseDown={handleMouseDown}
          ></div>
        </div>
      </div>
    );
  }
);

export default ProgressBar;
