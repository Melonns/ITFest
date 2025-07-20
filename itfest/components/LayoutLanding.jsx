import NavbarLanding from "./NavbarLanding";
import FooterLanding from "./FooterLanding";

export default function LayoutLanding({ children }) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <NavbarLanding />
      <main className="w-full flex-1">{children}</main>
      <FooterLanding />
    </div>
  );
}
