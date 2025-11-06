import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

export interface InfoItem {
  label: string;
  value: string | number;
}

export interface Action {
  label: string;
  onClick: () => void;
  color?: "primary" | "error" | "success" | "inherit";
}

interface GenericCardProps {
  title: string;
  info?: InfoItem[];
  url?: string;
  actions?: Action[];
  emptyState?: { label: string; onAdd: () => void };
}

const GenericInfoCardMUI: React.FC<GenericCardProps> = ({
  title,
  info = [],
  url,
  actions = [],
  emptyState,
}) => {
  return (
    <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom textAlign="center">
          {title}
        </Typography>

        {url && (
          <Box
            sx={{
              mt: 2,
              mb: 2,
              width: "100%",
              height: 250,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <iframe
              src={url}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </Box>
        )}

        {info.length > 0 ? (
          info.map((item, idx) => (
            <Box
              key={idx}
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body1" fontWeight="bold">
                {item.label}:
              </Typography>
              <Typography variant="body1">{item.value}</Typography>
            </Box>
          ))
        ) : emptyState ? (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body1">{emptyState.label}</Typography>
            <Button
              variant="contained"
              color="success"
              onClick={emptyState.onAdd}
              sx={{ mt: 2 }}
            >
              Agregar
            </Button>
          </Box>
        ) : null}

        {actions.length > 0 && (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            {actions.map((action, idx) => (
              <Button
                key={idx}
                variant="contained"
                color={action.color || "primary"}
                onClick={action.onClick}
                sx={{ mr: 1 }}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default GenericInfoCardMUI;
