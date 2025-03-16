export const NavBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-16 bg-neutral-900 flex shadow-lg items-center">
      <div className="container mx-auto">{children}</div>
    </div>
  )
}
