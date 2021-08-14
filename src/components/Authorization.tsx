import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { uploadPhoto } from '../http/firebase'
import { registration, login } from '../store/asyncActions'
import './styles/Authorization.scss'

interface AuthorizationProps {
    isReg?: boolean
}

interface IFileUrl {
    fileUrl: string | ArrayBuffer
}

const Authorization: React.FC<AuthorizationProps> = ({ isReg }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { authError, user } = useTypeSelector((state) => state)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [file, setFile] = useState<File>()
  const [fileUrl, setFileUrl] = useState<IFileUrl>()

  useEffect(() => {
    user.isLogin && history.push('/')
  }, [history, user.isLogin])

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f: any = e.target.files !== null && e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setFile(f)
      reader.result !== null && setFileUrl({fileUrl:reader.result})
    }
    reader.readAsDataURL(f)
  }

  const registrHandler = async () => {
    const url = await uploadPhoto(file)
    dispatch(registration(name, password, url))
  }

  return (
    !isReg ? (
      <Row className="authorization__container">
        <h2 className="authorization__container-title">Authorization</h2>
        <label className="authorization__container-label" htmlFor="login">Login</label>
        <input
          className="authorization__container-input"
          type="text"
          id="login"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="authorization__container-label" htmlFor="password">Password</label>
        <input
          className="authorization__container-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="authorization__container-label-error">{authError}</p>
        <button
          type="button"
          className="authorization__container-btn"
          onClick={() => dispatch(login(name, password))}
        >
          Login
        </button>
        <p>
          Dont have account?
          <Link to="/registration"><span className="authorization__container-span">Create account</span></Link>
        </p>
      </Row>
    )
      : (
        <Row className="authorization__container">
          <h2 className="authorization__container-title">Authorization</h2>
          <label className="authorization__container-label" htmlFor="login">Login</label>
          <input
            className="authorization__container-input"
            type="text"
            id="login"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="authorization__container-label" htmlFor="password">Password</label>
          <input
            className="authorization__container-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="authorization__container-label" htmlFor="password">Avatar</label>
          <input
            className="authorization__container-input"
            type="file"
            id="avatar"
            onChange={fileInputHandler}
          />
          {fileUrl ? (
            <div className="authorization__container-avatar">
              <img src={fileUrl.fileUrl.toString()} alt="avatar-preview" />
            </div>
          ) : (<p>Please select an Image for Preview</p>)}
          <p className="authorization__container-label-error">{authError}</p>
          <button
            type="button"
            className="authorization__container-btn"
            onClick={registrHandler}
          >
            Registration
          </button>
          <p>
            You have account?
            <Link to="/login"><span className="authorization__container-span">Login</span></Link>
          </p>
        </Row>
      )
  )
}

export default Authorization