import React from 'react';
import { ListItem, ListItemText, InputBase, 
  Checkbox, ListItemSecondaryAction, IconButton 
} from "@material-ui/core";
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

class Todo extends React.Component {
  // 생성자
  constructor(props) {
    super(props); // 부모 호출
    this.state = {item:props.item, readOnly:true}; // 부모(Props)가 넘겨준 아이템, 수정을 위핸 readOnly
    this.delete = props.delete;
    this.update = props.update;
  }
  // 함수 추가
  deleteEventHandler = () => {
    this.delete(this.state.item)
  }

  offReadOnlyMode = () => {
    console.log("Event!", this.state.readOnly)
    this.setState({readOnly: false},  () => {
      console.log("ReadOnly?", this.state.readOnly)
    });
  }

  enterKeyEventHandler = (e) => {
    if(e.key==="Enter") {
      this.setState({readOnly:true});
      this.update(this.state.item);
    }
  }

  editEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({item:thisItem})
  }

  checkboxEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.done = !thisItem.done;
    this.setState({item:thisItem});
    this.update(this.state.item);
  }

  render() {
    const item = this.state.item;
    return(
      <ListItem>
        <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
        <ListItemText>
          <InputBase
            inputProps={{"aria-label":"naked", readOnly: this.state.readOnly}}
            onClick={this.offReadOnlyMode}
            onChange={this.editEventHandler}
            onKeyPress={this.enterKeyEventHandler}
            type="text"
            id={item.id}
            name={item.name}
            value={item.title}
            multiline={true}
            fullWidth={true}
        />
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete Todo"
            onClick={this.deleteEventHandler}>
              <DeleteOutlined/>
            </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );

  }

}

export default Todo;


