/** @jsxImportSource @emotion/react */
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import axios from 'axios';
import * as s from './s.styles';
import logo from '../../assets/logo.jpg';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [emailChecked, setEmailChecked] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [commonError, setCommonError] = useState('');

  const nicknameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const setFieldError = (name, message) => {
    setFieldErrors((prev) => ({ ...prev, [name]: message }));
  };

  const clearErrors = () => {
    setFieldErrors({
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
    setCommonError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldError(name, '');
    }
  };

  const validate = () => {
    const errors = {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };

    if (!formData.nickname.trim()) {
      errors.nickname = '닉네임을 입력해주세요.';
    } else if (formData.nickname.trim().length < 2) {
      errors.nickname = '닉네임은 2자 이상이어야 합니다.';
    }

    if (!formData.email.trim()) {
      errors.email = '이메일을 입력해주세요.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = '이메일 형식이 올바르지 않습니다.';
      }
    }

    if (!formData.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 4) {
      errors.password = '비밀번호는 4자 이상이어야 합니다.';
    }

    if (!formData.passwordConfirm) {
      errors.passwordConfirm = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    setFieldErrors(errors);
    return !Object.values(errors).some((v) => v);
  };

  const handleCheckEmail = async () => {
    if (!formData.email.trim()) {
      setFieldError('email', '이메일을 입력해주세요.');
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/auth/check-email?email=${formData.email}`
      );

      setEmailChecked(true);
      setEmailCheckMessage(res.data);
      setFieldError('email', '');
    } catch (err) {
      setEmailChecked(false);
      setEmailCheckMessage('');
      setFieldError(
        'email',
        err?.response?.data || '이미 사용 중인 이메일입니다.'
      );
    }
  };

  const handleSignup = async () => {
    clearErrors();

    if (!validate()) return;

    if (!emailChecked) {
      setFieldError('email', '이메일 중복확인을 해주세요.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/auth/signup', {
        email: formData.email.trim(),
        password: formData.password,
        nickname: formData.nickname.trim(),
      });

      alert('회원가입 성공!');
      navigate('/login');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        '회원가입 실패';

      if (typeof msg === 'string' && msg.includes('이메일')) {
        setFieldError('email', msg);
        return;
      }

      setCommonError(typeof msg === 'string' ? msg : '회원가입 실패');
    }
  };

  const handleKeyDown = (e, nextRef, isLast = false) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (isLast) {
        handleSignup();
      } else {
        nextRef?.current?.focus();
      }
    }
  };

  return (
    <div css={s.container}>
      <div css={s.signupBox}>
        <div css={s.logoBox}>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="logo" css={s.logo} />
          </Link>
        </div>

        <h1 css={s.title}>회원가입</h1>

        <div css={s.formBox}>
          <input
            ref={nicknameRef}
            type="text"
            name="nickname"
            placeholder="닉네임 입력"
            css={s.input}
            value={formData.nickname}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
          />
          {fieldErrors.nickname && (
            <div css={s.errorText}>{fieldErrors.nickname}</div>
          )}

          <div css={s.emailWrapper}>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="이메일(sample@email.com)"
              css={s.emailInput}
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
                setEmailChecked(false);
                setEmailCheckMessage('');
              }}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            />

            <button
              type="button"
              css={s.checkBtnAbsolute}
              onClick={handleCheckEmail}
            >
              중복확인
            </button>
          </div>

          {fieldErrors.email && (
            <div css={s.errorText}>{fieldErrors.email}</div>
          )}

          {emailChecked && (
            <div css={s.successText}>{emailCheckMessage}</div>
          )}

          <input
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            css={s.input}
            value={formData.password}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, passwordConfirmRef)}
          />
          {fieldErrors.password && (
            <div css={s.errorText}>{fieldErrors.password}</div>
          )}

          <input
            ref={passwordConfirmRef}
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            css={s.input}
            value={formData.passwordConfirm}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, null, true)}
          />
          {fieldErrors.passwordConfirm && (
            <div css={s.errorText}>{fieldErrors.passwordConfirm}</div>
          )}

          {commonError && (
            <div css={s.errorText} style={{ marginTop: 8 }}>
              {commonError}
            </div>
          )}

          <button css={s.btn} onClick={handleSignup}>
            회원가입
          </button>

          <div css={s.linkBox}>
            <span css={s.linkText}>이미 계정이 있으신가요?</span>
            <Link to="/login" css={s.link}>
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}