import React from 'react'
import { Switch, Route } from 'react-router'
import { Col } from 'react-bootstrap'
import ContentHeader from './ContentHeader'
import Search from './Search'
import BtnGoBack from './BtnGoBack'
import NotesList from './NotesList'
import NotesItemSelect from './NotesItemSelect'
import NoteCreateForm from './NoteCreateForm'
import Authorization from './Authorization'
import NoteEditForm from './NoteEditForm'
import FixedNotesListWraper from './FixedNotesListWraper'
import './styles/NotesList.scss'

const MainContentWraper: React.FC = () => (
  <Col>
    <ContentHeader />
    <BtnGoBack />
    <div className="notesList__main_container">
      <Switch>
        <Route exact path="/">
          <Search />
          <FixedNotesListWraper />
          <NotesList />
        </Route>
        <Route path="/registration">
          <Authorization isReg />
        </Route>
        <Route path="/login">
          <Authorization />
        </Route>
        <Route path="/note/create">
          <NoteCreateForm />
        </Route>
        <Route exact path="/note/:noteId">
          <NotesItemSelect />
        </Route>
        <Route exact path="/note/edit/:noteId">
          <NoteEditForm />
        </Route>
        <Route path="/search">
          <NotesList search />
        </Route>
      </Switch>
    </div>
  </Col>
)

export default MainContentWraper