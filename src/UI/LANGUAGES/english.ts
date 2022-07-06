const english = {
  SideBar: {
    QuickLinks: "QuickLinks",
    Home: "Home",
    Notes: "Notes",
    Collective: "Collective",
    Groups: "Groups",
  },
  NoteList: {
    SearchAtr: "search atributes...",
    AllNotes: "All notes",
    FilteredNotes: "Filtered notes",
    PinnedNotes: "Pinned notes",
  },
  NoteOptions: {
    Pin: "Pin note",
    Unpin: "Unpin note",
    Copy: "Copy note",
    Delete: "Delete note",
  },
  Modals: {
    PasteURLImage: "Paste URl image",
    CreateNewGroup: "Create new group",
    CreateNewGroup_GroupName: "group name...",
    CreateNewGroup_Create: "Create",
    DeleteGroup: "Delete group?",
    DeleteGroup_Info: (groupName: string, groupsCount: number) =>
      `The ${groupName} group and ${groupsCount} notes will be deleted`,
    DeleteGroup_Yes: "Delete",
    DeleteGroup_No: "Cancel",
  },
  MainPage: {
    Notes: "Notes",
  },
  CreatePage: {
    WriteTitle: "Write title note",
    UnselectGroup: "Select group",
    Create: "Create",
  },
  LoginPage: {
    Login: "Login",
    LoginPlaceholder: "Login or Email",
    PasswordPlaceholder: "Password",
    LoginButton: "Login",
    HaveAccount: "You have account?",
    ForgotPassword: "Forgot password?",
    RegistrationTitle: "Registration",
    ResetPasswordTitle: "Reset password",
  },
};

export default english;
