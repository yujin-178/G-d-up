import React from "react";
import { css } from '@emotion/react';
import { ListStyle, Hr } from '../resusableCss';

export default function FollowerForm({ followers, onClickGoToFollower }) {
  return (
    <div css={Follower}>
      {followers.map((user, idx) =>
        <>
          <li css={[ListStyle]}
            key={idx}
            onClick={() => onClickGoToFollower(idx)}
          >
            {user}
          </li>
          <hr css={Hr}/>
        </>
      )}
    </div>
  );
}

const Follower = css`
  padding: 1rem;
  text-align: center;
  height: 85%;
`;
