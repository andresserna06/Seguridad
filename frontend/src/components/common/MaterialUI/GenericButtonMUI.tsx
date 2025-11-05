// src/components/common/MaterialUI/GenericButtonMUI.tsx
import React from "react";
import { Button } from "@mui/material";

interface GenericButtonProps {
  label: string;
  onClick: () => void;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  sx?: object; // para estilos adicionales
}

const GenericButtonMUI: React.FC<GenericButtonProps> = ({
  label,
  onClick,
  color = "primary",
  variant = "contained",
  size = "medium",
  fullWidth = false,
  sx = {},
}) => {
  return (
    <Button 
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{ ...sx }}
    >
      {label}
    </Button>
  );
};

export default GenericButtonMUI;
