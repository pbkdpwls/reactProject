import React from "react";
import { TextField, Paper, Button, Grid} from "@material-ui/core";


class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {item : {title:""}}; // 사용자의 입력을 저장할 오브젝트
        this.add=props.add; // props의 함수를 this.add에 연결
    }

    onInputChange = (e) => { // 입력할때마다
        const thisItem=this.state.item;
        thisItem.title = e.target.value; // 이벤트가 발생한 곳의 value 값 item의 title에 저장
        this.setState({item:thisItem}); // 업데이트
        console.log(thisItem);
    }

    onButtonClick = () => { // 버튼 클릭 시
        this.add(this.state.item)
        this.setState({item:{title:""}});

    }

    enterKeyEventHandler = (e) => { // 엔터 시
        if(e.key === 'Enter'){
            this.onButtonClick();
        }
    }

    render() {
        return (
            <Paper style={{margin:16, padding:16}}>
                <Grid container> 
                    <Grid xs = {11} md={11} item style={{paddingRight:16}}>
                        <TextField placeholder="Add Todo here" fullWidth 
                        onChange={this.onInputChange} 
                        value={this.state.item.title}
                        onKeyPress={this.enterKeyEventHandler}/>
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button fullWidth color="secondary" variant="contained" 
                        onClick={this.onButtonClick}>
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default AddTodo;