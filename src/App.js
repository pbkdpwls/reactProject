import './App.css';
import Todo from './Todo'
import AddTodo from './AddTodo.js';
import React from 'react';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar,  Typography } from "@material-ui/core";
import { call, signout } from './service/ApiService.js'
class App extends React.Component { // 리액트 컴포넌트, 클래스로 작성 시 render() 함수 작성 필요
  constructor(props) { // 생성자를 통해 매개변수를 Todo로 넘김
    super(props); // 부모로 부터 물려받은 props로 props 오브젝트 초기화
    this.state = {
      items: [],
      loading: true,
    };
  }
  // Api Service 사용
  componentDidMount() {
    call("/todo", "GET", null).then((response) => 
      this.setState({items:response.data, loading: false})
    );
  }

  add=(item)=>{
    call("/todo", "POST", item).then((response) => 
      this.setState({items:response.data, loading: false})
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) => 
      this.setState({items:response.data})
    );
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) => 
      this.setState({items:response.data})
    );
  };

  render(){
    // <Todo> 컴포넌트 배열 
    var todoItems = this.state.items.length > 0&& (
      <Paper stype={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => ( // item 초기화, js가 제공하는 map 함수를 이용해 배열을 반복해 <Todo... /> 컴포넌트 생성
            <Todo 
                item={item} 
                key={item.id}
                delete={this.delete}
                update={this.update}
            />
          ))}
        </List>
      </Paper>
    );
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
          </Grid>
          <Button color="inherit" onClick={signout}>
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>
    );
    var todoListPage=(
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    )
    var loadingPage=<h1>로딩중...</h1>;
    var content = loadingPage;
    if(!this.state.loading) {
      content=todoListPage;
    }
    return <div className='App'>{content}</div>;
     
    // jsx 리턴 (js, html 동시에 사용 가능한 js 문법)
    // return (
    //   <div className='App'>
    //     {navigationBar}
    //     <Container maxWidth="md">
    //       <AddTodo add={this.add}/>
    //       <div className='TodoList'>{todoItems}</div>
    //     </Container>
    //   </div>
    // );
  }
}

export default App;