import React from 'react'
import { IconContainer, TopBarMenuContainer } from './style'
import AgentsIcon from "../../Icons/WalletIcon";
import WalletIcon from '../../Icons/WalletIcon';
import NotificationIcon from '@/components/Icons/NotificationIcon';

const TopBarMenu = () => {
  return (
    <TopBarMenuContainer>
        <div style={{display : 'flex',gap : '10px',color : '#121212',fontSize : '14px',fontWeight : 500}}>
        <WalletIcon />
        500
        </div>
        <IconContainer>
            <NotificationIcon />
        </IconContainer>
        <IconContainer>
            RS
        </IconContainer>
    </TopBarMenuContainer>
  )
}

export default TopBarMenu
