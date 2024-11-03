
import * as React from 'react'
import pandaImg from './drawingPanda.png';

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { IconSidebar } from '@/components/ui/icons'



export interface SidebarProps {
  children?: React.ReactNode
}

export function Navbar() { //panda in corner, bamboo border?, forets theme: green, black, white, pink
  const divStyle: React.CSSProperties = {
	display: 'flex',             // Use Flexbox for centering
	justifyContent: 'space-between',
	alignItems: 'center',        // Center vertically
	height: '15vh',             // Full viewport height
	textAlign: 'center',         // Center text inside the div
	backgroundColor: '#63967c',

	fontFamily: "'Patrick Hand', cursive"
  };

  return (
    <div style={divStyle} className="border-b-2 border-black"> 
		<img src={pandaImg.src} 
			width={240}
			style={{
				float: 'left',
				marginLeft: '50px',
				marginTop: '10px'
		}}/>
		<a href="http://localhost:3000/" style={{
			marginLeft: 'auto',
			marginRight: '40px',
			fontWeight: 'bold',
			fontSize: '20px',
			color: 'black',
			textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
		}}> CHAT </a>
		<a href="http://localhost:3000/log" style={{
			marginRight: '50px', 
			fontWeight: 'bold',
			fontSize: '20px',
			color: 'black',
			textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
		}}> LOG </a>
	</div>
  )
}

