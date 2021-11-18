import React from "react";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { Switch, Route, Redirect } from "react-router";
import { Col } from "react-bootstrap";
import ContentHeader from "./ContentHeader";
import Search from "./Search";
import BtnGoBack from "./BtnGoBack";
import NotesList from "./NotesList";
import NotesItemSelect from "./NotesItemSelect";
import NoteCreateForm from "./NoteCreateForm";
import Authorization from "./Authorization";
import NoteEditForm from "./NoteEditForm";
import FixedNotesListWraper from "./FixedNotesListWraper";
import ResetPassword from "./ResetPassword";
import "./styles/MainContentWraper.scss";
import "./styles/NotesList.scss";

const MainContentWraper: React.FC = () => {
  const { user } = useTypeSelector((state) => state);

  return (
    <Col className="mainContentWraper">
      <ContentHeader />
      <BtnGoBack />
    </Col>
  );
};

export default MainContentWraper;
