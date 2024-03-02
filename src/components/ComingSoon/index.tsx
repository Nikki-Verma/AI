import React from 'react'
import { ComingSoonContainer, ComingSoonDescription, ComingSoonHeading } from './style'
import Image from 'next/image'

type ComingSoonProps = {
    description ?: string;
}

const ComingSoon = ({description} : ComingSoonProps) => {
  return (
    <ComingSoonContainer>
       <Image
            src={"/assets/Images/ComingSoon.svg"}
            alt="Coming soon"
            height={250}
            width={322}
        />
        <ComingSoonHeading>
        This page is coming soon
        </ComingSoonHeading>
        <ComingSoonDescription>
        Our team is hard at work crafting an innovative Billing & Usages page just for you!  Stay tuned for an intuitive platform where you can effortlessly monitor, analyze, and optimize your usage data.
        </ComingSoonDescription>
      
    </ComingSoonContainer>
  )
}

export default ComingSoon
