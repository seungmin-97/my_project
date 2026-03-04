/** @jsxImportSource @emotion/react */
import * as s from './l.style';
import logo from '../assets/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const pwRef = useRef(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  });

  const [commonError, setCommonError] = useState('');

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // 입력하면 해당 필드 에러 즉시 제거
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (commonError) setCommonError('');
  };

  const validate = () => {
    const errors = { email: '', password: '' };

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
    }

    setFieldErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index === 0) {
        pwRef.current?.focus();
      } else {
        handleLogin();
      }
    }
  };

  const handleLogin = async () => {
    setCommonError('');

    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email: formData.email.trim(),
        password: formData.password,
      });

      // 서버가 UserResponse를 내려줌: {id,email,nickname,createdAt}
      const user = res.data;

      // ✅ 로그인 상태 저장 (간단 버전)
      localStorage.setItem('user', JSON.stringify(user));

      // 원하는 페이지로 이동
      alert(`${user.nickname}님 환영합니다!`);
      navigate('/'); // 홈으로 이동 (원하는 경로로 변경 가능)
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        '로그인 실패';

      // 보통 로그인 실패 메시지는 공통 에러로 표출
      setCommonError(typeof msg === 'string' ? msg : '로그인 실패');
    }
  };

  return (
    <div css={s.container}>
      <div css={s.signinBox}>
        <div css={s.logoBox}>
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}><img src={logo} alt="logo" css={s.logo} /></Link>
        </div>

        <h1 css={s.title}>로그인</h1>

        <div css={s.formBox}>
          <div css={s.inputBox}>
            <label>이메일</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="sample@email.com"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
            {fieldErrors.email && <div css={s.errorText}>{fieldErrors.email}</div>}
          </div>

          <div css={s.inputBox}>
            <label>비밀번호</label>
            <input
              ref={pwRef}
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
            {fieldErrors.password && <div css={s.errorText}>{fieldErrors.password}</div>}
          </div>

          {commonError && <div css={s.errorText} style={{ marginTop: 8 }}>{commonError}</div>}

          <button css={s.btn} onClick={handleLogin}>
            로그인
          </button>

          <div css={s.signupTextBox}>
            <span css={s.signupText}>계정이 없으신가요?</span>
            <Link css={s.signupLink} to="/Signup">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
}