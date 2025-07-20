import LoginBanner from './components/LoginBanner'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:flex-1">
        <LoginBanner />
      </div>
      <LoginForm />
    </div>
  )
}