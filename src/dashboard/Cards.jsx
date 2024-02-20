import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import SpringModal from "./SpringModal";

export default function Cards({ image, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Card className="EnvCard" sx={{ width: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title={title} />
      <CardActions>
        <Button
          size="large"
          onClick={() =>
            navigate("/create-coding-env", {
              state: { fromMainPage: true, env: title },
            })
          }
        >
          Create
        </Button>
        <Button size="large" onClick={() => setIsOpen(true)}>
          Learn More
        </Button>
        <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} tag={title} />
      </CardActions>
    </Card>
  );
}
