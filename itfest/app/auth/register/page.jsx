import RegisterBanner from "./components/RegisterBanner";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:flex-1">
        <RegisterBanner />
      </div>
      <RegisterForm />
    </div>
  );
}
