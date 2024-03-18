import { Col, Flex, Row } from "antd";
import Link from "next/link";
import PricingPlansIcon from "../Icons/PricingPlansIcon";
import RightNavigationIcon from "../Icons/RightNavigation";
import {
  BillingNavigationsCard,
  BillingNavigationsCardDescription,
  BillingNavigationsCardTitle,
} from "./style";

const BillingModuleNavigations = () => {
  const BillingNavigations = [
    {
      title: "Pricing plans",
      description: "View pricing and FAQs",
      icon: <PricingPlansIcon />,
      url: "/settings/billing-and-plans/pricing-plans",
    },
    // {
    //   title: "Payment methods",
    //   description: "Add or modify payment methods",
    //   icon: <WalletColoredIcon />,
    //   url: "",
    // },
    // {
    //   title: "Usages",
    //   description: "Add or modify payment methods",
    //   icon: <WalletColoredIcon />,
    //   url: "",
    // },
  ];

  return (
    <Row gutter={[22, 22]}>
      {BillingNavigations?.map((BillingCardDetail: any) => {
        return (
          <Col span={24} md={{ span: 8 }}>
            <Link href={BillingCardDetail?.url}>
              <BillingNavigationsCard>
                <Flex gap="22px" align="center">
                  {BillingCardDetail?.icon}
                  <Flex vertical>
                    <BillingNavigationsCardTitle>
                      {BillingCardDetail?.title}
                    </BillingNavigationsCardTitle>
                    <BillingNavigationsCardDescription>
                      {BillingCardDetail?.description}
                    </BillingNavigationsCardDescription>
                  </Flex>
                </Flex>
                <RightNavigationIcon />
              </BillingNavigationsCard>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
};

export default BillingModuleNavigations;
