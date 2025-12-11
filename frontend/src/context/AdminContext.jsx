import { createContext, useContext, useEffect, useState } from "react"
import { alertError, alertSuccess } from "../components/data/alert"

const AdminContext = createContext()

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const AdminProvider = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [adminKey, setAdminKey] = useState('')
    const loginAdmin = async (key) => {
        try {
            const response = await fetch(`${API_URL}/auth/validate-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key: key }),
            })
            if (response.ok) {
                setIsAdmin(true)
                setAdminKey(key) 
                await alertSuccess("Mode Admin Aktif!")
                return true
            } else {
                await alertError("Kode akses salah!")
                return false
            }
        } catch (error) {
            console.error("Login error:", error)
            await alertError("Gagal menghubungi server.")
            return false
        }
    }
    const logoutAdmin = (auto = false) => {
        if (isAdmin) {
            setIsAdmin(false)
            setAdminKey('')
            if (auto) {
                alertError("Sesi Admin telah berakhir.")
            } else {
                alertSuccess("Mode Admin Dinonaktifkan.")
            }
        }
    }
    useEffect(() => {
        const timer = isAdmin ? setTimeout(() => logoutAdmin(true), 15000) : null
        return () => clearTimeout(timer)
    }, [isAdmin])
    return (
        <AdminContext.Provider value={{isAdmin, adminKey, loginAdmin, logoutAdmin}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)