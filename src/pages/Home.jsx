import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { Search, Map, BarChart2, Users, Trophy, LogIn, Pointer } from 'lucide-react';
import { Link } from 'react-router-dom';


const colors = {
  white: '#fff',
  black: '#1c1c1f',
  gray100: '#f5f7f9',
  gray500: '#9aa4af',
  darkPurple800: '#31313c',
  darkPurple900: '#1c1c1f',
  yellow400: '#ffb900',
  kakao: '#FEE500',
};

const globalStyles = css`
  body {
    margin: 0;
    padding: 0;
    background-color: ${colors.darkPurple900};
    font-family: 'Pretendard', sans-serif;
  }
`;

const HomeWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.nav`
  width: 100%;
  height: 60px;
  background-color: ${colors.black};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid ${colors.darkPurple800};
  box-sizing: border-box;
`;

const MainContent = styled.div`
  margin-top: 140px;
  width: 100%;
  max-width: 800px;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 60px;
  font-weight: 900;
  color: ${colors.yellow400};
  margin-bottom: 45px;
  span { color: ${colors.white}; }
`;

/* --- 개선된 검색 섹션 --- */
const SearchContainer = styled.div`
  display: flex;
  height: 64px; /* 전체 높이 고정 */
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
`;

const PlatformButton = styled.button`
  width: 120px; /* 폭 고정 */
  height: 100%;
  background-color: ${props => props.isKakao ? colors.kakao : colors.gray100};
  color: ${colors.black};
  font-weight: 800;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  padding: 0 25px;
  font-size: 18px;
  font-weight: 500;
  &::placeholder { color: ${colors.gray500}; }
`;

const SearchIconBtn = styled.button`
  width: 80px; /* 폭 고정 */
  height: 100%;
  background-color: ${colors.yellow400};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

const ShortcutList = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  gap: 40px;
`;

const Shortcut = styled.a`
  color: ${colors.gray500};
  text-decoration: none;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  &:hover { color: ${colors.white}; }
`;

function Home() {
  const [platform, setPlatform] = useState('STEAM');

  return (
    <>
      <Global styles={globalStyles} />
      <HomeWrapper>
        <Nav>
          <div style={{ fontWeight: 900, fontSize: '22px', color: colors.yellow400  }}><Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>PUBG.GG</Link></div>
          <Link to='/login' style={{ textDecoration: 'none', color: 'inherit'}}>
            <button style={{ background: colors.darkPurple800, color: '#fff', padding: '8px 16px', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} >
              <LogIn size={16} /> 로그인 
            </button>
          </Link>
        </Nav>

        <MainContent>
          <Logo>PUBG<span>.GG</span></Logo>

          <SearchContainer>
            <PlatformButton
              style={{cursor: 'pointer'}} 
              isKakao={platform === 'KAKAO'} 
              onClick={() => setPlatform(p => p === 'STEAM' ? 'KAKAO' : 'STEAM')}
            >
              {platform}
            </PlatformButton>
            
            <SearchInput placeholder="플레이어 이름(ID)을 입력해 주세요" />
            
            <Link to='/matchAverage'>
              <SearchIconBtn style={{cursor: 'pointer'}}>
                <Search size={28} strokeWidth={3} color={colors.black}/>
              </SearchIconBtn>
            </Link>
          </SearchContainer>

          <ShortcutList>
            <Shortcut href="#"><Map size={24}/>지도</Shortcut>
            <Shortcut href="#"><BarChart2 size={24}/>무기 통계</Shortcut>
            <Shortcut href="#"><Trophy size={24}/>리더보드</Shortcut>
            <Shortcut href="/posts"><Users size={24}/>팀 찾기</Shortcut>
          </ShortcutList>
        </MainContent>
      </HomeWrapper>
    </>
  );
}

export default Home;