import {Component} from 'react'
import {v4} from 'uuid'

import {
  MainContainer,
  CreateTaskDiv,
  CreateForm,
  FormHeading,
  LabelInputDiv,
  Label,
  Input,
  SelectInput,
  OptionInput,
  FormBtn,
  AddTaskDiv,
  MainHeading,
  TagListUl,
  TagList,
  TagBtn,
  TaskUl,
  TaskListLi,
  TaskText,
  TaskTag,
  NoTaskText,
} from './style'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    inputTask: '',
    inputTag: tagsList[0].optionId,
    taskList: [],
    activeTag: 'initial',
  }

  handleInput = event => {
    this.setState({inputTask: event.target.value})
  }

  handleTag = event => {
    this.setState({inputTag: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const {inputTask, inputTag} = this.state
    const newTask = {
      id: v4(),
      task: inputTask,
      tag: inputTag,
    }
    if (inputTask.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        inputTask: '',
        inputTag: '',
      }))
    }
  }

  handleActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'initial'
          : event.target.value,
    }))
  }

  renderCreateTaskView = () => {
    const {inputTask, inputTag} = this.state

    return (
      <CreateTaskDiv>
        <CreateForm onSubmit={this.handleSubmit}>
          <FormHeading>Create a Task!</FormHeading>
          <LabelInputDiv>
            <Label htmlFor="inputTask">Task</Label>
            <Input
              id="inputTask"
              type="text"
              placeholder="Enter the task here"
              value={inputTask}
              onChange={this.handleInput}
            />
          </LabelInputDiv>
          <LabelInputDiv>
            <Label htmlFor="selectTag">Tags</Label>
            <SelectInput
              onChange={this.handleTag}
              value={inputTag}
              id="selectTag"
            >
              {tagsList.map(eachTag => (
                <OptionInput value={eachTag.optionId} key={eachTag.optionId}>
                  {eachTag.displayText}
                </OptionInput>
              ))}
            </SelectInput>
          </LabelInputDiv>
          <FormBtn type="submit">Add Task</FormBtn>
        </CreateForm>
      </CreateTaskDiv>
    )
  }

  renderTaskCard = () => {
    const {taskList, activeTag} = this.state
    const filteredTaskList =
      activeTag === 'initial'
        ? taskList
        : taskList.filter(eachTask => eachTask.tag === activeTag)

    return (
      <>
        {filteredTaskList.map(eachTask => (
          <TaskListLi key={eachTask.id}>
            <TaskText>{eachTask.task}</TaskText>
            <TaskTag>{eachTask.tag}</TaskTag>
          </TaskListLi>
        ))}
      </>
    )
  }

  renderAddTaskView = () => {
    const {taskList, activeTag} = this.state

    return (
      <AddTaskDiv>
        <MainHeading>Tags</MainHeading>
        <TagListUl>
          {tagsList.map(each => {
            const isActive = activeTag === each.optionId
            return (
              <TagList key={each.optionId}>
                <TagBtn
                  type="button"
                  value={each.optionId}
                  onClick={this.handleActiveTag}
                  isActive={isActive}
                >
                  {each.displayText}
                </TagBtn>
              </TagList>
            )
          })}
        </TagListUl>
        <MainHeading>Tasks</MainHeading>
        <TaskUl>
          {taskList.length === 0 ? (
            <NoTaskText>No Tasks Added Yet</NoTaskText>
          ) : (
            this.renderTaskCard()
          )}
        </TaskUl>
      </AddTaskDiv>
    )
  }

  render() {
    return (
      <MainContainer>
        {this.renderCreateTaskView()}
        {this.renderAddTaskView()}
      </MainContainer>
    )
  }
}

export default MyTasks
