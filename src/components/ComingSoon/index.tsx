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
        Our team is diligently developing a new Billing & Usages page tailored specifically for you! Keep an eye out for a user-friendly platform designed to help you easily track, analyze, and enhance your usage data.
        </ComingSoonDescription>
      
    </ComingSoonContainer>
  )
}

export default ComingSoon
