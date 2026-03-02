import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function StatCard() {
  return (
    <div className="stat-card card bg-platform-dark">
      <div className="stat-card__icon">
        <SkeletonCircle size={'48px'}/>
      </div>
      <div className="stat-card__text">
        <p className="stat-card__value bold"><Skeleton width={'36px'} height={'36px'} /></p>
        <p className="stat-card__label clr-txt-fadded"><SkeletonText noOfLines={1}/></p>
      </div>
    </div>
  );
}