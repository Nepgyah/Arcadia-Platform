import { Suspense } from "react";
import HomeContent from "./homeContent";

export default async function Page() {

  return (
    <div id="page-home">
      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </Suspense>
    </div>
  )
}