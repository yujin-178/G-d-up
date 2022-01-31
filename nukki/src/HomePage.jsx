import React from 'react';

export default function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={() => { window.location.pathname = '/signup' } }>회원가입</button>
      <button onClick={() => { window.location.pathname = '/login' } }>로그인</button>
    </div>
  );
}
