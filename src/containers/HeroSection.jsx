import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { ReactTyped } from "react-typed";

export default function HeroSection() {
    return (
        <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={4}></Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h3" color={'red'}>
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
                        <Typography variant="h1">
                            <ReactTyped strings={["Interactive Live Coding \nand Teaching Platform"]} typeSpeed={40} />
                        </Typography>
                        <Button variant="contained">Get started</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
    )
}
