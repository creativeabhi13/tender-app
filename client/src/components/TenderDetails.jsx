import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

const API_URL = "http://localhost:5000/api/tenders";

const TenderDetails = () => {
  const { id } = useParams();
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((response) => {
        setTender(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tender details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (!tender) return <Typography align="center">Tender not found</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">{tender.title}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Summary:</strong> {tender.summary}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Description:</strong> {tender.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Start Date:</strong> {tender.startDate}
          </Typography>
          <Typography variant="body2">
            <strong>Closing Date:</strong> {tender.closingDate}
          </Typography>
          <Typography variant="body2">
            <strong>Department:</strong> {tender.department}
          </Typography>
          <Typography variant="body2">
            <strong>Contact:</strong> {tender.contact}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
            component={Link}
            to="/"
          >
            Back to List
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TenderDetails;
