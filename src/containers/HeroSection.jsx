import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid item xs={4}></Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ backgroundColor: 'background.blur', backdropFilter: 'blur(10px)' }}>
                    <CardContent>
                        <Typography variant="h6" color={'primary'} sx={{ textShadow: '0px 0px 10px white' }}>
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
                        <Typography variant='h1' sx={{ mb: 2, fontSize: { xs: '4rem', sm: '4rem' } }}>
                            <ReactTyped strings={["Interactive Live Coding \n<br>and Teaching Platform"]} typeSpeed={40} />
                        </Typography>
                        <Button component={Link} to="/register" variant="contained">Get started</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
    )
}
