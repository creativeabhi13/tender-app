import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Button,
} from "@mui/material";

const API_URL = "http://localhost:5000/api/tenders"; // Change if needed

const TenderList = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenders();
    const interval = setInterval(fetchTenders, 30000); // Refresh every 30 sec
    return () => clearInterval(interval);
  }, []);

  const fetchTenders = async () => {
    try {
      const response = await axios.get(API_URL);
      setTenders(response.data);
    } catch (error) {
      console.error("Error fetching tenders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Tender Listings
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {tenders.map((tender) => (
            <Grid item xs={12} sm={6} md={4} key={tender.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">{tender.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {tender.summary}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Closing Date:</strong> {tender.closingDate}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    fullWidth
                    component={Link}
                    to={`/tender/${tender.id}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TenderList;
