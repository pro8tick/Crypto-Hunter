import React,{ Suspense } from 'react'
import Banner from '../Components/Banner/Banner'

const Coinstable = React.lazy(()=>import('../Components/Coinstable'))

function Home() {
  return (
    <div>
        <Banner/>
        <Suspense fallback={<div>Loading...</div>}>
          <Coinstable/>
        </Suspense>
    </div>
  )
}

export default Home