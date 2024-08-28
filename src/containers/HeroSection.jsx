import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={2}></Grid>
            <Grid item xs={12} md={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" color={'red'}>
                            <ReactTyped
                                strings={[
                                    "Coding",
                                    "Learning",
                                    "and much more...",
                                ]}
                                typeSpeed={40}
                                backSpeed={50}
                                loop
                            >
                            </ReactTyped>
                        </Typography>
                        <Typography variant='h1' sx={{ mb: 2, fontSize: { xs: '4rem', sm: '6rem' } }}>
                            <ReactTyped strings={["Interactive Live Coding \nand Teaching Platform"]} typeSpeed={40} />
                        </Typography>
                        <Button component={Link} to="/register" variant="contained">Get started</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    )
}
