import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  padding: 60px 20px;
`;

export const signupBox = css`
  width: 460px;
  padding: 48px 42px;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
`;

export const logoBox = css`
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
`;

export const logo = css`
  width: 64px;
  height: 64px;
`;

export const title = css`
  font-size: 26px;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 32px;
`;

export const formBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const input = css`
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  color: #222;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #f2a900;
    box-shadow: 0 0 0 1px rgba(242, 169, 0, 0.25);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const errorText = css`
  font-size: 12px;
  color: #e53935;
`;

export const emailWrapper = css`
  position: relative;
  width: 100%;
`;

export const emailInput = css`
  width: 100%;
  height: 44px;
  padding: 0 110px 0 12px; /* 오른쪽 버튼 공간 확보 */
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #f2a900;
    box-shadow: 0 0 0 1px rgba(242, 169, 0, 0.25);
  }
`;

export const checkBtnAbsolute = css`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
  border: none;
  background-color: #ffd54f;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #ffca28;
  }
`;

export const successText = css`
  margin-top: 6px;
  font-size: 12px;
  color: #4caf50;
`;

export const btn = css`
  width: 100%;
  padding: 15px;
  margin-top: 12px;
  font-size: 16px;
  font-weight: 600;
  background-color: #f2a900;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(45, 128, 229, 0.3);
  }

  &:disabled {
    background-color: #d5d5d5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const linkBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
`;

export const linkText = css`
  font-size: 14px;
  color: #555;
`;

export const link = css`
  font-size: 14px;
  font-weight: 600;
  color: #f2a900;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
