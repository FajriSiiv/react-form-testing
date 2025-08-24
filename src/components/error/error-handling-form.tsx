
const ErrorHandlingForm = ({ text }: { text: string | undefined }) => {
  return (
    <span className='text-left text-rose-500 text-sm'>{text}</span>
  )
}

export default ErrorHandlingForm