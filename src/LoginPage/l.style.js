import { css } from "@emotion/react";

export const container = css`
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const signinBox = css`
    width: 420px;
    padding: 48px 40px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    border: 1px solid #eee;
`;

export const logoBox = css`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

export const logo = css`
    width: 64px;
`;

export const title = css`
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    color: #222;
    margin-bottom: 36px;
`;

export const formBox = css`
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

export const inputBox = css`
    display: flex;
    flex-direction: column;
    gap: 8px;

    & > label {
        font-size: 13px;
        font-weight: 600;
        color: #444;
    }

    & > input {
        background: transparent;
        border: none;
        border-bottom: 2px solid #ddd;
        padding: 10px 4px;
        font-size: 15px;
        color: #222;
        transition: border-color 0.25s ease;
    }

    & > input:focus {
        outline: none;
        border-bottom-color: #ff8a00;
    }

    & > input::placeholder {
        color: #aaa;
    }
`;

export const errorText = css`
  margin-top: 6px;
  font-size: 12px;
  color: #e53935;
`;

export const btn = css`
    margin-top: 10px;
    padding: 14px;
    font-size: 16px;
    font-weight: 700;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    background: linear-gradient(135deg, #ff8a00, #ff5f00);
    box-shadow: 0 8px 20px rgba(255, 138, 0, 0.35);
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(255, 138, 0, 0.45);
    }

    &:disabled {
        background: #ccc;
        box-shadow: none;
        cursor: not-allowed;
    }
`;

export const signupTextBox = css`
    margin-top: 24px;
    display: flex;
    justify-content: center;
    gap: 6px;
`;

export const signupText = css`
    font-size: 14px;
    color: #555;
`;

export const signupLink = css`
    font-size: 14px;
    font-weight: 600;
    color: #ff6a00;
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
`;
