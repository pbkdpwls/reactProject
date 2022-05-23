import React from "react";
import {signin} from "./service/ApiService"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography";
import { Container,Link } from "@material-ui/core";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) { // this.~ 로 코딩 
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");
        signin({email:email, password:password});
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" stype={{marginTop:"8%"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                    </Grid>
                </Grid>
                <form noValidate onSubmit={this.handleSubmit}>
                    {" "}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="email"
                                label="이메일 주소"
                                id="email"
                                autoComplete="email"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" 
                        fullWidth 
                        variant="contained" 
                        color="primary">
                            로그인
                        </Button>
                    </Grid>
                    <Link href="/signup" variant="body2">
                        <Grid item>계정이 없습니까? 여기서 가입하세요.</Grid>
                    </Link>
                </form>
            </Container>
        )
    }
}

export default Login;