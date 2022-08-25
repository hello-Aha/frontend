import React from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSideBarMenu, sideMenuBarActions } from './sideBarMenuSlice';

interface Props {
  display: string;
}

const MaskWrapper = styled.div<Props>`
  width: 100%;
  height: 100vh;
  display: ${(props) => props.display};
  position: absolute;
  background-color: black;
  z-index: 1;
  opacity: 50%;
`;

export default function Mask() {
  const sideBarMenuState = useAppSelector(selectSideBarMenu);
  const dispatch = useAppDispatch();

  const display = sideBarMenuState.isOpen ? 'block' : 'none';
  const toggleHandler = () => {
    dispatch(sideMenuBarActions.open(!sideBarMenuState.isOpen));
  };

  return <MaskWrapper onClick={toggleHandler} display={display} />;
}
