import HeaderImage from '@/components/HeaderImage'
import ProgressSteps from '@/components/ProgressSteps'
const SignupLayout = ({children}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full'>
     {/* <HeaderImage /> */}
      <ProgressSteps />
      <main className='w-full justify-center items-center flex'>{children}</main>
    </div>
  )
}

export default SignupLayout
