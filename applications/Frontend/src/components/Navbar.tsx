import { NavLink } from "react-router-dom"
import { useAppSelector } from "@/store/hooks"

const Navbar: React.FC = () => {
    const userProfile = useAppSelector((state) => state.auth.user)

    if (! userProfile) return null     

    const navItems = [
        { label: "Accueil", path: "/", roles: ["EMPLOYEE", "MANAGER", "SECRETARY"] },
        { label: "Profil", path: "/profil", roles: ["EMPLOYEE", "MANAGER", "SECRETARY"] },
        { label: "Dashboard", path: "/dashboard", roles: ["MANAGER"] },
        { label: "Ressources", path: "/resources", roles: ["SECRETARY"] },
        { label: "Se connecter", path: "/login", roles: [] }
    ]

    const filteredNavItems = navItems.filter((item) =>
        item.roles.includes(userProfile.role)
    )

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                <div className="text-xl font-bold text-sky-600">ParkingApp</div>
                <div className="flex gap-4">
                {filteredNavItems.map((item) => (
                    <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${isActive ? "bg-sky-100 text-sky-700" : "text-slate-700 hover:bg-slate-100"}`
                    }
                    >
                    {item.label}
                    </NavLink>
                ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar