import { css } from "@emotion/react";

export const container = css`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f6f8;
  padding: 40px 20px;
`;

export const writeBox = css`
  width: 100%;
  max-width: 760px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

export const title = css`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #222;
`;

export const input = css`
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border: 1px solid #dcdfe4;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 16px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #4a90e2;
  }
`;

export const textarea = css`
  width: 100%;
  height: 320px;
  padding: 16px;
  border: 1px solid #dcdfe4;
  border-radius: 10px;
  font-size: 16px;
  resize: none;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 12px;

  &:focus {
    border-color: #4a90e2;
  }
`;

export const errorText = css`
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const buttonGroup = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const cancelButton = css`
  min-width: 100px;
  height: 44px;
  border: 1px solid #cfd6dd;
  background-color: white;
  color: #444;
  border-radius: 8px;
  cursor: pointer;
`;

export const submitButton = css`
  min-width: 120px;
  height: 44px;
  border: none;
  background-color: #4a90e2;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #357bd8;
  }
`;