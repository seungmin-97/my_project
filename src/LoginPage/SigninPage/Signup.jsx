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

  // ✅ 필드별 에러
  const [fieldErrors, setFieldErrors] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  // 상태 추가
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState('');

  // ✅ 공통(서버 등) 에러
  const [commonError, setCommonError] = useState('');

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

    // 입력하면 해당 필드 에러는 즉시 지우기
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

    // nickname
    if (!formData.nickname.trim()) {
      errors.nickname = '닉네임을 입력해주세요.';
    } else if (formData.nickname.trim().length < 2) {
      errors.nickname = '닉네임은 2자 이상이어야 합니다.';
    }

    // email
    if (!formData.email.trim()) {
      errors.email = '이메일을 입력해주세요.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = '이메일 형식이 올바르지 않습니다.';
      }
    }

    // password
    if (!formData.password) {
      errors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 4) {
      errors.password = '비밀번호는 4자 이상이어야 합니다.';
    }

    // passwordConfirm
    if (!formData.passwordConfirm) {
      errors.passwordConfirm = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.passwordConfirm) {
      errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    setFieldErrors(errors);

    // 하나라도 에러 있으면 false
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
      // 백엔드에서 내려주는 메시지 기준 처리
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        '회원가입 실패';

      // ✅ 이메일 중복 같은 경우 email 필드 아래에 표시
      if (typeof msg === 'string' && msg.includes('이메일')) {
        setFieldError('email', msg);
        return;
      }

      // ✅ 그 외는 공통 에러
      setCommonError(typeof msg === 'string' ? msg : '회원가입 실패');
    }
  };

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // ✅ Enter 키 처리
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // 마지막 input이면 회원가입 실행
      if (index === inputRefs.length - 1) {
        handleSignup();
      } else {
        // 다음 input으로 포커스 이동
        inputRefs[index + 1].current.focus();
      }
    }
  };

  return (
    <div css={s.container}>
      <div css={s.signupBox}>
        <div css={s.logoBox}>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}><img src={logo} alt="logo" css={s.logo} /></Link>
        </div>

        <h1 css={s.title}>회원가입</h1>

        <div css={s.formBox}>
          {/* 닉네임 */}
          <input
            ref={inputRefs[0]}
            type="text"
            name="nickname"
            placeholder="닉네임 입력"
            css={s.input}
            value={formData.nickname}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 0)}
          />
          {fieldErrors.nickname && (
            <div css={s.errorText}>{fieldErrors.nickname}</div>
          )}

          {/* 이메일 */}
          <div css={s.emailWrapper}>
            <input
              ref={inputRefs[1]}
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
              onKeyDown={(e) => handleKeyDown(e, 1)}
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

          {/* 비밀번호 */}
          <input
            ref={inputRefs[2]}           
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            css={s.input}
            value={formData.password}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 2)}
          />
          {fieldErrors.password && (
            <div css={s.errorText}>{fieldErrors.password}</div>
          )}

          {/* 비밀번호 확인 */}
          <input
            ref={inputRefs[3]}
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            css={s.input}
            value={formData.passwordConfirm}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 3)}
          />
          {fieldErrors.passwordConfirm && (
            <div css={s.errorText}>{fieldErrors.passwordConfirm}</div>
          )}

          {/* 공통 에러 */}
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